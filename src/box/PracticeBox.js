import React from 'react';
import '../css/main.css'
import PropTypes from 'prop-types';
import TextBox1 from '../components/TextBox1';

function PracticeBox({type}) {
  return (
    <div className="practice-box">
      {type === "sentence" && <TextBox1 />}
    </div>
  );
}

PracticeBox.propTypes = {
  type: PropTypes.string,
};

export default PracticeBox;