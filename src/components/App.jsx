import React from 'react';
import style from './App.styl';
import Header from './Header';
import Footer from './Footer';
import Stories from '../containers/Stories';

export default (() => (
  <div>
    <Header></Header>
    <Stories></Stories>
    <Footer></Footer>
  </div>
));
