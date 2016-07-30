import React, { Component, PropTypes } from 'react';
import style from './SldierItem.styl';
import { zhihuAPI } from '../../statics';

const ANIMATE_PREPARE = 'ANIMATE_PREPARE';
const ANIMATE_ANIMATING = 'ANIMATE_ANIMATING';
const ANIMATE_END = 'ANIMATE_END';
class SliderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: ANIMATE_END,
    };
  }
  componentWillReceiveProps(nextProps) {
    // clear state for animate.
    if (nextProps.active !== this.props.active) {
      this.setState({ animate: ANIMATE_PREPARE });
    }
  }

  componentDidUpdate(prevProps) {
    // 先通过props 设置slide动画的预备类，然后在componentDidUpdate之后开始动画
    if (this.props.active !== prevProps.active) {
      setTimeout(() => {
        this.setState({
          animate: ANIMATE_ANIMATING,
        });
      }, 20);
      setTimeout(() => {
        this.setState({
          animate: ANIMATE_END,
        });
      }, this.props.slideSpeed + 20);
    }
  }


  /*
 animateClassSet
 In: right -> active
 out: active -> left
   */
  render() {
    let className = style.itemwarp;
    // const { animateIn, animateOut } = this.props;
    const animate = this.state.animate;
    const driection = this.props.direction;

    // prepare animate
    if (animate === ANIMATE_PREPARE) {
      // animate in
      if (this.props.animateIn) {
        if (driection === 'next') {
          className += ` ${style.next}`;
        } else {
          className += ` ${style.prev}`;
        }
      } else {
        // animate out
        className += ` ${style.active}`;
        // if (driection === 'next') {
        //   className += ` ${style.prev}`;
        // } else {
        //   className += ` ${style.next}`;
        // }
      }
    }

    // perform animate.
    if (animate === ANIMATE_ANIMATING) {
      // animate in
      if (this.props.animateIn) {
        className += ` ${style.active}`;
      } else {
        // animate out
        if (driection === 'next') {
          className += ` ${style.prev}`;
        } else {
          className += ` ${style.next}`;
        }
      }
    }

    // animate end, set classname which it should be.
    if (animate === ANIMATE_END) {
      if (this.props.active) {
        className += ` ${style.active}`;
      }
    }

    const backgroundStyle = {
      backgroundImage: `url(\"${zhihuAPI}${this.props.data.image}\")`,
      transition: this.props.transitionStyle,
    };
    return (
      <li className={className} style={backgroundStyle}>
      </li>);
  }
}

SliderItem.propTypes = {
  active: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(['prev', 'next']),
  data: PropTypes.object,
  animateIn: PropTypes.bool,
  animateOut: PropTypes.bool,
  transitionStyle: PropTypes.string,
  slideSpeed: PropTypes.number,
};

export default SliderItem;
