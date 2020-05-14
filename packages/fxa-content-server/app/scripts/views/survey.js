/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*eslint-disable no-unused-vars*/
import React, { useState, useEffect } from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import BaseView from './base';

/*eslint-disable no-unused-vars*/
import Survey, {
  CreateHandleIframeTask,
} from '@fxa-components/Survey/index.tsx';
/*eslint-enable no-unused-vars*/

/*eslint-disable no-unused-vars*/
const SurveyView = surveyURL => {
  /*eslint-enable no-unused-vars*/
  const [showSurvey, setShowSurvey] = useState(true);
  const [surveyComplete, setSurveyComplete] = useState(false);

  useEffect(() => {
    const handleIframeTask = CreateHandleIframeTask(() => {
      setSurveyComplete(true);
      setTimeout(() => {
        setShowSurvey(false);
      }, 300);
    });
    // here we are listening for the 'survey complete'
    // message from surveygizmo

    // TODO: We aren't receiving a message back from survey gizmo, this may be an issue on localhost
    window.addEventListener('message', handleIframeTask, false);
    return () => window.removeEventListener('message', handleIframeTask);
  }, [setShowSurvey, setSurveyComplete, setTimeout]);

  // TODO: why is surveyURL turning into {surveyURL: ""}?
  return (
    <>
      {showSurvey && (
        <Survey {...{ surveyComplete, surveyURL: surveyURL.surveyURL }} />
      )}
    </>
  );
};

const SurveyWrapperView = BaseView.extend({
  template: () => '<div />',
  className: 'survey-wrapped',

  initialize(options = {}) {
    this.surveyURL = options.surveyURL;
  },

  render() {
    console.log('rendering survey wrapper:', this.$el.get(0));
    return ReactDOM.render(
      <SurveyView {...{ surveyURL: this.surveyURL }} />,
      this.$el.get(0)
    );
  },
});

export default SurveyWrapperView;
