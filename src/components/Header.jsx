import React from 'react';
import style from './Header.styl';
import { IndexLink, Link } from 'react-router';
import daily from '!raw-loader!./daily.svg';
import explore from '!raw-loader!./explore.svg';

const Header = ({ location }) => {
  // is enter explore page.
  const explorePage = /(^\/explore)/.test(location.pathname);
  return (
    <nav className={`${style.headerWarp} appheader`}>
      <div className={`${style.header} ${explorePage ? style.right : style.left}`}>
        <IndexLink className={`${style.headerLink} ${!explorePage && style.active}`} to="/">
          <div className={style.daily} dangerouslySetInnerHTML={{ __html: daily }} />
          <div className={`${style.leftShadow} ${style.shadow}`} />
        </IndexLink>
        <Link to="/explore" className={`${style.headerLink} ${explorePage && style.active}`}>
          <div className={style.daily} dangerouslySetInnerHTML={{ __html: explore }} />
          <div className={`${style.rigthShadow} ${style.shadow}`} />
        </Link>
      </div>
    </nav>
  );
};
export default Header;
