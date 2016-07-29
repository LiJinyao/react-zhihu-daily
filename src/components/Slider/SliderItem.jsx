import React, { Component, PropTypes } from 'react';
import style from './SldierItem.styl';
import { zhihuAPI } from '../../statics';

class SliderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    // clear state for animate.
    if (nextProps.active !== this.props.active) {
      this.setState({ animate: false });
    }
  }

  componentDidUpdate(prevProps) {
    // 先通过props 设置slide动画的预备类，然后在componentDidUpdate之后开始动画
    if (this.props.active !== prevProps.active) {
      setTimeout(() => {
        this.setState({
          animate: true,
        });
      }, 20);
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

    if (this.props.animateIn && !animate) {
      if (driection === 'next') {
        className += ` ${style.next}`;
      } else {
        className += ` ${style.prev}`;
      }
    } else if (this.props.animateIn && animate) {
      className += ` ${style.active}`;
    } else if (!this.props.animateIn && this.props.active) {
      className += ` ${style.active}`;
    }

    if (this.props.animateOut && !animate) {
      className += ` ${style.active}`;
    } else if (this.props.animateOut && animate) {
      if (driection === 'next') {
        className += ` ${style.left}`;
      } else {
        className += ` ${style.right}`;
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
};

export default SliderItem;
