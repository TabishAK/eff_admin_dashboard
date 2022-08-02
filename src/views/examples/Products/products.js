import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { get, post, _delete } from "../../../request/request";
import Header from "components/Headers/Header.js";
import ProductDetails from "./productDetails";
import "../../index.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CardFooter from "reactstrap/lib/CardFooter";

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      products: [],
      viewProductDetails: {},
      searchVal: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const obj = { pageNumber: 1, pageSize: 10 };
    post(obj, "products/getWithPagination")
      .then((data) => {
        if (data) {
          this.setState({ products: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggle = (v) =>
    this.setState({ modal: !this.state.modal, viewProductDetails: v });

  deleteCategory(e) {
    _delete(e._id, "products/delete").then(({ data }) => {
      this.setState({
        products: this.state.products.data.p.filter((x) => e._id !== x._id),
      });
      this.toggle({ subcategories: [] });
    });
  }

  searchHandler(e) {
    this.setState({ searchVal: e.target.value });
    if (e.target.value == "") {
      this.fetchData();
    } else {
      post({ text: e.target.value }, "category/search")
        .then(({ data }) => {
          if (data) {
            console.log(data, "ppp ppp");
            this.setState({ categoryList: data.categories });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  check(s, pagenumber) {
    const obj = { pageNumber: pagenumber, pageSize: 10 };
    post(obj, "products/getWithPagination/")
      .then((data) => {
        console.log(data);
        if (data !== undefined) {
          console.log(data);
          this.setState({ products: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(obj);
  }

  render() {
    const { products, viewProductDetails } = this.state;
    return (
      <>
        <Header />
        <Container className="mt--9" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col xs="6">
                      <FormGroup>
                        <Input
                          onChange={this.searchHandler.bind(this)}
                          name="categoryName"
                          value={this.state.searchVal}
                          id="input-address"
                          placeholder="Search"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ textAlign: "right" }} xs="6">
                      <Nav
                        style={{
                          textAlign: "right",
                          justifyContent: "flex-end",
                        }}
                      >
                        <NavItem>
                          <NavLink
                            to={"/admin/create-product"}
                            tag={NavLinkRRD}
                            activeClassName="active"
                          >
                            <Button color="info" type="button">
                              Add New
                            </Button>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead
                    className="thead-light"
                    style={{ textAlign: "center" }}
                  >
                    <tr>
                      {/* <th scope="col">ID</th> */}
                      <th scope="col">Product Name</th>
                      <th scope="col">Subcategory Name</th>
                      <th scope="col">Product Creative Image</th>
                      <th scope="col">Product Broucher Image </th>
                      <th scope="col">More</th>
                    </tr>
                  </thead>
                  <tbody
                    className="product-names"
                    style={{ textAlign: "center" }}
                  >
                    {products.data &&
                      products.data.p.map((v, x) => {
                        return (
                          <tr key={x}>
                            {/* <td>{v._id}</td> */}
                            <td scope="row">{v.product_name}</td>
                            <td scope="row">
                              {v.subCategory.subCategory_name}
                            </td>
                            <td>
                              <a onClick={(e) => e.preventDefault()}>
                                <img
                                  style={{ height: 100, width: 100 }}
                                  alt="..."
                                  src={v.product_creative_image}
                                />
                              </a>
                            </td>{" "}
                            <td>
                              <a onClick={(e) => e.preventDefault()}>
                                <img
                                  style={{ height: 100, width: 100 }}
                                  alt="..."
                                  src={v.product_broucher_image}
                                />
                              </a>
                            </td>
                            <th>
                              <Button
                                color="info"
                                onClick={this.toggle.bind(this, v)}
                              >
                                {"View more"}
                              </Button>
                            </th>
                          </tr>
                        );
                      })}
                    <div>
                      <Modal
                        isOpen={this.state.modal}
                        className="modal-container"
                        toggle={this.toggle}
                      >
                        <ModalBody>
                          <ProductDetails data={viewProductDetails} />
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color=""
                            onClick={this.deleteCategory.bind(
                              this,
                              viewProductDetails
                            )}
                          >
                            Delete
                          </Button>
                          <Nav
                            style={{
                              textAlign: "right",
                              justifyContent: "flex-end",
                            }}
                          >
                            <NavItem onClick={() => {}}>
                              <NavLink
                                to={"/admin/update-products"}
                                tag={NavLinkRRD}
                                activeClassName="active"
                              >
                                <Button
                                  color="info"
                                  onClick={() => {
                                    this.setState({ modal: false });
                                    localStorage.setItem(
                                      "updateProduct",
                                      JSON.stringify(viewProductDetails)
                                    );
                                  }}
                                >
                                  Edit
                                </Button>
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Stack spacing={2} style={{ float: "right" }}>
                      <Pagination
                        onChange={this.check.bind(this)}
                        count={products.data && products.data.nav}
                        color="primary"
                      />
                    </Stack>
                  </nav>
                </CardFooter>
              </Card>
              <br />
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
