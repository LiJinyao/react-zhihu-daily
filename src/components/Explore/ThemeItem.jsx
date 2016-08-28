import React, { Component, PropTypes } from 'react';
import { zhihuAPI } from '../../statics/';
import { Link } from 'react-router';
import style from './ThemeItem.styl';
// import StackBlur from './stackBlur';
          // <img
          //   className={style.cover}
          //   src={`${zhihuAPI + theme.image}`}
          //   alt={description}
          //   onLoad={(event) => { this.imgLoad(event); }}
          // />
class ThemeItem extends Component {
  componentDidMount() {

  }

  imgLoad() {
    // console.log(this.blurBkg);
    // let ctx = this.blurBkg.getContext('2d');
    // console.log(event.target);
    // // ctx.drawImage(event.target, 0, 0);
    // // StackBlur(event.target, this.blurBkg, 80, false);
    // console.log("image loaded");
  }
  render() {
    // iamge maybe undefined.
    const { id, title, meta, image } = this.props;
    return (
      <Link
        className={style.item}
        to={`/explore/${id}`}
      >
        <div className={style.coverPlaceholder}>
          <h1>{title}</h1>
        </div>
      </Link>
    );
  }
}

ThemeItem.propTypes = {
  title:  PropTypes.string.isRequired,
  id:    PropTypes.string.isRequired,
  meta:  PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default ThemeItem;
