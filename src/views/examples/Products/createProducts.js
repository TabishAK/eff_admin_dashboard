import React from "react";
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
import { get, post, put } from "../../../request/request";
import jwt from "jwt-decode";
import { useSelector } from "react-redux";
import Loader from "components/Loader/loader";

const token = JSON.parse(localStorage.getItem("currentUser"));
const userInfo = token && jwt(token);

class CreateCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      subCategoryList: null,
      product_creative_image: null,
      product_broucher_image: null,
      product_name: "",
      product_slug: "",
      subCategory: "",
      product_description: "",
      loader: false,
      image1: null,
      image2: null,
    };
  }
  componentDidMount() {
    this.fetchData();
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

  getId() {
    const obj = this.state.subCategoryList.filter(
      (l) => this.state.subCategory === l.subCategory_name
    );
    return obj[0]._id;
  }

  saveProduct() {
    this.setState({ loader: true });
    const obj = {
      product_name: this.state.product_name,
      product_slug: this.state.product_slug,
      product_creative_image: this.state.product_creative_image,
      product_broucher_image: this.state.product_broucher_image,
      product_description: this.state.product_description,
      subCategory: this.getId(),
    };

    console.log(obj);

    let formData = new FormData();
    formData.append("product_name", this.state.product_name);
    formData.append(
      "product_creative_image",
      this.state.product_creative_image
    );
    formData.append(
      "product_broucher_image",
      this.state.product_broucher_image
    );
    formData.append("product_slug", this.state.product_slug);
    formData.append("product_description", this.state.product_description);
    formData.append("subCategory", this.getId());

    post(formData, "products/add")
      .then((res) => {
        console.log(res);
        this.setState({ loader: false });
        this.props.history.push("products");
      })
      .catch((err) => {
        console.log(err);
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

  render() {
    const {
      subCategoryList,
      product_name,
      product_slug,
      subCategory,
      product_description,
      isEditMod,
      loader,
    } = this.state;
    return (
      <>
        <UserHeader />
        <Container className="mt--9" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Create Product</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{ backgroundColor: "#fff" }}>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Product Name
                            </label>
                            <Input
                              onChange={this.changeHandle.bind(this)}
                              name={"product_name"}
                              value={product_name}
                              id="input-address"
                              placeholder="Product Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Product Slug
                            </label>
                            <Input
                              onChange={this.changeHandle.bind(this)}
                              name={"product_slug"}
                              value={product_slug}
                              id="input-address"
                              placeholder="Product Slug"
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
                              Creative Image
                            </label>

                            <CustomInput
                              id="fileInput"
                              type="file"
                              name="product_creative_image"
                              onChange={this.onImageChange}
                            />
                          </FormGroup>
                        </Col>

                        <Col md={"3"}>
                          {this.state.image1 ? (
                            <img
                              style={{ width: "35%", marginBottom: "10px" }}
                              src={this.state.image1}
                              alt={"selected-image"}
                            />
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Broucher Image
                            </label>
                            <CustomInput
                              id="fileInput"
                              type="file"
                              name="product_broucher_image"
                              onChange={this.onImageChange}
                            />
                          </FormGroup>
                        </Col>

                        <Col md={"3"}>
                          {this.state.image2 ? (
                            <img
                              style={{ width: "35%" }}
                              src={this.state.image2}
                              alt={"selected-image"}
                            />
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>

                      <Row>
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
                              name="product_description"
                              onChange={this.changeHandle.bind(this)}
                              value={product_description}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Select Subcategory
                            </label>
                            <Input
                              value={subCategory}
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

                      <br />
                      <br />
                      <Row>
                        {loader ? (
                          <Loader />
                        ) : (
                          <Col md="12">
                            {isEditMod ? (
                              <Button
                                onClick={this.editProduct.bind(this)}
                                color="info"
                                style={{ width: "100%" }}
                              >
                                Update
                              </Button>
                            ) : (
                              <Button
                                onClick={this.saveProduct.bind(this)}
                                color="info"
                                style={{ width: "100%" }}
                              >
                                Save
                              </Button>
                            )}
                          </Col>
                        )}
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br />
          <br />
        </Container>
      </>
    );
  }
}

export default CreateCategory;
