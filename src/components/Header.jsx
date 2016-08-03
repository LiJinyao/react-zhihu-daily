import React from 'react';
import style from './Header.styl';
import { IndexLink } from 'react-router';
import svg from '!raw-loader!./headerLogo.svg';
const Header = () => (
  <nav className={`${style.header} appheader`}>
    <IndexLink to="/">
      <div className={style.logo} dangerouslySetInnerHTML={{ __html: svg }}>
      </div>
    </IndexLink>
  </nav>
);

export default Header;
