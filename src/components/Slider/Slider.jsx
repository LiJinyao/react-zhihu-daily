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
      // lock sldie when already perform sliding animation.
      lockNav:         false,
      // disable transition for init Slider width.
      transition:      false,
      transformOffset: 0,
    };
    this.itemDOM = null;
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

  handleTouchStart(event) {
    this.stopAutoPlay();
    this.startPointClientX = event.touches[0].clientX;
    this.touchBegainOffset = this.state.transformOffset;
  }
  handleTouchMove(event) {
    this.stopAutoPlay();
    const touchOffset = this.startPointClientX - event.changedTouches[0].clientX;
    this.setState({
      transformOffset: this.touchBegainOffset - touchOffset,
      transition:      false,
    });
  }
  handleTouchEnd() {
    // TODO: slide to item.
    // resume auto play.
    const { widthPerItem, transformOffset } = this.state;
    const offset = this.touchBegainOffset - transformOffset;
    if (Math.abs(offset) > widthPerItem / 2) {
      if (offset > 0) {
        this.next();
      } else {
        this.prev();
      }
    } else {
      this.turn(0);
    }
    this.play();
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
  }
  play() {
    this.playFlag = setInterval(() => {
      this.next();
      // 切换间隔要考虑切换动画时间，
      // 所以每次切换的间隔应该是切换动画时间 ＋ 用户设置的间隔。
    }, this.props.slideSpeed + this.props.slideInterval);
  }
  next() {
    this.turn(1);
  }
  prev() {
    this.turn(-1);
  }
  turn(n) {
    if (!this.state.lockNav) {
      const nextIndex = this.nextIndex(this.state.currIndex, n);
      const offset = this.getOffset(nextIndex);
    //   // current is the fake first item. jump to the real first item.
    //   if ((this.state.currIndex === this.props.data.length) && nextIndex === 0 ||
    //   // current is the fake last item. jump to the real last item.
    // (this.state.currIndex === -1) && nextIndex === this.props.data.length - 1) {
    //     this.setState({
    //       currIndex:       nextIndex,
    //       // unlock nav to jump
    //       lockNav:         false,
    //       // disable transition so the user can't see the jump.
    //       transition:      false,
    //       transformOffset: offset,
    //     });
    //     setTimeout(() => {
    //       this.turn(n);
    //     }, 1);
    //   } else {
    //     this.setState({
    //       currIndex:       nextIndex,
    //       lockNav:         true,
    //       transition:      true,
    //       transformOffset: offset,
    //     });
    //   }
      this.setState({
        currIndex:       nextIndex,
        lockNav:         true,
        transition:      true,
        transformOffset: offset,
      });
      console.log("Sliding to " + nextIndex);

      // nextIndex means currIndex now.
        // current is the fake first item. jump to the real first item.
        // or current is the fake last item. jump to the real last item.
      if ((nextIndex === this.props.data.length) || (nextIndex === -1)) {
        setTimeout(() => {
          this.setState({
            currIndex:       this.nextIndex(nextIndex, n),
            // unlock nav to jump
            lockNav:         false,
            // disable transition so the user can't see the jump.
            transition:      false,
            transformOffset: this.getOffset(this.nextIndex(nextIndex, n)),
          });
        }, this.props.slideSpeed + 15);
      } else {
        // unlock slide nav.
        this.lockNavTag = setTimeout(() => {
          this.setState({ lockNav: false });
          // give a little more time for other opreation.
        }, this.props.slideSpeed + 15);
      }
    }
  }
  getOffset(index, offset = 0) {
    return - (this.state.widthPerItem * index) - this.state.widthPerItem + offset;
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
    const { transition, widthPerItem, transformOffset } = this.state;
    const { data, slideSpeed } = this.props;
    const itemCount = data.length;
    const transitionStyle = {
      width:              `${(itemCount + 2) * widthPerItem}px`,
      position:           'absolute',
      overflow:           'hidden',
      transitionDuration: `${transition ? (slideSpeed / 1000) : 0}s`,
      transform:          `translate3d(${transformOffset}px, 0px, 0px)`,
      backfaceVisibility: 'hidden',
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
  slideSpeed:    600,
  slideInterval: 2000,
  startIndex:    0,
};

export default Slider;
