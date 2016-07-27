import React, { PropTypes, Component } from 'react';
import style from './Slider.styl';
import SliderItem from './SliderItem';

// 表示当前聚焦的slide
// transform: translateX(0);
export const SLIDE_ACTIVE = 'SLIDE_ACTIVE';

// 表示将slide向左移动
// transform: ranslateX(-100%);
export const SLIDE_LEFT = 'SLIDE_LEFT';

// 表示将slide向右移动
// transform: translateX(100%);
export const SLIDE_RIGHT = 'SLIDE_RIGHT';

/**
 * Note: 切换间隔 >= 切换速度 才合理。
 */
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currIndex: props.startIndex,
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
    clearTimeout(this.slidingTag);
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

    // 动画开始
    this.setState({ sliding: true });
    const nextIndex = this.nextIndex(n);

    // 动画结束后修改当前slide。
    this.slidingTag = setTimeout(() => {
      this.setState({
        currIndex: nextIndex,
        sliding: false,
      });
    // 使用设置的动画间隔时间。
    }, this.props.slideSpeed);
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
    const nextIndex = this.nextIndex(1);
//  console.log(`nextIndex ${nextIndex}`);
    const { currIndex, sliding } = this.state;
    const items = this.props.data.map((item, i) => {
      let slideState;
      if (i === currIndex) {
        if (sliding) {
          slideState = SLIDE_LEFT;
        } else {
          slideState = SLIDE_ACTIVE;
        }
      } else if (i === nextIndex) {
        if (sliding) {
          slideState = SLIDE_ACTIVE;
        } else {
          slideState = SLIDE_RIGHT;
        }
      }
      return (
        <SliderItem
          data={item}
          key={i}
          slideState={slideState}
          timeStyle={this.timeStyle}
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
