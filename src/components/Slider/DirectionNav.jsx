import React, { PropTypes, Component } from 'react';
import style from './DirectionNav.styl';
class DirectionNav extends Component {
  render() {
    return (
      <div>
        <a className={style.prev} href="#prev"></a>
        <a className={style.next}href="#next"></a>
      </div>
    );
  }
}
export default DirectionNav;
