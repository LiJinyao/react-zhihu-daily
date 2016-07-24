import React, { PropTypes } from 'react';
import style from './StoriesList.styl';
import StoryItem from './StoryItem';
import Loading from '../Loading';

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

// /**
//  * 输入一个两位或一位数，返回带前导0格式的字符串。
//  * @param  {Number} num range 0 to 99.
//  * @return {String}     string with leading zero.
//  */
// function leadingZero(num) {
//   const string = String(num);
//   if (string.length === 1) {
//     return `0${string}`;
//   }
//   return string;
// }

function getDate(dateString) {
  const date = parseDate(dateString);
  return `${date.month}月${date.day}日`;
}

const StoriesList = ({ stories, fetchNews, isFetching }) => {

  const list = stories.map(dailyStory => {
    const storyList = dailyStory.stories.map(story => (
      <StoryItem
        key={story.id}
        {...story}
      />
      )
    );
    // push date tag in the front
    storyList.unshift(
      <div className={style.date} key={dailyStory.date}>{getDate(dailyStory.date)}</div>
    );
    return storyList;
  });


  if (isFetching && stories.length === 0) {
    return (<Loading />);
  } else if (isFetching && stories.length !== 0) {
    list.push(
      <Loading key="Loading" />
    );
  } else {
    // push next day in the end
    list.push(
      <span className={style.nextDay} key="nextDay">
        <input
          type="button"
          value={"Next Day"}
          onClick={() => {
            fetchNews(`before/${stories[stories.length - 1].date}`);
          }}
        />
      </span>);
  }

  return (
    <div className={style.storyList}>{list}</div>
  );
};

StoriesList.propTypes = {
  stories: PropTypes.array.isRequired,
  fetchNews: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default StoriesList;
