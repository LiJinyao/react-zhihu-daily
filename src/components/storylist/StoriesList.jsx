import React, { Component, PropTypes } from 'react';
import style from './StoriesList.styl';
import StoryItem from './StoryItem';
import { zhihuAPI } from '../../statics';
import ReactSwipe from 'react-swipe';
import { Link } from 'react-router';
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

const TopStoryItem = ({ data }) => (
  <div
    className={style.swipeItem}
    style={{
      backgroundImage:    `url('${zhihuAPI}${data.image}')`,
      backgroundSize:     'cover',
      backgroundRepeat:   'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    <div className={style.header}>
     {data.title}
    </div>
    <Link className={style.linkwarp} to={`/news/${data.id}`} />
  </div>
);

const SwipeNav = ({ next, prev }) => (
  <div className={style.directionNav}>
    <i
      className={`${style.prev} ${style.navbtn} iconfont`}
      onClick={prev}
    />
    <i
      className={`${style.next} ${style.navbtn} iconfont`}
      onClick={next}
    />
  </div>
);

class StoriesList extends Component {
  constructor(props) {
    super(props);
    this.ReactSwipeRef = null;
  }
  setReactSwipeRef(ref) {
    this.ReactSwipeRef = ref;
  }
  next() {
    this.ReactSwipeRef.next();
  }
  prev() {
    this.ReactSwipeRef.prev();
  }
  render() {
    const { stories, fetchNews, isFetching, fetchError, errorMessage, storyExtra } = this.props;
    let list = [];
    if (stories.length !== 0) {
      // slider
      // list.push(<Slider data={stories[0].top_stories} key="topStories" />);
      const swip = (
        <div key="swipe" className={style.topStoryWarp}>
          <ReactSwipe
            ref={ref => { this.setReactSwipeRef(ref); }}
            className={style.topStory}
            swipeOptions={{ continuous: true, auto: 3000 }}
          >
            {stories[0].top_stories.map(item => (
              <TopStoryItem data={item} key={item.id} />
            ))}
          </ReactSwipe>
          <SwipeNav next={() => { this.next(); }} prev={() => { this.prev(); }} />
        </div>
  );
      list.push(swip);
      list.push(
        stories.map(dailyStory => {
          const storyList = dailyStory.stories.map(story => (
            <StoryItem
              key={story.id}
              {...story}
              storyExtra={storyExtra}
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
      <div className={style.storyList}>

        {list}
      </div>
    );
  }
}

StoriesList.propTypes = {
  stories:      PropTypes.array.isRequired,
  fetchNews:    PropTypes.func.isRequired,
  isFetching:   PropTypes.bool.isRequired,
  fetchError:   PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  storyExtra:   PropTypes.instanceOf(Map),
};

export default StoriesList;
