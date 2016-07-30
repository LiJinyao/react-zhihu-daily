import React, { PropTypes, Component } from 'react';
import style from './DirectionNav.styl';
class DirectionNav extends Component {
  render() {
    return (
      <div className={style.directionNav}>
        <i
          className={`${style.prev} ${style.navbtn} iconfont`}
          onClick={this.props.onPrevClick}
        >&#xe64b;</i>
        <i
          className={`${style.next} ${style.navbtn} iconfont`}
          onClick={this.props.onNextClick}
        >&#xe64c;</i>
      </div>
    );
  }
}
export default DirectionNav;
