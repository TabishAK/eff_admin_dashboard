import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "../vendorRoutes";

class Vendor extends Component {
  state = {};

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/vendor") {
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
    return (
      <>
        <Sidebar
          routes={routes}
          logo={{
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref="mainContent">
          <Switch>{this.getRoutes(routes)}</Switch>
        </div>
      </>
    );
  }
}

export default Vendor;
