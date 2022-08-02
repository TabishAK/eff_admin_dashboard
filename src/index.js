import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { Provider } from "react-redux";
import store from "store";
import Vendor from "./layouts/Vendor";

const App = () => {
  const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  // const userInfo = currentUser && jwt(currentUser);
  // console.log(userInfo);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/vendor" render={(props) => <Vendor {...props} />} />
          <Redirect from="/" to={currentUser == null ? "/auth/login" : ""} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
