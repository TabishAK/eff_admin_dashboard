import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
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

import ProductModal from "./ProductDetailsModal";
import Header from "components/Headers/Header.js";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { get, post, put } from "../../request/request";
import axios from "axios";

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      productsList: [],
      productDetails: {},
      searchVal: "",
      loader: false,
      isLoadMore: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const data_fetch = localStorage.getItem("data_fetch-url");
    get(data_fetch == null ? "vendorProduct/get?skip=0&limit=7" : data_fetch)
      .then(({ data }) => {
        if (data) {
          this.setState({ productsList: data.products, isLoadMore: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  nextData() {
    const productsList = this.state.productsList;
    let skip = productsList.length;
    let limit = productsList.length + 20;
    let url = "vendorProduct/get?skip=" + skip + "&limit=" + limit;
    get(url)
      .then(({ data }) => {
        if (data && data.products.length > 0) {
          console.log(data);
          this.setState(
            { productsList: productsList.concat(data.products) },
            () => {}
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggle = (data) =>
    this.setState({ modal: !this.state.modal, productDetails: data });
  removeProduct = (productDetails) => {
    console.log(productDetails._id, "-===- -===-");
    post({ _id: productDetails._id }, "vendorProduct/delete").then(
      ({ data }) => {
        this.setState({
          productsList: this.state.productsList.filter(
            (x) => productDetails._id !== x._id
          ),
        });
        this.toggle(productDetails);
      }
    );
  };

  searchHandler(e) {
    this.setState({ searchVal: e.target.value });
    if (e.target.value == "") {
      this.fetchData();
    } else {
      post({ text: e.target.value }, "vendorProduct/search")
        .then(({ data }) => {
          if (data) {
            console.log(data);
            this.setState({ productsList: data.products });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  approveProduct = () => {
    console.log(this.state.productDetails);
    put(
      {
        status:
          this.state.productDetails.status === "Pending"
            ? "Approved"
            : this.state.productDetails.status == "Approved"
            ? "Disapproved"
            : this.state.productDetails.status == "Disapproved"
            ? "Approved"
            : "Some Thing Went Wrong!",

        _id: this.state.productDetails._id,
      },
      "vendorProduct/update"
    )
      .then((res) => {
        let productDetails = { ...this.state.productDetails };
        productDetails.status = res.data.status;
        this.setState({ productDetails });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
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
                      {/* </Col>
                       
                      </Row> */}
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
                            to={"/admin/crete-product"}
                            tag={NavLinkRRD}
                            onClick={() => {}}
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
                      <th scope="col">Image</th>
                      <th scope="col">Product Code</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                      <th scope="col">Vendor Name</th>
                    </tr>
                  </thead>

                  <tbody style={{ textAlign: "center" }}>
                    {this.state.productsList.map((v, x) => (
                      <tr key={x}>
                        <td>
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              style={{ height: 50, width: 50 }}
                              onClick={this.toggle.bind(this, v)}
                              src={
                                v.product_imgs[0] ||
                                require("assets/img/theme/bootstrap.jpg")
                              }
                            />
                          </a>
                        </td>
                        <th scope="row">{v.product_Id}</th>
                        <th scope="row">{v.product_name}</th>
                        <th scope="row">{v.category.category_name}</th>
                        <th scope="row">RS {v.sale_price}</th>

                        <td>{v.status}</td>
                        <th>
                          {v.user.vendor_name}

                          {/* <Button color="info">{"View more"}</Button> */}
                        </th>
                      </tr>
                    ))}
                    <div>
                      <Modal
                        isOpen={this.state.modal}
                        className="modal-container"
                        toggle={this.toggle}
                      >
                        <ModalBody>
                          <ProductModal
                            productDetails={this.state.productDetails}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color=""
                            onClick={this.removeProduct.bind(
                              this,
                              this.state.productDetails
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
                                to={"/admin/crete-product"}
                                tag={NavLinkRRD}
                                onClick={() => {}}
                                activeClassName="active"
                              >
                                <Button
                                  color="info"
                                  onClick={() => {
                                    this.setState({ modal: false });
                                    localStorage.setItem(
                                      "updateProduct",
                                      JSON.stringify(this.state.productDetails)
                                    );
                                  }}
                                >
                                  Edit
                                </Button>
                              </NavLink>
                            </NavItem>

                            <NavItem onClick={() => {}}>
                              <NavLink>
                                <Button
                                  onClick={this.approveProduct}
                                  color="info"
                                >
                                  {this.state.productDetails !== undefined
                                    ? this.state.productDetails.status ===
                                      "Pending"
                                      ? "Approve"
                                      : this.state.productDetails.status ===
                                        "Approved"
                                      ? "Disapprove"
                                      : this.state.productDetails.status ===
                                        "Disapproved"
                                      ? "Approve"
                                      : ""
                                    : ""}
                                </Button>
                              </NavLink>
                            </NavItem>
                          </Nav>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </tbody>
                </Table>
                <CardFooter style={{ margin: "auto" }} className="py-5  ">
                  {this.state.isLoadMore ? (
                    <div>
                      {/* <Button onClick={this.prevData.bind(this)} color="link">Previous</Button> */}
                      <Button onClick={this.nextData.bind(this)} color="link">
                        Load more
                      </Button>
                    </div>
                  ) : null}

                  {/* <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav> */}
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
