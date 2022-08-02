import axios from "axios";
import Header from "components/Headers/Header";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react/cjs/react.development";
import { Col } from "reactstrap";
import Button from "reactstrap/lib/Button";
import Card from "reactstrap/lib/Card";
import CardHeader from "reactstrap/lib/CardHeader";
import Container from "reactstrap/lib/Container";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import Row from "reactstrap/lib/Row";
import Table from "reactstrap/lib/Table";
import { bindActionCreators } from "redux";
import * as actions from "../../store/action/vendorAction";
import { API } from "./../../store/API";

const CreateVendor = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const action = bindActionCreators(actions, dispatch);
  const [data, setData] = useState("");
  const [username, setUserName] = useState("");
  const [vendor, setVendor] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");

  const onChangeSelection = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/vendor/")
      .then(function (response) {
        setVendor(response.data.vendors);
      })
      .catch(function (error) {
        console.log(error);
      });

    action
      .vendorAction()
      .then((res) => {
        console.log(
          "TCL ~ file: CreateVendor.js ~ line 26 ~ action.vendorAction ~ res",
          res
        );
        setData(res?.vendors);
      })
      .catch((e) => console.log(e, "this is e"));
  }, []);

  const vendorcreate = (e) => {
    if (username == "" || password === "" || selectedOption === "") {
      setError("*Please Fill All The Fields");
    } else {
      const dat = data.filter((e) => e.name === selectedOption)[0]._id;
      axios({
        method: "post",
        url: API.vendor,
        data: {
          username: username,
          password: password,
          user: dat,
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Header />
      <Container className="mt--9" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h1>Vendor account creation</h1>
                    <h5>{error}</h5>
                  </Col>
                </Row>
                <Row>
                  <Col lg="3" xs="3">
                    <FormGroup>
                      <Label for="exampleSelect">Select</Label>
                      <Input
                        type="select"
                        name="select"
                        placeholder="none"
                        id="exampleSelect"
                        value={selectedOption}
                        onChange={onChangeSelection}
                      >
                        <option value="select" hidden></option>
                        {data && data.map((e) => <option>{e.name}</option>)}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="3" xs="3">
                    <FormGroup>
                      <Label>UserName</Label>
                      <Input
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="UserName"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3" xs="3">
                    <FormGroup>
                      <Label>Password</Label>
                      <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    lg="2"
                    xs="2"
                    style={{ textAlign: "right" }}
                    className="mt-10"
                  >
                    <Button onClick={() => vendorcreate()} color="info">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="col">S.no</th>
                    <th scope="col">Name</th>
                    <th scope="col">UserName</th>
                    <th scope="col">password</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  {vendor &&
                    vendor.map((v, i) => (
                      <tr>
                        <td>{i}</td>
                        <td>{v.user.name}</td>
                        <td>{v.username}</td>
                        <td>{v.password}</td>
                        <td>OK</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card>
            <br />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default CreateVendor;
