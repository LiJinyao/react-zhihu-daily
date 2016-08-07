import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Explore from '../components/Explore';
import { fetchThemesIfNeeded } from '../actions';

class ExploreContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchThemesIfNeeded());
  }
  render() {
    const {
      isFetching, themes, dispatch, fetchError, theme,
      errorMessage, lastUpdated, didInvalidate } = this.props;
    return (
      <Explore
        isFetching={isFetching}
        themes={themes}
        theme={theme}
        dispatch={dispatch}
        fetchError={fetchError}
        errorMessage={errorMessage}
        lastUpdated={lastUpdated}
        didInvalidate={didInvalidate}
      />
    );
  }
}

ExploreContainer.propTypes = {
  dispatch:      PropTypes.func.isRequired,
  themes:        PropTypes.object,
  theme:         PropTypes.instanceOf(Map).isRequired,
  isFetching:    PropTypes.bool.isRequired,
  fetchError:    PropTypes.bool.isRequired,
  errorMessage:  PropTypes.string,
  lastUpdated:   PropTypes.number,
  didInvalidate: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    // get a day's stories.
    themes:        state.themes.cache,
    theme:         state.theme.themeCache,
    isFetching:    state.themes.isFetching,
    fetchError:    state.themes.fetchError,
    errorMessage:  state.themes.errorMessage,
    lastUpdated:   state.themes.lastUpdated,
    didInvalidate: state.themes.didInvalidate,
  }
);

export default connect(mapStateToProps)(ExploreContainer);
