import React, { PropTypes } from 'react';
import HotCirclely from '../HotCirclely';
import style from './index.styl';
import StoryItem from '../../StoryList/StoryItem';
const CircleStories = ({
  isFetching,
  circleStories,
  fetchError,
  errorMessage,
  circleStoryExtra }) => {
    console.log(circleStories);
  const memberAlias = circleStoryExtra.member_alias || '读者';
  return (
    <div className="mainContainer">
      <HotCirclely
        title={circleStoryExtra.name}
        id={String(circleStoryExtra.id)}
        meta={`${circleStoryExtra.count.stories}文章${circleStoryExtra.count.members} ${memberAlias}`}
        circleExtra={circleStoryExtra}
      />
      {circleStories &&
          circleStories.stories.map(story => (
            <StoryItem
              key={story.id}
              title={story.title}
              images={story.images}
              storyExtra={null}
              externalUrl={story.external_url}
              id={story.id}
              linkPrefix={"/explore/story"}
              storyExtra={{
                comments:   story.count.comments,
                popularity: story.count.likes,
              }}
            />
          ))
      }

    </div>
  );
};
export default CircleStories;
