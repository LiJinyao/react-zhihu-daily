import React from 'react';

const Story = ({ story }) => (
  <div dangerouslySetInnerHTML={{ __html: story.body }}></div>
);

export default Story;
