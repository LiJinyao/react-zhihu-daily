import React from 'react';
import style from './Header.styl';
import { IndexLink } from 'react-router';
const Header = () => (
  <nav className={`${style.header} appheader`}>
    <IndexLink to="/">
      <div className={style.logo}></div>
    </IndexLink>
  </nav>
);

export default Header;
