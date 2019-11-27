import React from "react";
import {Alert} from "reactstrap";
import PropTypes from "prop-types";
import {FaExclamationTriangle} from "react-icons/fa";
import {Row, Col} from "reactstrap";

const Error = props => {
  return (
      <Alert color="danger">
      <Row className="vertical-align">
        <Col xs="1" className="text-center">
          <FaExclamationTriangle className="icon-error" />
        </Col>
        <Col xs="11">
          <span>{props.message}</span>
        </Col>
        </Row>
      </Alert>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
