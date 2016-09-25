import React, { PropTypes } from 'react';
import style from './StoryList.styl';
import StoryItem from './StoryItem';
import Slider from '../Slider/Slider';
import StatusAlert, { STATUS_ALERT_LOADING, STATUS_ALERT_ERROR } from '../StatusAlert';

function parseDate(dateString) {
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10);
  const day = parseInt(dateString.substring(6, 8), 10);
  return {
    year,
    month,
    day,
  };
}

function getDate(dateString) {
  const date = parseDate(dateString);
  return `${date.month}月${date.day}日`;
}

const StoriesList = ({ stories, fetchNews, isFetching, fetchError, errorMessage, storyExtra }) => {
  let list = [];
  if (stories.length !== 0) {
    // slider
    list.push(<Slider data={stories[0].top_stories} key="slider" />);
    const topStoryIds = new Set();
    stories[0].top_stories.forEach(item => {
      topStoryIds.add(item.id);
    });
    list.push(
      stories.map(dailyStory => {
        const storyList = dailyStory.stories
        .filter((item) => (!topStoryIds.has(item.id)))
        .map(story => (
          <StoryItem
            key={story.id}
            {...story}
            linkPrefix="/news"
            storyExtra={storyExtra.get(story.id)}
          />
          )
        );
        // push date tag in the front
        storyList.unshift(
          <div className={style.date} key={dailyStory.date}>{getDate(dailyStory.date)}</div>
        );
        return storyList;
      })
    );
  }

  // featch today's stories
  // fetch error
  if (fetchError) {
    // expand alert if the story is empty.
    list = (<StatusAlert
      status={STATUS_ALERT_ERROR}
      errorMessage={errorMessage}
      expand={stories.length === 0}
    />);
  } else if (isFetching && stories.length === 0) {
    // the storylist is empty
    list = (<StatusAlert status={STATUS_ALERT_LOADING} expand />);
  } else if (isFetching && stories.length !== 0) {
    // fetch other day's stories.
    // the storylist is not empty.
    list.push(
      <StatusAlert status={STATUS_ALERT_LOADING} key="Loading" />
    );
  } else {
    // add next day button in the end
    list.push(
      <span className={style.nextDay} key="preDay">
        <input
          type="button"
          value={"前一天"}
          onClick={() => {
            fetchNews(`before/${stories[stories.length - 1].date}`);
          }}
        />
      </span>);
  }

  return (
    <div className="mainContainer">

      {list}
    </div>
  );
};

StoriesList.propTypes = {
  stories:      PropTypes.array.isRequired,
  fetchNews:    PropTypes.func.isRequired,
  isFetching:   PropTypes.bool.isRequired,
  fetchError:   PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  storyExtra:   PropTypes.instanceOf(Map),
};

export default StoriesList;
