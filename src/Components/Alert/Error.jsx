import React from 'react'
import { Alert } from 'reactstrap'
import PropTypes from 'prop-types'

const Error = props => {
  return (
    <div className="my-2">
      <Alert color="danger">{props.message}</Alert>
    </div>
  )
};

Error.propTypes = {
  message: PropTypes.string
};

export default Error
