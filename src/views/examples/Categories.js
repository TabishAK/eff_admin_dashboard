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
import { get, post } from "../../request/request";
import Header from "components/Headers/Header.js";
import CategoryDetail from "./CategoryDetails";
import "../index.css";

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      categoryList: [],
      viewCategoryDetails: {},
      searchVal: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    get("category/get")
      .then(({ data }) => {
        if (data) {
          this.setState({ categoryList: data.categories });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggle = (v) =>
    this.setState({ modal: !this.state.modal, viewCategoryDetails: v });

  deleteCategory(e) {
    post({ _id: e._id }, "category/delete").then(({ data }) => {
      this.setState({
        categoryList: this.state.categoryList.filter((x) => e._id !== x._id),
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

  render() {
    const { categoryList, viewCategoryDetails } = this.state;
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
                            to={"/admin/crete-category"}
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
                      <th scope="col">Image</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">More</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {categoryList.map((v, x) => {
                      console.log(v, "V");
                      return (
                        <tr key={x}>
                          <td>
                            <a
                              className="avatar rounded-circle mr-3"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                style={{ height: 50, width: 50 }}
                                alt="..."
                                src={v.category_image}
                              />
                            </a>
                          </td>
                          <th scope="row">{v.category_name}</th>
                          <td>{v.category_status}</td>
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
                          <CategoryDetail data={viewCategoryDetails} />
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color=""
                            onClick={this.deleteCategory.bind(
                              this,
                              viewCategoryDetails
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
                                to={"/admin/crete-category"}
                                tag={NavLinkRRD}
                                onClick={() => {}}
                                activeClassName="active"
                              >
                                <Button
                                  color="info"
                                  onClick={() => {
                                    this.setState({ modal: false });
                                    localStorage.setItem(
                                      "updateCategory",
                                      JSON.stringify(viewCategoryDetails)
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
                {/* <CardFooter className="py-4">
                  <nav aria-label="...">
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
                  </nav>
                </CardFooter> */}
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
