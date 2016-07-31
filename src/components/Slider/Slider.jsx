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
      currIndex:    props.startIndex + 1,
      prevIndex:    null,
      direction:    'next',
      widthPerItem: 0,
      // lock sldie when already perform sliding animation.
      lockNav:      false,
    };
    this.widthPerItem = 0;
  }
  componentDidMount() {
    this.play();
  }

  componentWillUnmount() {
    this.stopAutoPlay();
    clearTimeout(this.lockNavTag);
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
      // 先执行动画，在修改当前index。
      const nextIndex = this.nextIndex(n);
      const prevIndex = this.state.currIndex;
      const direction = n > 0 ? 'next' : 'prev';
      // 动画开始
      this.setState({
        currIndex: nextIndex,
        lockNav:   true,
        prevIndex,
        direction,
      });

      // unlock slide nav.
      this.lockNavTag = setTimeout(() => {
        this.setState({ lockNav: false });
        // give a little more time for other opreation.
      }, this.props.slideSpeed + 50);
    }
  }
  mouseOver() {
    // stop auto play
    this.stopAutoPlay();
  }
  mouseOut() {
    // resume animate
    this.play();
  }
  nextIndex(indexShift) {
    let nextIndex = this.state.currIndex + indexShift;
    if (nextIndex >= this.props.data.length) {
      nextIndex -= this.props.data.length;
    }
    if (nextIndex < 0) {
      nextIndex += this.props.data.length;
    }
    return nextIndex;
  }
  dom(element) {
    this.slideBodyDOM = element;
    this.widthPerItem = this.slideBodyDOM.clientWidth;
  }
  render() {
    const currIndex = this.state.currIndex;
    const itemWidth = 640;
    const offset = itemWidth * currIndex;
    // position: absolute; overflow: hidden; width: 3640px; transition-duration: 0.3s;
    // transform: translate3d(-1040px, 0px, 0px); backface-visibility: hidden;
    // left: 0px; opacity: 1;
    const itemCount = this.props.data.length;
    const transitionStyle = {
      width:              `${(itemCount + 2) * itemWidth}px`,
      position:           'absolute',
      overflow:           'hidden',
      transitionDuration: '0.3s',
      transform:          `translate3d(${-offset}px, 0px, 0px)`,
      backfaceVisibility: 'hidden',
    };
    // const { currIndex, prevIndex, direction } = this.state;
    const items = [];
    items.push(
      <SliderItem data={this.props.data[itemCount - 1]} key={'lastfix'} itemWidth={itemWidth} />
    );
    items.push(this.props.data.map((item, i) => (
      <SliderItem data={item} key={i} itemWidth={itemWidth} />)
    ));
    items.push(
      <SliderItem data={this.props.data[0]} key={'firstfix'} itemWidth={itemWidth} />
    );
    return (
      <div
        ref={e => { if (e !== null) { this.dom(e); } }}
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
