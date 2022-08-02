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
      swatches: null,
      products: null,
      renderImageArr: [],
      productList: [],
      postImageArr: [],
      loader: false,
      product_name: null,
    };
  }

  componentDidMount() {
    this.fetchData();
    const updateSwatch = JSON.parse(localStorage.getItem("updateSwatch"));
    if (updateSwatch != null) {
      const { swatches, products, _id } = updateSwatch;

      this.setState({
        swatches: swatches,
        products: products,
        isUpdateMod: true,
        _id: _id,
      });
    }

    console.log(updateSwatch);
  }

  fetchData() {
    get("products/")
      .then(({ data }) => {
        if (data) {
          this.setState({ productList: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeHandle(e) {
    console.log(e.target.name);
    console.log(e.target.value);

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
  getId() {
    const aikobject = this.state.products.product_name
      ? this.state.products.product_name
      : this.state.product_name;
    const obj = this.state.productList.filter(
      (l) => aikobject === l.product_name
    );
    return obj[0]._id;
  }
  editSwatch = () => {
    let formData = new FormData();

    this.state.postImageArr.map((pia) => {
      formData.append(`swatch_image`, pia);
    });

    formData.append("products", this.getId());
    formData.append("_id", this.state._id);

    put(formData, "swatches/update")
      .then((res) => {
        console.log(res);
        this.setState({ loader: false });
        this.props.history.push("swatches");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  render() {
    const {
      _id,
      swatches,
      products,
      renderImageArr,
      product_name,
      productList,
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
                      <h3 className="mb-0">Update Swatches</h3>
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
                                    width: 120,
                                    height: 100,
                                    margin: 15,
                                  }}
                                  src={ri}
                                  alt={"selected-image"}
                                />
                              ))
                            : swatches &&
                              swatches.map((ri) => (
                                <img
                                  style={{
                                    width: 120,
                                    height: 100,
                                    margin: 15,
                                  }}
                                  src={ri.swatch_image}
                                  alt={"selected-image"}
                                />
                              ))}
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
                              value={products && products.product_name}
                              type="select"
                              id="exampleSelect"
                              onChange={this.changeHandle.bind(this)}
                              name="products"
                            >
                              <option>Select</option>
                              {productList &&
                                productList.map((v, i) => {
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
                            onClick={this.editSwatch.bind(this)}
                            color="info"
                            style={{ width: "100%" }}
                          >
                            Update
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
