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
import React, { useState } from "react";

// reactstrap components
import {
  Badge,
  // Card,
  // CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import "../index.css";
import CategoryDetail from "./CategoryDetails";

let a = [1];

class ProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
  }
  addCategory() {
    // this.props.history.push("/maps")
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <div className="col">
              <Card>
                <CardBody>
                  <CardTitle>Product Details</CardTitle>
                  <CardText>{this.props.productDetails.discription}</CardText>
                  <br />
                  <Row>
                    <Col md={4}>
                      <h3>Product Name</h3>
                    </Col>
                    <Col md={8}>{this.props.productDetails.product_name}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Status</h3>
                    </Col>
                    <Col md={8}>{this.props.productDetails.status}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Services</h3>
                    </Col>
                    <Col md={8}>{this.props.productDetails.services}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Cut Price</h3>
                    </Col>
                    <Col md={8}>{this.props.productDetails.cut_price}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Current Price</h3>
                    </Col>
                    <Col md={8}>{this.props.productDetails.sale_price}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Color</h3>
                    </Col>
                    <Col md={8}>
                      {" "}
                      {this.props.productDetails.color != undefined
                        ? this.props.productDetails.color.map((c, i) => (
                            <span key={i}> {" " + c.color + ", "} </span>
                          ))
                        : null}{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Size</h3>
                    </Col>
                    <Col md={8}>
                      {" "}
                      {this.props.productDetails.size != undefined
                        ? this.props.productDetails.size.map((c, i) => (
                            <span key={i}> {" " + c.size + ", "} </span>
                          ))
                        : null}{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Category</h3>
                    </Col>
                    <Col md={8}>
                      {this.props.productDetails.category &&
                        this.props.productDetails.category.category_name}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Subcategory</h3>
                    </Col>
                    <Col md={8}>
                      {this.props.productDetails.category &&
                        this.props.productDetails.category.subcategories
                          .subcategory_name}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Discription</h3>
                    </Col>
                    <Col md={8}>{this.props.productDetails.discription}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Vendor Name</h3>
                    </Col>
                    <Col md={8}>{this.props.productDetails.vendor_name}</Col>
                  </Row>
                </CardBody>
              </Card>
              <br />
              <Card>
                <CardBody>
                  <Row>
                    {this.props.productDetails.product_imgs != undefined
                      ? this.props.productDetails.product_imgs.map((url, i) => {
                          return (
                            <Col key={i} md={3}>
                              <img
                                style={{
                                  width: 100,
                                  height: 100,
                                  borderRadius: 5,
                                  marginBottom: 10,
                                }}
                                src={url}
                              />
                            </Col>
                          );
                        })
                      : null}
                  </Row>
                </CardBody>
                {/* <CardFooter style={{ display: "flex", justifyContent: "flex-end" }}  >
                                    <Button color="">Close</Button>
                                    <Button color="info">Edit</Button>
                                </CardFooter> */}
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default ProductModal;
