import React, { Component, PropTypes } from 'react';
import style from './SldierItem.styl';
import { zhihuAPI } from '../../statics';

class SliderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateIn: false,
      // right or left
      // which direction item will move to.
      direction: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    // clear state for animate.
    if (nextProps.active !== this.props.active) {
      this.setState({ direction: null });
    }
  }

  componentDidUpdate(prevProps) {
    // 先通过props 设置slide动画的预备类，然后在componentDidUpdate之后开始动画
    if (this.props.active !== prevProps.active) {
      setTimeout(() => {
        this.setState({
          direction: this.props.direction === 'prev' ? 'right' : 'left',
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
    const { animateIn } = this.state;
    // const { animateIn, animateOut } = this.props;

    if (this.props.animateIn && !this.state.direction) {
      className += ` ${style.right}`;
    } else if (this.props.animateIn && this.state.direction) {
      className += ` ${style.active}`;
    }else if (!this.props.animateIn && this.props.active) {
      className += ` ${style.active}`;
    }

    if (this.props.animateOut && !this.state.direction) {
      className += ` ${style.active}`;
    } else if(this.props.animateOut && this.state.direction) {
      className += ` ${style.left}`;
    }

    // if (animateIn) {
    //   className += ` ${style.right}`;
    // }

    const backgroundStyle = {
      backgroundImage: `url(\"${zhihuAPI}${this.props.data.image}\")`,
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
};

export default SliderItem;
