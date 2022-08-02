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
  Card,
  CardHeader,
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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import "../../views/index.css";
import CategoryDetail from "./CategoryDetails";

// let a = [1,]

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  render() {
    const { data } = this.props;
    console.log(data, "-daaattaa");

    return (
      <>
        <Container fluid>
          <Row>
            <div className="col">
              <CardHeader className="border-0">
                <Row>
                  <Col
                    xs="6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3 className="mb-0">Category Detail</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="col">Categoris</th>
                    <th scope="col">Status</th>
                    <th scope="col">Image</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="row">{data.category_name}</th>
                    <th>{data.category_status}</th>
                    <td>
                      <a
                        className="avatar rounded-circle mr-3"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <img
                          style={{ height: 50, width: 50 }}
                          alt="..."
                          src={data.category_image}
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <br />
              <CardHeader className="border-0">
                <Row>
                  <Col
                    xs="6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3 className="mb-0">Subcategoris</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">subcategoris</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">More</th> */}
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  {data.subcategories
                    ? data.subcategories.map((v, x) => (
                        <tr key={x}>
                          <td>
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                style={{ height: 50, width: 50 }}
                                alt="..."
                                src={v.subcategory_image}
                              />
                            </a>
                          </td>
                          <th scope="row">{v.subcategory_name}</th>
                          <td>{v.subcategory_status}</td>
                          {/* <th>
                                                <div>
                                                    <Nav style={{ textAlign: "right", justifyContent: "flex-end" }}  >
                                                        <NavItem onClick={() => { }}>
                                                            <NavLink to={"/admin/crete-category"} tag={NavLinkRRD} onClick={() => { }} activeClassName="active">
                                                                Edit
                                                            </NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                </div>
                                            </th> */}
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
              {/* </Card> */}
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
