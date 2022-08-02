import React, { useState, Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import UserHeader from "components/Headers/UserHeader.js";
import "../../index.css";
import { post } from "../../../request/request";

const WIDTH = { width: "100%" };

class CreateCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryName: "",
    };
  }

  addNewCategory(e) {
    e.preventDefault();
    const { categoryName } = this.state;
    const obj = { category_name: categoryName };

    if (categoryName !== "") {
      post(obj, "mainCategory/add")
        .then((res) => {
          if (res.data.message == "Already creaated the category") {
            alert(res.data.message);
          } else {
            this.setState({ loader: false });
            this.props.history.push("Categories");
          }
        })
        .catch((err) => {
          this.setState({ loader: false });
          console.log(err);
        });
    } else {
      this.setState({ loader: false });
      alert("All Feilds are requiered!");
    }
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { categoryName, loader } = this.state;
    return (
      <>
        <UserHeader />
        <Container className="mt--9" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Edit Main Category</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{ backgroundColor: "#fff" }}>
                  <Form>
                    <div className="pl-lg-4">
                      <Card className="">
                        <CardBody>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Category Name
                                </label>
                                <Input
                                  onChange={this.changeHandler.bind(this)}
                                  name="categoryName"
                                  value={categoryName}
                                  id="input-address"
                                  placeholder="Category Name"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </div>
                  </Form>
                  <br />
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        {loader ? (
                          <Col
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Saving...
                          </Col>
                        ) : (
                          <Col md={"12"}>
                            <Button
                              onClick={this.addNewCategory.bind(this)}
                              style={WIDTH}
                              color="info"
                            >
                              Add New Category
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default CreateCategory;
