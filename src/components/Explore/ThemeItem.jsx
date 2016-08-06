import React from 'react';
import { zhihuAPI } from '../../statics/';
import { Link } from 'react-router';
const ThemeItem = ({ description, thumbnail, id, name, theme }) => (
  <Link to={`/:${String(id)}`}>
    {description}
    {name}
    <img src={theme && `${zhihuAPI}${theme.background}`} alt="themeCover" />
  </Link>
);
export default ThemeItem;
