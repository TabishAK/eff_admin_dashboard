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
import { put, post } from "../../request/request";

// let a = [1]

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.userData);
    this.state = {
      modal: true,
    };
  }
  toggle = () => this.setState({ modal: !this.state.modal });
  suspendUser(data, status) {
    data.status = status;
    post({ _id: data._id, status }, "account/suspand")
      .then((res) => {
        this.toggle();
        console.log(res);
      })
      .catch((err) => {});
  }

  render() {
    const { companyDetails } = this.props.userData;

    const { banckDetail } = this.props;
    return companyDetails ? (
      <>
        <Container fluid>
          <Row>
            <div className="col">
              <Card>
                <CardBody>
                  <Row>
                    <Col md={4}>
                      <img
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                        src={companyDetails.logo}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md={4}>
                      <h3>Name</h3>
                    </Col>
                    <Col md={8}>{this.props.userData.username}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Username</h3>
                    </Col>
                    <Col md={8}>{this.props.userData.username}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Status</h3>
                    </Col>
                    <Col md={8}>{this.props.userData.status}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Contact</h3>
                    </Col>
                    <Col md={8}>{this.props.userData.phone_number}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Email</h3>
                    </Col>
                    <Col md={8}>{this.props.userData.email}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Created Date</h3>
                    </Col>
                    <Col md={8}>
                      {new Date(
                        Number(this.props.userData.date)
                      ).toDateString()}
                    </Col>
                  </Row>
                </CardBody>
                {console.log(this.props.userData)}
                <CardBody>
                  <Row>
                    <h2 className="mb-0">Company Detail</h2>
                  </Row>
                  <br />
                  <Row>
                    <Col md={4}>
                      <h3>Company Name</h3>
                    </Col>
                    <Col md={8}>
                      {companyDetails.companyName || "Not Available"}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Address</h3>
                    </Col>
                    <Col md={8}>
                      {companyDetails.address || "Not Available"}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Contact</h3>
                    </Col>
                    <Col md={8}>
                      {companyDetails.contact || "Not Available"}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Email</h3>
                    </Col>
                    <Col md={8}>{companyDetails.email || "Not Available"}</Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <h3>Monthly Incom</h3>
                    </Col>
                    <Col md={8}>{companyDetails.monthlyIncom}</Col>
                  </Row>
                </CardBody>
                <CardBody>
                  <Row>
                    <h2 className="mb-0">Banck Detail</h2>
                  </Row>
                  <br />
                  <Row>
                    <Col md={4}>
                      <h3>Account Number</h3>
                    </Col>
                    <Col md={8}>
                      {banckDetail.accountNumber || "Not Available"}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Account Holeder</h3>
                    </Col>
                    <Col md={8}>
                      {banckDetail.accountHolder || "Not Available"}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>Banck Name</h3>
                    </Col>
                    <Col md={8}>{banckDetail.bankName || "Not Available"}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>JazzCash</h3>
                    </Col>
                    <Col md={8}>{banckDetail.jazzCash || "Not Available"}</Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <h3>EazyPaisa</h3>
                    </Col>
                    <Col md={8}>{banckDetail.eazyPaisa || "Not Available"}</Col>
                  </Row>
                </CardBody>
              </Card>
              <br />
              <Card>
                <CardFooter
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button color="" onClick={() => this.props.closeModal()}>
                    Close
                  </Button>
                  {this.props.userData.status ? (
                    <Button
                      onClick={this.suspendUser.bind(
                        this,
                        this.props.userData,
                        false
                      )}
                      color="info"
                    >
                      Suspended
                    </Button>
                  ) : (
                    <Button
                      onClick={this.suspendUser.bind(
                        this,
                        this.props.userData,
                        true
                      )}
                      color="info"
                    >
                      Active
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    ) : null;
  }
}

export default UserModal;
