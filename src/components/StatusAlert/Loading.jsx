import React from 'react';
import style from './Loading.styl';

const Loading = () => (
  <div className={style.loadingWarp}>
    <div className={style.laodingContent}>
      <div className={style.spinner}>
      </div>
      <span className={style.text}>
      loading...
      </span>
    </div>
  </div>
);

export default Loading;
