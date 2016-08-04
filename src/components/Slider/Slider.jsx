import React, { PropTypes, Component } from 'react';
import style from './Slider.styl';
import SliderItem from './SliderItem';
import DirectionNav from './DirectionNav';

/**
 * Note: 切换间隔 >= 切换速度 才合理。
 */
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currIndex:       props.startIndex,
      // will be set after Slider mount to DOM.
      widthPerItem:    0,
      // disable transition for init Slider width.
      transition:      false,
      transformOffset: 0,
      slideSpeed:      props.slideSpeed,
    };
    this.itemDOM = null;
    // lock sldie when already perform sliding animation.
    this.lockSlide = false;
    this.playFlag = null;
  }
  componentDidMount() {
    this.play();
    this.resizeHandler = this.resize.bind(this);
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    this.stopAutoPlay();
    clearTimeout(this.lockNavTag);
    window.removeEventListener('resize', this.resizeHandler);
  }

  getOffset(index, offset = 0) {
    return - (this.state.widthPerItem * index) - this.state.widthPerItem + offset;
  }

  handleTouchStart(event) {
    this.stopAutoPlay();
    this.startPointClientX = event.touches[0].clientX;
  }

  handleTouchMove(event) {
    event.preventDefault();
    if (!this.lockSlide) {
      const touchOffset = this.startPointClientX - event.changedTouches[0].clientX;
      this.setState({
        transformOffset: this.getOffset(this.state.currIndex) - touchOffset,
        transition:      false,
      });
    }
  }

  handleTouchEnd() {
    // TODO: slide to item.
    // resume auto play.
    if (!this.lockSlide) {
      const { widthPerItem, transformOffset } = this.state;
      const offset = this.getOffset(this.state.currIndex) - transformOffset;
      if (Math.abs(offset) > widthPerItem / 4) {
        if (offset > 0) {
          this.next(300);
        } else {
          this.prev(300);
        }
      } else {
        this.lockSlide = true;
        this.setState({
          transformOffset: this.getOffset(this.state.currIndex),
          transition:      true,
        }, () => { this.lockSlide = false; });
      }
      this.play();
    }
  }

  resize() {
    if (this.itemDOM.clientWidth !== this.state.widthPerItem) {
      this.setState({
        widthPerItem:    this.itemDOM.clientWidth,
        transition:      false,
        transformOffset:
        - (this.itemDOM.clientWidth * this.state.currIndex) - this.itemDOM.clientWidth,
      });
    }
  }

  stopAutoPlay() {
    clearInterval(this.playFlag);
    this.playFlag = null;
  }

  play() {
    if (this.playFlag === null) {
      this.playFlag = setInterval(() => {
        this.next();
        // 切换间隔要考虑切换动画时间，
        // 所以每次切换的间隔应该是切换动画时间 ＋ 用户设置的间隔。
      }, this.props.slideSpeed + this.props.slideInterval);
    }
  }

  next(slideSpeed) {
    this.turn(1, slideSpeed);
  }

  prev(slideSpeed) {
    this.turn(-1, slideSpeed);
  }

  turn(n, slideSpeed) {
    if (!this.lockSlide) {
      const nextIndex = this.nextIndex(this.state.currIndex, n);
      const offset = this.getOffset(nextIndex);
      this.lockSlide = true;
      this.setState({
        currIndex:       nextIndex,
        transition:      true,
        transformOffset: offset,
        slideSpeed:      slideSpeed || this.props.slideSpeed,
      });

      // nextIndex means currIndex now.
        // current is the fake first item. jump to the real first item.
        // or current is the fake last item. jump to the real last item.
      if ((nextIndex === this.props.data.length) || (nextIndex === -1)) {
        this.lockNavTag = setTimeout(() => {
          this.setState({
            currIndex:       this.nextIndex(nextIndex, n),
            // disable transition so the user can't see the jump.
            transition:      false,
            transformOffset: this.getOffset(this.nextIndex(nextIndex, n)),
          }, () => { this.lockSlide = false; });
        }, this.props.slideSpeed + 20);
      } else {
        // unlock slide nav.
        this.lockNavTag = setTimeout(() => {
          this.lockSlide = false;
          // give a little more time for other opreation.
        }, this.props.slideSpeed + 20);
      }
    }
  }

  nextIndex(currIndex, indexShift) {
    const length = this.props.data.length + 1;
    let nextIndex = currIndex + indexShift;
    if (nextIndex >= length) {
      nextIndex -= length;
    }
    if (nextIndex < -1) {
      nextIndex += length;
    }
    return nextIndex;
  }

  mouseOver() {
    // stop auto play
    this.stopAutoPlay();
  }

  mouseOut() {
    // resume animate
    this.play();
  }

  dom(element) {
    // get init Slider width
    if (this.state.widthPerItem !== element.clientWidth) {
      this.itemDOM = element;
      this.setState({
        widthPerItem:    element.clientWidth,
        transformOffset: - element.clientWidth,
      });
    }
  }

  render() {
    /**
     * loop effect:
     * let's say there are 5 items: 0, 1, 2, 3, 4.
     * we put these items in order of: 4`, 0, 1, 2, 3, 4, 0`.
     * when user slide to 0` or 4`, we jump to(without transition) the real 0 or 4 at next slide.
     * so for item 0, the item before it is 4`and 1 is after it, which make a loop effect.
     */
    const { transition, widthPerItem, transformOffset, slideSpeed } = this.state;
    const data = this.props.data;
    const itemCount = data.length;

    const transitionStyle = {
      width:                    `${(itemCount + 2) * widthPerItem}px`,
      position:                 'absolute',
      overflow:                 'hidden',
      transition:               'transform',
      transitionDuration:       `${transition ? (slideSpeed / 1000) : 0}s`,
      transitionTimingFunction: 'ease-in-out',
      transform:                `translate3d(${transformOffset}px, 0px, 0px)`,
      backfaceVisibility:       'hidden',
    };
    const items = [];
    // add one more last item to the front.
    items.push(
      <SliderItem data={data[itemCount - 1]} key={'lastfix'} itemWidth={widthPerItem} />
    );
    items.push(data.map((item, i) => (
      <SliderItem data={item} key={i} itemWidth={widthPerItem} />)
    ));
    // add one more first item to the back.
    items.push(
      <SliderItem data={data[0]} key={'firstfix'} itemWidth={widthPerItem} />
    );
    return (
      <div
        ref={e => { if (e !== null) { this.dom(e); } }}
        onTouchStart={event => (this.handleTouchStart(event))}
        onTouchMove={event => (this.handleTouchMove(event))}
        onTouchEnd={event => (this.handleTouchEnd(event))}
        className={style.sliderWarp}
        onMouseOver={() => { this.mouseOver(); }}
        onMouseOut={() => { this.mouseOut(); }}
      >
        <ul
          className={style.sliderBody}
          style={transitionStyle}
        >
          {items}
        </ul>
        <DirectionNav
          onNextClick={() => { this.next(); }}
          onPrevClick={() => { this.prev(); }}
        />
      </div>
    );
  }
}

Slider.propTypes = {
  data:          PropTypes.array.isRequired,
  slideSpeed:    PropTypes.number.isRequired,
  slideInterval: PropTypes.number.isRequired,
  startIndex:    PropTypes.number.isRequired,
};

Slider.defaultProps = {
  slideSpeed:    1000,
  slideInterval: 3000,
  startIndex:    0,
};

export default Slider;
