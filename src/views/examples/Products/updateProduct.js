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
  CustomInput,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import "../../index.css";
import { get } from "../../../request/request";
import { put } from "./../../../request/request";

const WIDTH = { width: "100%" };

class CreateCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      subCategoryList: null,
      product_creative_image: null,
      product_broucher_image: null,
      product_name: "",
      product_slug: "",
      subCategory: "",
      product_description: "",
      image1: null,
      image2: null,

      isUpdateMod: false,

      loader: true,
    };
  }

  componentDidMount() {
    this.fetchData();
    const updateProduct = JSON.parse(localStorage.getItem("updateProduct"));
    if (updateProduct != null) {
      const {
        product_name,
        product_slug,
        product_creative_image,
        product_broucher_image,
        subCategory,
        product_description,
        _id,
      } = updateProduct;

      this.setState({
        product_name: product_name,
        product_slug: product_slug,
        product_creative_image: product_creative_image,
        product_broucher_image: product_broucher_image,
        subCategory: subCategory,
        product_description: product_description,
        isUpdateMod: true,
        _id: _id,
      });
    }
    console.log(updateProduct);
  }

  fetchData() {
    get("subCategories/")
      .then(({ data }) => {
        if (data) {
          this.setState({ subCategoryList: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  changeHandle(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.name === "product_creative_image") {
        this.setState({
          image1: URL.createObjectURL(e.target.files[0]),
          product_creative_image: e.target.files[0],
        });
      } else {
        this.setState({
          image2: URL.createObjectURL(e.target.files[0]),
          product_broucher_image: e.target.files[0],
        });
      }
    }
  };
  getId() {
    const aikobject = this.state.subCategory.subCategory_name
      ? this.state.subCategory.subCategory_name
      : this.state.subCategory;
    const obj = this.state.subCategoryList.filter(
      (l) => aikobject === l.subCategory_name
    );
    return obj[0]._id;
  }
  editCategory = () => {
    console.log(this.state.product_name);
    console.log(this.state.product_slug);
    console.log(this.state.product_broucher_image);
    console.log(this.state.product_creative_image);
    console.log(this.state.product_description);
    console.log(this.state._id);
    console.log(this.getId());

    let formData = new FormData();
    formData.append("product_name", this.state.product_name);
    formData.append("product_slug", this.state.product_slug);
    formData.append(
      "product_broucher_image",
      this.state.product_broucher_image
    );
    formData.append(
      "product_creative_image",
      this.state.product_creative_image
    );

    formData.append("product_description", this.state.product_description);
    formData.append("mainCategory", this.getId());
    formData.append("_id", this.state._id);

    put(formData, "products/update")
      .then((res) => {
        console.log(res);
        this.setState({ loader: false });
        this.props.history.push("products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const {
      product_name,
      product_slug,
      product_creative_image,
      product_broucher_image,
      subCategory,
      product_description,
      subCategoryList,
      image1,
      image2,
      loader,
    } = this.state;
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
                      <h3 className="mb-0">Update Subcategory</h3>
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
                                  Product Name
                                </label>
                                <Input
                                  onChange={this.changeHandler.bind(this)}
                                  name="product_name"
                                  value={product_name}
                                  id="input-address"
                                  placeholder="Product Name"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Product Slug
                                </label>
                                <Input
                                  onChange={this.changeHandler.bind(this)}
                                  name="product_slug"
                                  value={product_slug}
                                  id="input-address"
                                  placeholder="Product Name"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Product Creative Imageee
                                </label>
                                <CustomInput
                                  id="fileInput"
                                  type="file"
                                  name="product_creative_image"
                                  onChange={this.onImageChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <img
                                src={image1 ? image1 : product_creative_image}
                                style={{
                                  width: 200,
                                  height: 150,
                                  marginBottom: 20,
                                }}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Product Broucher Image
                                </label>
                                <CustomInput
                                  id="fileInput"
                                  type="file"
                                  name="product_broucher_image"
                                  onChange={this.onImageChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <img
                                src={image2 ? image2 : product_broucher_image}
                                style={{ width: 150, height: 150 }}
                              />
                            </Col>
                          </Row>

                          <Col md="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Product Description
                              </label>
                              <Input
                                style={{ height: "150px" }}
                                id="fileInput"
                                type="textarea"
                                name="product_description"
                                onChange={this.changeHandle.bind(this)}
                                value={product_description}
                              />
                            </FormGroup>
                          </Col>
                        </CardBody>
                      </Card>
                    </div>
                  </Form>
                  <br />
                  <Form>
                    <div className="pl-lg-4">
                      <Card className="">
                        <CardBody>
                          <Row
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Col md={"12"}>
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Col md="10">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Subcategory
                                    </label>

                                    <Input
                                      value={subCategory.subCategory_name}
                                      type="select"
                                      id="exampleSelect"
                                      onChange={this.changeHandle.bind(this)}
                                      name="subCategory"
                                    >
                                      <option>Select</option>
                                      {subCategoryList &&
                                        subCategoryList.map((v, i) => {
                                          return (
                                            <option key={i}>
                                              {v.subCategory_name}
                                            </option>
                                          );
                                        })}
                                    </Input>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                      <br />
                      <br />

                      <Row>
                        {loader ? (
                          <Col md={"12"}>
                            <Button
                              onClick={this.editCategory.bind(this)}
                              style={WIDTH}
                              color="info"
                            >
                              Update
                            </Button>
                          </Col>
                        ) : (
                          ""
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
