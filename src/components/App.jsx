import React from 'react';
import style from './App.styl';
import Header from './Header';
import Footer from './Footer';

export default ((props) => (
  <div>
    <Header></Header>
    {props.children}
    <Footer></Footer>
  </div>
));
