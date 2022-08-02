import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container, Row } from "reactstrap";
import routes from "adminRoutes.js";
import jwt from "jwt-decode";

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        console.log(prop.layout + prop.path, ":<===");
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    const user = localStorage.getItem("currentUser");
    const userInfo = user && jwt(user);

    return userInfo !== null ? (
      <Redirect to="/admin/main_categories" />
    ) : (
      <>
        <div className="main-content">
          <div className="header bg-gradient-info py-7 py-lg-8">
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>

          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>
                {this.getRoutes(routes)}
                <Redirect from="*" to="/auth/login" />
              </Switch>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Auth;
