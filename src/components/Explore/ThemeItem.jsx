import React from 'react';
import { Link } from 'react-router';
const ThemeItem = ({ description, thumbnail, id, name }) => (
  <div>
    {description}
    {name}
  </div>
);

export default ThemeItem;
