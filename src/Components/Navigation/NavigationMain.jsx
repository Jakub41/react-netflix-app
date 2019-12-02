import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownToggle,
  Navbar,
  Row,
  Col,
} from "reactstrap";

function NavigationMain({
  bgColor,
  leftSection,
  navigationLinks,
  rightSection,
}) {
  const [dropdown, setDropdown] = useState("");
  const [selectedNavigation, setSelectedNavigation] = useState("All");
  return (
    <Row style={{backgroundColor: bgColor}}>
      <Col sm={2}></Col>
      <Col className="left-section" sm={1}>
        {leftSection}
      </Col>
      <Col sm={5} className="only-desktop">
        {navigationLinks && navigationLinks.length > 0 && (
          <React.Fragment>
            <Navbar expand="md">
              <Nav navbar>
                {navigationLinks.map((item, index) => (
                  <NavItem key={index}>
                    <NavLink
                      href="#"
                      onClick={() => setSelectedNavigation(item)}
                      key={index}
                      style={{
                        color: selectedNavigation === index ? "red" : "white",
                        fontSize: 20,
                      }}
                    >
                      {item}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </Navbar>

            <div className="only-mobile">
              {navigationLinks & (navigationLinks.length > 0) && (
                <Dropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
                  <DropdownToggle caret>Browse</DropdownToggle>
                  <DropdownMenu>
                    {navigationLinks.map((item, index) => (
                      <DropdownItem
                        onClick={() => setSelectedNavigation(item)}
                        key={index}
                      >
                        {item}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          </React.Fragment>
        )}
      </Col>
      <Col sm={4} className="right-section">
        {rightSection}
      </Col>
    </Row>
  );
}

NavigationMain.propTypes = {
  leftSection: PropTypes.element,
  rightSection: PropTypes.element,
  navigationLinks: PropTypes.array,
  onSelectNavigation: PropTypes.func,
  bgColor: PropTypes.string,
};
NavigationMain.defaultProps = {
  bgColor: "#2b2a25",
};

export default NavigationMain;
