import { connect } from 'react-redux';
import { readStory } from '../actions';

const mapStateToProps = (state) => {
  return {

    // get today's topStories.
    // TODO 
    topStories: state.news
  }
}
