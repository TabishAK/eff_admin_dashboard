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
import { FaUserCog } from "react-icons/fa";
import { post } from "../../request/request";
import { useState } from "react";
import React from "react";
const AdminLogin = (props) => {
  const [username, setUsername] = useState("tabish");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    if (username != "" && password != "") {
      const obj = { username, password };
      post(obj, "auth/signin")
        .then((res) => {
          console.log("res", res);
          let data = res.data;
          localStorage.setItem("currentUser", JSON.stringify(data));
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err.response.data);
          setError(err.response.data);
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
        ></div>
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h5>Sign in with admin credentials</h5>
          </div>
          <Form role="form">
            <FormGroup className="mb-3">
              <Input
                name={"email"}
                id="input-address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
                type="email"
                autoComplete="new-email"
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
              />{" "}
              <label
                style={{
                  color: "red",
                  fontSize: "12px",
                  left: "6px",
                  position: "relative",
                }}
              >
                {error}
              </label>
            </FormGroup>{" "}
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

export default AdminLogin;
