import React from 'react';
import style from './App.styl';
import Header from './Header';
import Footer from './Footer';

// because Header have a Link linkto Index, but we need it actived **except** one path.
// so we need let it know its location.

export default (({ children, location }) => (
  <div className={style.root}>
    <Header location={location} />
    {children}
    <Footer />
  </div>
));
