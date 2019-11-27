import React from "react";
import {Row, Col, Alert} from "reactstrap";
import PropTypes from "prop-types";
import {FaSmileBeam} from "react-icons/fa"

const InfoMessage = props => {
  return (
    <Alert color="success">
      <Row className="vertical-align">
        <Col xs="1" className="text-center">
          <FaSmileBeam className="icon-error" />
        </Col>
        <Col xs="11">
          <span>{props.message}</span>
        </Col>
        </Row>
      </Alert>
  );
};

InfoMessage.propTypes = {
  message: PropTypes.string,
};

export default InfoMessage;
