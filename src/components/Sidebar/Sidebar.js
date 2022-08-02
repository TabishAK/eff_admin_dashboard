import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import logo1 from "../../images/logo/logo.png";
import { PropTypes } from "prop-types";
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import seirra from "../../assets/img/logo/sierra.png";
import { height } from "@mui/system";

class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };

  closeCollapse = () => {
    this.setState({
      collapseOpen: false,
    });
  };

  createLinks = (routes) => {
    return routes.map((prop, key) => {
      return prop.layout + prop.path !== "/auth/login" &&
        prop.layout + prop.path !== "/admin/crete-category" &&
        prop.layout + prop.path !== "/admin/create-main-category" &&
        prop.layout + prop.path !== "/admin/update-main-category" &&
        prop.layout + prop.path !== "/admin/create-product" &&
        prop.layout + prop.path !== "/admin/update-products" &&
        prop.layout + prop.path !== "/admin/crete-product" &&
        prop.layout + prop.path !== "/admin/create-sub-category" &&
        prop.layout + prop.path !== "/admin/create-swatches" &&
        prop.layout + prop.path !== "/admin/update-sub-category" &&
        prop.layout + prop.path !== "/admin/update-swatch" &&
        prop.layout + prop.path !== "/admin/category-detail" ? (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      ) : null;
    });
  };

  render() {
    const { routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link,
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank",
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {seirra ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                style={{ width: "100%", maxHeight: "9rem" }}
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={seirra}
              />
            </NavbarBrand>
          ) : null}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("assets/img/theme/team-1-800x800.jpg")}
                    />
                  </span>
                </Media>
              </DropdownToggle>
            </UncontrolledDropdown>
          </Nav>

          <Collapse
            style={{
              position: "relative",
              top: "-40px",
            }}
            navbar
            isOpen={this.state.collapseOpen}
          >
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>

            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            <Nav navbar>
              {this.createLinks(routes)}

              {this.props.settings ? (
                <NavItem>
                  <NavLink
                    to={"/admin/abx"}
                    tag={NavLinkRRD}
                    onClick={() => {}}
                    activeClassName="active"
                  >
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </NavLink>
                </NavItem>
              ) : (
                ""
              )}

              <NavItem>
                <NavLink
                  to={"/auth"}
                  tag={NavLinkRRD}
                  onClick={() => {
                    localStorage.removeItem("currentUser");
                  }}
                  activeClassName="active"
                >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
