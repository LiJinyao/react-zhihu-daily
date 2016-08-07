import React, { PropTypes, Component } from 'react';
import style from './Slider.styl';
import SliderItem from './SliderItem';
import ReactSwipe from 'react-swipe';
import SwipeNav from './SwipeNav';
/**
 * Note: 切换间隔 >= 切换速度 才合理。
 */
class Slider extends Component {
  constructor(props) {
    super(props);
    this.reactSwipe = null;
  }
  next() {
    this.reactSwipe.next();
  }
  prev() {
    this.reactSwipe.prev();
  }
  render() {
    const data = this.props.data;
    return (
      <div className={style.slider}>
        <ReactSwipe
          ref={ref => { this.reactSwipe = ref; }}
          className={style.reactSwipe}
          swipeOptions={{ continuous: true, auto: this.props.slideInterval }}
        >
          {data.map(item => (
            <SliderItem data={item} key={item.id} />
          ))}
        </ReactSwipe>
        <SwipeNav next={() => { this.next(); }} prev={() => { this.prev(); }} />
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
