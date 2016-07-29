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
      currIndex: props.startIndex,
      prevIndex: null,
    };
    this.transitionStyle = `transform ${this.props.slideSpeed / 1000}s ease-in-out`;
  }
  componentDidMount() {
    this.play();
  }

  componentWillUnmount() {
    clearInterval(this.playFlag);
  }

  play() {
    this.playFlag = setInterval(() => {
      // console.log("trun next, currIndex: " + this.state.currIndex);
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
    // 先执行动画，在修改当前index。
    const nextIndex = this.nextIndex(n);
    const prevIndex = this.state.currIndex;
    // 动画开始
    this.setState({
      currIndex: nextIndex,
      prevIndex,
    });
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

  render() {
    const { currIndex, prevIndex } = this.state;
    const items = this.props.data.map((item, i) => (
      <SliderItem
        data={item}
        key={i}
        index={i}
        transitionStyle={this.transitionStyle}
        active={currIndex === i}
        direction={'next'}
        animateIn={currIndex === i && prevIndex != null}
        animateOut={prevIndex === i}
      />)
    );
    return (
      <ul className={style.sliderBody}>
        {items}
      </ul>);
  }
}

Slider.propTypes = {
  data: PropTypes.array.isRequired,
  slideSpeed: PropTypes.number.isRequired,
  slideInterval: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired,
};
Slider.defaultProps = {
  slideSpeed: 1000,
  slideInterval: 2000,
  autoPlay: true,
  startIndex: 0,
};

export default Slider;
