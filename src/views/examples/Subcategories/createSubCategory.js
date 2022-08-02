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
      mainCategoryList: null,
      subCategory_name: "",
      subCategory_slug: "",
      subCategory_image: null,
      pdf: "",
      subCategory_description: "",
      loader: false,
      mainCategory: "",
    };
  }
  componentDidMount() {
    this.fetchData();
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

  getId() {
    const obj = this.state.mainCategoryList.filter(
      (l) => this.state.mainCategory === l.category_name
    );
    return obj[0]._id;
  }

  saveProduct() {
    this.setState({ loader: true });
    // const obj = {
    //   subCategory_name: this.state.subCategory_name,
    //   subCategory_slug: this.state.subCategory_slug,
    //   subCategory_image: this.state.subCategory_image,
    //   pdf: this.state.pdf,
    //   mainCategory: this.getId(),
    // };

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

    console.log(formData);

    post(formData, "subCategories/add")
      .then((res) => {
        console.log(res);
        this.setState({ loader: false });
        this.props.history.push("sub_categories");
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

  render() {
    const {
      mainCategoryList,
      subCategory_name,
      subCategory_slug,
      mainCategory,
      isEditMod,
      subCategory_description,
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
                              Subcategory Name
                            </label>
                            <Input
                              onChange={this.changeHandle.bind(this)}
                              name={"subCategory_name"}
                              value={subCategory_name}
                              id="input-address"
                              placeholder="Subcategory Name"
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
                              Subcategory Slug
                            </label>
                            <Input
                              onChange={this.changeHandle.bind(this)}
                              name={"subCategory_slug"}
                              value={subCategory_slug}
                              id="input-address"
                              placeholder="Subcategory Slug"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={"6"}>
                          <Row
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Col md="12">
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

                            <Col md="12">
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
                        </Col>
                        <Col md={"6"}>
                          {this.state.image ? (
                            <img
                              style={{ width: "35%" }}
                              src={this.state.image}
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
                              Select PDF
                            </label>
                            <CustomInput
                              id="fileInput"
                              type="file"
                              name="pdf"
                              onChange={this.onImageChange}
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
                              Select Main Category
                            </label>
                            <Input
                              value={mainCategory}
                              type="select"
                              id="exampleSelect"
                              onChange={this.changeHandle.bind(this)}
                              name="mainCategory"
                            >
                              <option>Select</option>
                              {mainCategoryList &&
                                mainCategoryList.map((v, i) => {
                                  return (
                                    <option key={i}>{v.category_name}</option>
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
