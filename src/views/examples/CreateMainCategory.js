/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, Component } from "react";

// reactstrap components
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
import { NavLink as NavLinkRRD, Link } from "react-router-dom";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import "../index.css";
import FileBase64 from "../base64";
import { post, put } from "../../request/request";

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
        // subcategoryName: subcategory_name,
        // subcategoryStatus: subcategoryImg,
        // subcategoryImg: "su",
      });
    }
  }

  async addNewSubCategory() {
    // const file = await localStorage.getItem("image_for_upload")
    const {
      subcategories,
      subcategoryName,
      subcategoryImg,
      subcategoryStatus,
    } = this.state;
    let body = {};
    if (!subcategoryImg) {
      alert("Requier name, image and status in a category!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(subcategoryImg);
    // localStorage.setItem("image_for_upload", JSON.stringify(reader.result))
    reader.onerror = () => console.error("something went wrong!");
    reader.onloadend = async () => {
      // body = { data: reader.result }
      try {
        await fetch("http://66.70.215.18:8000/images/upload", {
          method: "POST",
          body: JSON.stringify({ data: reader.result }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => {
          res.json().then((res) => {
            console.log(res, "==============================");
            if (subcategoryName !== "" && res.url && subcategoryStatus !== "") {
              const obj = {
                subcategory_name: subcategoryName,
                subcategory_status: subcategoryStatus,
                subcategory_image: res.url,
              };
              subcategories.push(obj);
              this.setState({
                subcategories,
                subcategoryName: "",
                subcategoryStatus: "Active",
                subcategoryImg: "",
                fileInputState: "",
              });
            } else {
              alert("Requier name, image and status in a category!");
            }
            // localStorage.removeItem("image_for_upload")
          });
        });
      } catch (err) {
        console.error(err);
      }
    };
  }

  addNewCategory(url) {
    const { subcategories, categoryName, categoryStatus } = this.state;
    const obj = {
      category_name: categoryName,
      category_status: categoryStatus,
      category_image: url,
      subcategories: subcategories,
    };

    if (
      categoryName !== "" &&
      obj.url !== "" &&
      categoryStatus !== "" &&
      subcategories.length != 0
    ) {
      post(obj, "category/add")
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
      alert("All Feilds are requier!");
    }
  }

  async editCategory() {
    const { subcategories, categoryName, categoryImg, categoryStatus, _id } =
      this.state;
    const file = await localStorage.getItem("image_for_upload");
    try {
      await fetch("http://66.70.215.18:8000/images/upload", {
        method: "POST",
        body: JSON.stringify({ data: file }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        res.json().then((res) => {
          console.log("obj", res);
          console.log(
            categoryName,
            categoryStatus,
            categoryImg,
            subcategories.length
          );
          if (
            categoryName !== "" &&
            categoryStatus !== "" &&
            subcategories.length !== 0
          ) {
            this.setState({ loader: true });

            const obj = {
              category_name: categoryName,
              category_status: categoryStatus,
              category_image: file == null ? categoryImg : res.url,
              subcategories: subcategories,
              _id,
            };
            console.log(obj, "res");
            put(obj, "category/update")
              .then((res) => {
                localStorage.removeItem("updateCategory");
                this.setState({
                  isUpdateMod: false,
                  files: [],
                  subcategories: [],
                  categoryName: "",
                  categoryStatus: "",
                  categoryImg: "",
                  subcategoryName: "",
                  subcategoryStatus: "",
                  subcategoryImg: null,
                  loader: false,
                });
                this.props.history.push("Categories");
              })
              .catch((err) => {
                this.setState({ loader: false });
                console.log("Erorr: ", err);
              });
          } else {
            alert("Requier name, image and status in a category!");
          }
          localStorage.removeItem("image_for_upload");
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getsubCategoryImg(files) {
    // this.setState({ subcategoryImg: files[0].base64 })
  }

  getCategoryImg(files) {
    // this.setState({ categoryImg: files[0].base64 })
  }

  editBefotrAdd = (e, v, i) => {
    e.preventDefault();
    const { subcategories } = this.state;
    let getedCategory = subcategories[i];
    // console.log(getedCategory.subcategory_image)
    this.setState({
      subcategoryName: getedCategory.subcategory_name,
      subcategoryImg: getedCategory.subcategory_image,
      subcategoryEdit: true,
      editIndex: i,
    });
  };

  async updateSubcategory() {
    const { subcategories, editIndex, subcategoryName, subcategoryImg } =
      this.state;
    // const file = await localStorage.getItem("image_for_upload")
    // subcategoryImg

    if (typeof subcategoryImg == "string") {
      subcategories[editIndex].subcategory_name = subcategoryName;
      subcategories[editIndex].subcategory_image = subcategoryImg;
      this.setState({ subcategories, subcategoryEdit: false, editIndex: null });
    } else if (typeof subcategoryImg == "object") {
      const reader = new FileReader();
      reader.readAsDataURL(subcategoryImg);
      // localStorage.setItem("image_for_upload", JSON.stringify(reader.result))
      reader.onerror = () => console.error("something went wrong!");
      reader.onloadend = async () => {
        try {
          await fetch("http://66.70.215.18:8000/images/upload", {
            method: "POST",
            body: JSON.stringify({ data: reader.result }),
            headers: { "Content-Type": "application/json" },
          }).then((res) => {
            res.json().then((res) => {
              subcategories[editIndex].subcategory_name = subcategoryName;
              subcategories[editIndex].subcategory_image = res.url;
              this.setState({
                subcategories,
                subcategoryEdit: false,
                editIndex: null,
              });
            });
          });
        } catch (err) {
          console.error(err);
        }
      };
    }
  }

  deltSubcategory(e, _, ind) {
    e.preventDefault();
    const { subcategories } = this.state;
    subcategories.filter((_, i) => i !== ind);
    this.setState({ subcategories: subcategories.filter((_, i) => i !== ind) });
  }

  uploadImage = () => {
    this.setState({ loader: true });
    const file = localStorage.getItem("image_for_upload");
    try {
      fetch("http://66.70.215.18:8000/images/upload", {
        method: "POST",
        body: JSON.stringify({ data: file }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        res.json().then((res) => {
          this.addNewCategory(res.url);
          localStorage.removeItem("image_for_upload");
        });
      });
    } catch (err) {
      this.setState({ loader: false });
      console.error(err);
    }
  };

  render() {
    const {
      categoryName,
      isUpdateMod,
      subcategoryName,
      subcategoryEdit,
      fileInputState,
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
                            {isUpdateMod ? (
                              <Button
                                onClick={this.editCategory.bind(this)}
                                style={WIDTH}
                                color="info"
                              >
                                Update
                              </Button>
                            ) : (
                              <Button
                                onClick={this.uploadImage.bind(this)}
                                style={WIDTH}
                                color="info"
                              >
                                Add New Category
                              </Button>
                            )}
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
