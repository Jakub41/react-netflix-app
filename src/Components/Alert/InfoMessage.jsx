import React from 'react'
import { Alert } from 'reactstrap'
import PropTypes from 'prop-types'

const InfoMessage = props => {
  return (
    <div className="my-2">
      <Alert color="info">{props.message}</Alert>
    </div>
  )
};

InfoMessage.propTypes = {
  message: PropTypes.string
};

export default InfoMessage
