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
    const { id, title, meta, image } = this.props;
    return (
      <Link
        className={style.item}
        to={`/explore/${String(id)}`}
      >
        <div className={style.coverPlaceholder}>

        </div>
      </Link>
    );
  }
}

ThemeItem.propTypes = {
  theme:       PropTypes.object,
  name:        PropTypes.string.isRequired,
  id:          PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  thumbnail:   PropTypes.string.isRequired,
};

export default ThemeItem;
