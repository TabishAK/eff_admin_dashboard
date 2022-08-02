import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import React, { useState } from "react";
import { post } from "../../request/request";
import { FaUserSecret } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const VendorLogin = (props) => {
  const [username, setUsername] = useState("Ahmed12");
  const [password, setPassword] = useState("1122");
  let history = useHistory();
  const signIn = () => {
    if (username != "" && password != "") {
      const obj = { username, password };
      post(obj, "vendor/signin")
        .then((res) => {
          console.log("res", res);
          let data = res.data;
          localStorage.setItem("currentUser", JSON.stringify(data));
          window.location.href = "/";
          // history.replace("/vendor");
          // this.props.history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <div
          style={{
            display: "flex",
            position: "relative",
            top: "15px",
            left: "10px",
          }}
        >
          <FaUserSecret style={{ color: "#5e72e4" }} />
          <h5
            style={{
              cursor: "pointer",
              marginLeft: "5px",
              top: "-2px",
              color: "#5e72e4",
              position: "relative",
            }}
            onClick={props.goToAdmin}
          >
            Got to Admin Login
          </h5>
        </div>

        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h5>Sign in with Vendor</h5>
          </div>
          <Form role="form">
            <FormGroup className="mb-3">
              <Input
                name={"username"}
                id="input-address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                type="username"
                autoComplete="new-username"
              />
            </FormGroup>
            <FormGroup>
              <Input
                name={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                autoComplete="new-password"
              />
            </FormGroup>
            <div className="custom-control custom-control-alternative custom-checkbox">
              <input
                className="custom-control-input"
                id=" customCheckLogin"
                type="checkbox"
              />
              <label
                className="custom-control-label"
                htmlFor=" customCheckLogin"
              >
                <span className="text-muted">Remember me</span>
              </label>
            </div>
            <div className="text-center">
              <Button
                onClick={signIn}
                className="my-4"
                color="primary"
                type="button"
              >
                Sign in
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Row className="mt-3">
        <Col xs="6">
          <a
            className="text-light"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <small>Forgot password?</small>
          </a>
        </Col>
      </Row>
    </Col>
  );
};

export default VendorLogin;
