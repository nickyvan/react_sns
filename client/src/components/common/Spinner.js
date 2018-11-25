import React from 'react';
import PropTypes from 'prop-types';
import spinner from './spinner.gif';
const propTypes = {
  
}

function Spinner(props) {
  return (
    <div>
      <img
        src = {spinner}
        style = {{width:'200px',margin:'auto',display:'block'}}
        alt= "Loading..."
      />
    </div>
  )
}

Spinner.propTypes = propTypes

export default Spinner
