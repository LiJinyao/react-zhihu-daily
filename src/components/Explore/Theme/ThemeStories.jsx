import React, { Component } from 'react';
import StoryItem from '../../Storylist/StoryItem';
import { connect } from 'react-redux';
import { fetchThemeIfNeeded } from '../../../actions';
import style from './ThemeStories.styl';
import { zhihuAPI } from '../../../statics';
import StatusAlert, { STATUS_ALERT_LOADING, STATUS_ALERT_ERROR } from '../../StatusAlert';
class ThemeStories extends Component {
  componentDidMount() {
    const { dispatch, themeID } = this.props;
    dispatch(fetchThemeIfNeeded(parseInt(themeID, 10)));
  }
  render() {
    const { themeCache, themeID, errorMessage, fetchError, isFetching } = this.props;
    if (themeCache.has(parseInt(themeID, 10))) {
      const theme = themeCache.get(parseInt(themeID, 10));
      return (
        <div className="mainContainer">
          <div
            className={style.imgPlaceHolder}
            style={{ backgroundImage: `url(${zhihuAPI}${theme.background})` }}
          >
            <div className={style.imgBannerBackground}></div>
            <span className={style.storyListitle}>{theme.name}</span>
            <span className={style.imageCopyright}>
              {theme.image_source.length !== 0 && `图片：${theme.image_source}`}
            </span>
          </div>
          <div className="s">
            {
              theme.stories.map(story => (<StoryItem {...story} key={story.id} />))
            }
          </div>
        </div>
      );
    } else if (fetchError) {
      return (<StatusAlert status={STATUS_ALERT_ERROR} errorMessage={errorMessage} expand />)
    } else if (isFetching) {
      return (<StatusAlert status={STATUS_ALERT_LOADING} expand />);
    }
    return (<div></div>);
  }
}
const mapStateToProps = (state, ownProps) => (
  {
    // get a day's stories.
    themeCache:   state.theme.themeCache,
    isFetching:   state.theme.isFetching,
    fetchError:   state.theme.fetchError,
    themeID:      ownProps.params.id,
    errorMessage: state.theme.errorMessage,
  }
);

export default connect(mapStateToProps)(ThemeStories);
