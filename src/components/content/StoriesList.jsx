import React, { PropTypes } from 'react';
import style from './StoriesList.styl';
import StoryItem from './StoryItem';

function getDate(dateString) {
  const month = parseInt(dateString.substring(4, 6), 10);
  const day = parseInt(dateString.substring(6, 8), 10);
  return `${month}月${day}日`;
}

const StoriesList = ({ stories }) => (
  <div className={style.storyList}>
    {
      stories.map(dailyStory => {
        const storyList = dailyStory.stories.map(story => (
          <StoryItem
            key={story.id}
            {...story}
          />
          )
        );
        // push date tag in the front
        storyList.unshift(<div className={style.date}>{getDate(dailyStory.date)}</div>);

        // push next day in the end
        storyList.push(<span className={style.nextDay}>
          <input type="button" value={"Next Day"} onClick={() => { console.log("Hello") }} />
        </span>);
        return storyList;
      })
    }
  </div>
);



StoriesList.propTypes = {
  stories: PropTypes.array.isRequired,
};

export default StoriesList;
