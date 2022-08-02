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
      products: null,
      product_name: null,
      subCategory_name: "",
      subCategory_slug: "",
      subCategory_image: null,
      pdf: "",
      loader: false,
      renderImageArr: [],
      postImageArr: [],
      mainCategory: "",
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    get("products/")
      .then(({ data }) => {
        if (data) {
          console.log(data);
          this.setState({ products: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getId() {
    const obj = this.state.products.filter(
      (l) => this.state.product_name === l.product_name
    );
    return obj[0] ? obj[0]._id : null;
  }

  saveSwatches() {
    this.setState({ loader: true });
    let formData = new FormData();
    this.state.postImageArr.map((pia, i) => {
      formData.append(`swatch_image`, pia);
    });

    formData.append("products", this.getId());

    post(formData, "swatches/add")
      .then((res) => {
        console.log(res);
        this.setState({ loader: false });
        this.props.history.push("swatches");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }

  changeHandle(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onImageChange = (e) => {
    let renderImageArr = [];
    let postImageArr = [];

    if (e.target.files.length !== 0) {
      Array.from(e.target.files).forEach((f) => {
        renderImageArr.push(URL.createObjectURL(f));
        postImageArr.push(f);
      });
      this.setState({ renderImageArr, postImageArr });
    }
  };

  render() {
    console.log(this.state.products);
    const { renderImageArr, products, product_name } = this.state;
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
                      <h3 className="mb-0">Add Swatches</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{ backgroundColor: "#fff" }}>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md={"6"}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Add Images
                            </label>

                            <form
                              className="uploader"
                              encType="multipart/form-data"
                            >
                              <input
                                accept="image/png, image/jpeg"
                                type="file"
                                id="file"
                                multiple
                                onChange={this.onImageChange}
                              />
                            </form>
                          </FormGroup>
                        </Col>

                        <Col md={"12"}>
                          {renderImageArr.length !== 0
                            ? renderImageArr.map((ri) => (
                                <img
                                  style={{
                                    width: 200,
                                    height: 150,
                                    margin: 15,
                                  }}
                                  src={ri}
                                  alt={"selected-image"}
                                />
                              ))
                            : ""}
                        </Col>

                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Select Product
                            </label>
                            <Input
                              value={product_name}
                              type="select"
                              id="exampleSelect"
                              onChange={this.changeHandle.bind(this)}
                              name="product_name"
                            >
                              <option>Select</option>
                              {products &&
                                products.map((v, i) => {
                                  return (
                                    <option key={i}>{v.product_name}</option>
                                  );
                                })}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <br />
                      <br />
                      <Row>
                        <Col md="12">
                          <Button
                            onClick={this.saveSwatches.bind(this)}
                            color="info"
                            style={{ width: "100%" }}
                          >
                            Save
                          </Button>
                        </Col>
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
