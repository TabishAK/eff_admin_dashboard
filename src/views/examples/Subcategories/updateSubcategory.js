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
      subCategory_name: "",
      subCategory_slug: "",
      subCategory_image: "",
      pdf: "",
      mainCategory: "",
      image: undefined,
      isUpdateMod: false,
      files: [],
      subcategories: [],
      categoryName: "",
      categoryStatus: "Active",
      categoryImg: "",
      mainCategoryList: null,
      subcategoryName: "",
      subcategoryStatus: "Active",
      subCategory_description: "",
      subcategoryImg: undefined,
      fileInputState: "",
      subcategoryEdit: false,
      loader: false,
    };
  }

  componentDidMount() {
    this.fetchData();
    const updateCategory = JSON.parse(
      localStorage.getItem("updateSubcategory")
    );
    if (updateCategory != null) {
      const {
        subCategory_name,
        subCategory_slug,
        subCategory_image,
        pdf,
        mainCategory,
        subCategory_description,
        _id,
      } = updateCategory;

      this.setState({
        subCategory_name: subCategory_name,
        subCategory_slug: subCategory_slug,
        subCategory_image: subCategory_image,
        pdf: pdf,
        mainCategory: mainCategory,
        subCategory_description: subCategory_description,
        isUpdateMod: true,
        _id: _id,
      });
    }
    console.log(updateCategory);
  }

  fetchData() {
    get("mainCategory/")
      .then(({ data }) => {
        if (data) {
          this.setState({ mainCategoryList: data });
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
      if (e.target.name === "subCategory_image") {
        this.setState({
          image: URL.createObjectURL(e.target.files[0]),
          subCategory_image: e.target.files[0],
        });
      } else {
        this.setState({
          pdf: e.target.files[0],
        });
      }
    }
  };
  getId() {
    const aikobject = this.state.mainCategory.category_name
      ? this.state.mainCategory.category_name
      : this.state.mainCategory;
    const obj = this.state.mainCategoryList.filter(
      (l) => aikobject === l.category_name
    );
    return obj[0]._id;
  }
  editCategory = () => {
    let formData = new FormData();
    formData.append("subCategory_name", this.state.subCategory_name);
    formData.append("subCategory_slug", this.state.subCategory_slug);
    formData.append("subCategory_image", this.state.subCategory_image);
    formData.append(
      "subCategory_description",
      this.state.subCategory_description
    );
    formData.append("pdf", this.state.pdf);
    formData.append("mainCategory", this.getId());
    formData.append("_id", this.state._id);

    put(formData, "subCategories/update")
      .then((res) => {
        console.log(res);
        this.setState({ loader: false });
        this.props.history.push("sub_categories");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const {
      subCategory_name,
      subCategory_slug,
      subCategory_image,
      pdf,
      mainCategory,
      isUpdateMod,
      mainCategoryList,
      image,
      subCategory_description,
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
                                  Subcategory Name
                                </label>
                                <Input
                                  onChange={this.changeHandler.bind(this)}
                                  name="subCategory_name"
                                  value={subCategory_name}
                                  id="input-address"
                                  placeholder="Category Name"
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
                                  Subcategory Slug
                                </label>
                                <Input
                                  onChange={this.changeHandler.bind(this)}
                                  name="subCategory_slug"
                                  value={subCategory_slug}
                                  id="input-address"
                                  placeholder="Category Name"
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
                                  Subcategory Image
                                </label>
                                <CustomInput
                                  id="fileInput"
                                  type="file"
                                  name="subCategory_image"
                                  onChange={this.onImageChange}
                                />
                              </FormGroup>
                            </Col>

                            <Col md="6">
                              <img
                                src={image ? image : subCategory_image}
                                style={{ width: "45%" }}
                              />
                            </Col>

                            <Col md="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Product Description
                                </label>
                                <Input
                                  id="fileInput"
                                  type="textarea"
                                  name="subCategory_description"
                                  onChange={this.changeHandle.bind(this)}
                                  value={subCategory_description}
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
                                <Col md="6">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Update PDF
                                    </label>
                                    <CustomInput
                                      id="fileInput"
                                      type="file"
                                      name="pdf"
                                      onChange={this.onImageChange}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="6">
                                  <h4
                                    style={{
                                      cursor: "pointer",
                                      position: "relative",
                                      top: "8px",
                                    }}
                                    onClick={() => window.open(pdf, "_blank")}
                                  >
                                    Open Current PDF
                                  </h4>
                                </Col>
                                <Col md="10">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Main Category
                                    </label>

                                    <Input
                                      value={mainCategory.category_name}
                                      type="select"
                                      id="exampleSelect"
                                      onChange={this.changeHandle.bind(this)}
                                      name="mainCategory"
                                    >
                                      <option>Select</option>
                                      {mainCategoryList &&
                                        mainCategoryList.map((v, i) => {
                                          return (
                                            <option key={i}>
                                              {v.category_name}
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

                      {/* <Row>
                        <Col md="12" >
                          <Example type={"subcategory Status"} />
                        </Col>
                      </Row> */}
                      {/* <Row>
                        <Col md="12" >
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              subcategory Icon
                            </label>
                            <FormGroup>
                              <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
                            </FormGroup>
                          </FormGroup>
                        </Col>
                      </Row> */}
                      <Row>
                        {loader ? (
                          <Col
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Saveing...
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
