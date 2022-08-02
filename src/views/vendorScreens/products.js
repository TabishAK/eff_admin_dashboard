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

import ProductModal from "../examples/ProductDetailsModal";
import Header from "components/Headers/Header.js";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { get, post } from "../../request/request";

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
                            to={"/vendor/create-product"}
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
                      <th scope="col">More</th>
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
                              src={
                                (v.product_imgs && v.product_imgs[0]) ||
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
                          <Button
                            color="info"
                            onClick={this.toggle.bind(this, v)}
                          >
                            {"View more"}
                          </Button>
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
                                to={"/vendor/create-product"}
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
                          </Nav>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </tbody>
                </Table>
                <CardFooter style={{ margin: "auto" }} className="py-5  ">
                  {this.state.isLoadMore ? (
                    <div>
                      <Button onClick={this.nextData.bind(this)} color="link">
                        Load more
                      </Button>
                    </div>
                  ) : null}
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
