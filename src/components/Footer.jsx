import React from 'react';
import style from './Footer.styl';

const Footer = () => (
  <div className={`${style.footerContainer} appfooter`}>
    <div className={style.footer}>
      <span className={style.intro}>
      用 react 写的 Zhihu Daily
      </span>
      <br />
      <a
        className={style.github}
        href="https://github.com/LiJinyao/react-zhihu-daily"
        target="_blank"
      >
        View on GitHub
      </a>
    </div>
  </div>
  );

export default Footer;
