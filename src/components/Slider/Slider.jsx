import React, { PropTypes, Component } from 'react';
import style from './Slider.styl';
import SliderItem from './SliderItem';

// direction: prev next


/**
 * Note: 切换间隔 >= 切换速度 才合理。
 */
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currIndex: props.startIndex,
      prevIndex: null,
      sliding: false,
    };
    this.timeStyle = {
      transition: `transform ${this.props.slideSpeed / 1000}s ease-in-out`,
    }
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
      this.turn(1);
      // 切换间隔要考虑切换动画时间，
      // 所以每次切换的间隔应该是切换动画时间 ＋ 用户设置的间隔。
    }, this.props.slideSpeed + this.props.slideInterval);
  }

  turn(n) {
    // 先执行动画，在修改当前index。
    const nextIndex = this.nextIndex(n);
    const prevIndex = this.state.currIndex;
    // 动画开始
    this.setState({
      sliding: true,
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
    // const nextIndex = this.nextIndex(1);
    // const previousIndex = this.nextIndex(-1);
//  console.log(`nextIndex ${nextIndex}`);
    const { currIndex, prevIndex } = this.state;
    const items = this.props.data.map((item, i) => {
      console.log(prevIndex);
      return (
        <SliderItem
          data={item}
          key={i}
          index={i}
          timeStyle={this.timeStyle}
          active={currIndex === i}
          direction={'next'}
          animateIn={currIndex === i && prevIndex != null}
          animateOut={prevIndex === i}
          slideSpeed={this.props.slideSpeed}
        />);
    });
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
  slideSpeed: 500,
  autoPlay: true,
  slideInterval: 2000,
  startIndex: 0,
};

export default Slider;
