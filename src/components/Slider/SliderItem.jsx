import React, { Component, PropTypes } from 'react';
import style from './SldierItem.styl';
import { zhihuAPI } from '../../statics';
import { Link } from 'react-router';
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
      this.animateTag = setTimeout(() => {
        this.setState({
          animate: ANIMATE_END,
        });
      }, this.props.slideSpeed + 20);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.animateTag);
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

    const itemStyle = {
      // backgroundImage: `url(\"${zhihuAPI}${this.props.data.image}\")`,
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      transition: this.props.transitionStyle,
    };
    return (
      <li className={className} style={itemStyle}>
        <img
          className={style.contentImg}
          src={`${zhihuAPI}${this.props.data.image}`}
          alt={this.props.data.title}
        />
        <div className={style.header}>
          <span className={style.headerTitle}>
           {this.props.data.title}
          </span>
        </div>
        <Link className={style.linkwarp} to={`/news/${this.props.data.id}`} />
      </li>
    );
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
