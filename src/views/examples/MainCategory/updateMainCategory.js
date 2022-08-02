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
import { put } from "../../../request/request";

const WIDTH = { width: "100%" };

class CreateCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      isUpdateMod: false,
      files: [],
      subcategories: [],
      categoryName: "",
      categoryStatus: "Active",
      categoryImg: "",
      subcategoryName: "",
      subcategoryStatus: "Active",
      subcategoryImg: undefined,
      fileInputState: "",
      subcategoryEdit: false,
      loader: false,
    };
  }

  componentDidMount() {
    const updateCategory = JSON.parse(localStorage.getItem("updateCategory"));
    if (updateCategory != null) {
      const {
        category_name,
        category_image,
        category_status,
        subcategories,
        _id,
      } = updateCategory;

      this.setState({
        categoryName: category_name,
        categoryStatus: category_status,
        categoryImg: category_image,
        subcategories,
        isUpdateMod: true,
        _id,
      });
    }
  }

  async editCategory() {
    const { categoryName, _id } = this.state;
    const obj = { _id: _id, category_name: categoryName };

    put(obj, "mainCategory/update")
      .then((res) => {
        localStorage.removeItem("updateCategory");
        this.setState({
          isUpdateMod: false,
          categoryName: "",
          loader: false,
        });
        this.props.history.push("main_categories");
      })
      .catch((err) => {
        this.setState({ loader: false });
        console.log("Erorr: ", err);
      });
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { categoryName, isUpdateMod, loader } = this.state;
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
                              onClick={this.editCategory.bind(this)}
                              style={WIDTH}
                              color="info"
                            >
                              Update
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
