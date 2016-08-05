import React from 'react';
import style from './Header.styl';
import { IndexLink, Link, withRouter } from 'react-router';
import daily from '!raw-loader!./daily.svg';
import explore from '!raw-loader!./explore.svg';

const Header = ({router, location}) => {
  // is enter explore page.
  console.log(/(^\/explore)/.test(location.pathname));
  return (
    <nav className={`${style.headerWarp} appheader`}>
      <div className={style.header}>
        <IndexLink className={style.headerLink} to="/" activeClassName={style.linkActive}>
          <div className={style.daily} dangerouslySetInnerHTML={{ __html: daily }}>
          </div>
        </IndexLink>
        <Link to="/explore" className={style.headerLink} activeClassName={style.linkActive}>
          <div className={style.daily} dangerouslySetInnerHTML={{ __html: explore }}>
          </div>
        </Link>
      </div>
    </nav>
  );
};
export default withRouter(Header);
