import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openFeedbackModal as openFeedbackModalAction } from '../../actions';

function FeedBackWrapper ({
  openFeedbackModal
}) {
  return (
    <div>
      <div className={'tt-feedback'} onClick={openFeedbackModal}>
        <div className={'tt-feedback__text'}>Send Feedback</div>
      </div>
    </div>
  );
}

FeedBackWrapper.propTypes = {
  openFeedbackModal: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    openFeedbackModal: () => {
      dispatch(openFeedbackModalAction());
    }
  };
}

export default connect(null, mapDispatchToProps)(FeedBackWrapper);
