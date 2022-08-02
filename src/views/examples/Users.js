import React, { useState } from "react";
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
  FormGroup, Input,
  Modal, ModalBody,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import "../index.css"
import UserDetail from "./Users-details"
import { get, post } from "../../request/request"



let _this;
let a = [1, 2, 3, 4, 5, 6, 7]
class Tables extends React.Component {
  constructor(props) {
    super(props)
    _this = this;
    this.state = {
      modal: false,
      usersList: [],
      userData: {},
      banckDetail: {},
      searchVal: ""
    }
  }


  componentDidMount() {
    this.fetchData()
  }

  toggle = (v) => {
    get("banck-details/get?_id=" + v._id)
      .then(({ data }) => {
        console.log(data.data)
        if (data.data && data.data[0]) {
          this.setState({ modal: !this.state.modal, userData: v, banckDetail: data.data[0] })
        } else {
          this.setState({ modal: !this.state.modal, userData: v, banckDetail: {} })
        }
      }).catch(err => {
        console.log(err)
      })
  };

  closeModal() {
    _this.setState({
      modal: false,
      userData: {}
    })
  }

  saveCommision = (e, _id) => {
    console.log(e.target.value, _id)
    post({ commision: e.target.value, _id }, "account/add-commision")
      .then(({ data }) => {

      })
      .catch(err => {
        console.log(err)
      })
  }

  fetchData() {
    get("account/get")
      .then(({ data }) => {
        if (data) {
          this.setState({ usersList: data.users })
        }
      }).catch(err => {
        console.log(err)
      })
  }

  searchHandler(e) {
    this.setState({ searchVal: e.target.value })
    if (e.target.value == "") {
      this.fetchData()
    } else {
      post({ text: e.target.value, }, "account/search")
        .then(({ data }) => {
          if (data) {
            console.log(data)
            this.setState({ usersList: data.users })
          }
        }).catch(err => {
          console.log(err)
        })
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
                {/* <CardHeader className="border-0">
                  <Row>
                    <Col xs="6" style={{
                      display: "flex",
                      alignItems: "center",
                    }}>
                      <h3 className="mb-0">Users</h3>
                    </Col>
                  </Row>
                </CardHeader> */}
                <CardHeader className="border-0">
                  <Row>
                    <Col xs="6" style={{ display: "flex", alignItems: "center" }}>
                      <h3 className="mb-0">Users List</h3>
                    </Col>
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
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light" style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Commision</th>
                      <th scope="col">More </th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {this.state.usersList.map((v, x) => (
                      <tr key={x} >
                        <td>
                          <a
                            // className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}>
                            <img
                              alt="..."
                              style={{ height: 50, width: 50, borderRadius: 100 }}
                              src={v.companyDetails ? v.companyDetails.logo ? v.companyDetails.logo : require("../../assets/logo.png") : require("../../assets/logo.png")}
                            />
                          </a>
                        </td>
                        <th scope="row" >{v.username}</th>
                        <td>{v.email}</td>
                        <td>{v.phone_number}</td>
                        <td>
                          <FormGroup className="mb-3">
                            <Input defaultValue={v.commision}
                              name={"Commision"}
                              id="input-address"
                              onChange={(e) => this.saveCommision(e, v._id)}
                              placeholder="Commision" type="number" />
                          </FormGroup>
                        </td>
                        <th>
                          <Button color="info" onClick={this.toggle.bind(this, v)}>{"View more"}</Button>
                        </th>
                      </tr>
                    ))}
                    <div>
                      <Modal isOpen={this.state.modal} className="modal-container" toggle={this.toggle} >
                        <ModalBody>
                          <UserDetail closeModal={this.closeModal} banckDetail={this.state.banckDetail} userData={this.state.userData || {}} />
                        </ModalBody>
                      </Modal>
                    </div>
                  </tbody>
                </Table>
                <CardFooter className="py-4">
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
              <br />
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
