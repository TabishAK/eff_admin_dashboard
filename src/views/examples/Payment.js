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
    ListGroup, ListGroupItem
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import "../index.css"
import UserDetail from "./Users-details"
import { get, post } from "../../request/request"
let find = true
let _this;
let a = [1, 2, 3, 4, 5, 6, 7]
class Tables extends React.Component {
    constructor(props) {
        super(props)
        _this = this;
        this.state = {
            modal: false,
            paymentList: [],
            userData: {},
            banckDetail: {},
            searchVal: "",
            customerName: "",
            orderId: "",
            pay: "",
            discretion: "",
            usersList: [],
            orderList: [],
            errorMsg: ""

        }
    }

    componentDidMount() {
        this.fetchData()
    }

    toggle() {
        this.setState({ modal: !this.state.modal })

        // get("banck-details/get?_id=" + v._id)
        //     .then(({ data }) => {
        //         console.log(data.data)
        //         if (data.data && data.data[0]) {
        //             this.setState({ modal: !this.state.modal, userData: v, banckDetail: data.data[0] })
        //         } else {
        //             this.setState({ modal: !this.state.modal, userData: v, banckDetail: {} })
        //         }
        //     }).catch(err => {
        //         console.log(err)
        //     })

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
        get("payment/get")
            .then(({ data }) => {
                console.log(data, "[[[[ ]]]]]")
                if (data) {
                    this.setState({ paymentList: data.data })
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
                        this.setState({ paymentList: data.users })
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    paymentHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }



    addPay() {
        const { customerName, orderId, pay, discretion } = this.state;
        const obj = { customerName, orderId, pay, discretion }
        console.log(obj)
        post(obj, "payment/add")
            .then(({ data }) => {
                console.log(data, "----- ----")
                if (data.code == 200) {
                    this.toggle()
                    window.location.reload()
                    var key = 'AAAA3vjTusM:APA91bFqHb_U-GS0jy4mHMzKTBkuS90Mjbal_N8vyt1SZQ_aLjDdyKB54XFdlvZS9lo5K9azgQX0xuTNFXjBGWy8VahnPxUxHdwQbn3BSNoh8riAFqNnf7cYLXgBNmDbq6B3bMT8mBmo';
                    fetch('https://fcm.googleapis.com/fcm/send', {
                        'method': 'POST',
                        'headers': {
                            'Authorization': 'key=' + key,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                "registration_ids": [data.fcm],
                                "notification": {
                                    "body": discretion,
                                    "title": "Deltrix Payment",
                                    "content_available": true,
                                    "priority": "high"
                                },
                                "data": {
                                    "body": "great match!",
                                    "title": "Portugal vs. Denmark",
                                    "content_available": true,
                                    "priority": "high"
                                }
                            }
                        )
                    }).then(function (response) {
                    }).catch(function (error) {
                    })



                } else {
                    this.setState({ errorMsg: data.message })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    searUser(e) {
        this.setState({ customerName: e.target.value })
        if (e.target.value == "") {
            this.setState({ usersList: [] })
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

    async searOrder(e) {

        this.setState({ orderId: e.target.value })

        // if (e.target.value == "") {
        //     this.setState({ orderList: [] })
        // }
        // else { 
        //     if(find){
        //         find = false
        //         let valu = e.target.value
        //         post({ text:  "ORDER-" + valu, }, "order/search")
        //         .then(({ data }) => {
        //             if (data) {
        //                 console.log(data)
        //                 find = true
        //                 this.setState({ orderList: data.orders })
        //             }
        //         }).catch(err => {
        //             console.log(err)
        //         })
        //     }
        // }
    }




    searchHandler(e) {
        // this.setState({ searchVal: e.target.value })
        // if (e.target.value == "") {
        //     this.fetchData()
        // } else {
        //     post({ text: e.target.value, }, "order/search")
        //         .then(({ data }) => {
        //             if (data) {
        //                 console.log(data, "ppp ppp")
        //                 this.setState({ orderList: data.orders })
        //             }
        //         }).catch(err => {
        //             console.log(err)
        //         })
        // }
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
                                                    value={this.state.searchVal}
                                                    id="Search"
                                                    placeholder="Search"
                                                    type="text" />
                                            </FormGroup>
                                        </Col>

                                        <Col xs="6" style={{ textAlign: "right" }} >
                                            <Button onClick={this.toggle.bind(this)} color="info" >Add Payment</Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light" style={{ textAlign: "center" }}>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Commision</th>
                                            <th scope="col">More </th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ textAlign: "center" }}>
                                        {this.state.paymentList.map((v, x) => (
                                            <tr key={x} >
                                                {/* <td>{v.customerId}</td> */}
                                                <td>{v.customerName}</td>
                                                <td>{v.orderId}</td>
                                                <td>{v.pay}</td>
                                                <td>{v.discretion}</td>
                                                <td>{new Date(Number(v.date)).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                        <div>
                                            <Modal isOpen={this.state.modal} style={{}} className="modal-container" toggle={this.toggle.bind(this)} >
                                                <ModalBody  >
                                                    <Row >
                                                        <Col xs="6">
                                                            <FormGroup style={{}} >
                                                                <label className="form-control-label" htmlFor="Customer" >Customer</label>
                                                                <Input
                                                                    onChange={this.searUser.bind(this)}
                                                                    name="customerName"
                                                                    value={this.state.customerName}
                                                                    id="Customer"
                                                                    placeholder="Customer Name"
                                                                    type="text"
                                                                />
                                                                {this.state.usersList.length ?
                                                                    <div style={{
                                                                        "osition": "absolute",
                                                                        "top": "78px",
                                                                        "z-index": 1,
                                                                        "border-radius": "5px",
                                                                        "background-color": "#fff",
                                                                        "padding": "2px",
                                                                        "box-shadow": "0px 0px 3px 0px grey"
                                                                    }} >
                                                                        <ListGroup flush>
                                                                            {
                                                                                this.state.usersList.map((v, i) => {
                                                                                    return (
                                                                                        <ListGroupItem onClick={() => this.setState({ customerName: v.username, usersList: [] })} key={i} style={{ fontSize: 10, padding: "0.3rem 0.3rem" }} >{v.username}</ListGroupItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ListGroup>
                                                                    </div> : null}


                                                            </FormGroup>
                                                        </Col>
                                                        <Col xs="6">
                                                            <FormGroup style={{}}  >
                                                                <label className="form-control-label" htmlFor="Order" >Order Id</label>
                                                                <Input
                                                                    onChange={this.searOrder.bind(this)}
                                                                    name="orderId"
                                                                    value={this.state.orderId}
                                                                    id="Order"
                                                                    placeholder="Order Id"
                                                                    type="text"
                                                                />
                                                                {/* {this.state.orderList.length ?
                                                                    <div style={{
                                                                        "osition": "absolute",
                                                                        "top": "78px",
                                                                        "z-index": 1,
                                                                        "border-radius": "5px",
                                                                        "background-color": "#fff",
                                                                        "padding": "2px",
                                                                        "box-shadow": "0px 0px 3px 0px grey"
                                                                    }} >
                                                                        <ListGroup flush>
                                                                            {
                                                                                this.state.orderList.map((v, i) => {
                                                                                    return (
                                                                                        <ListGroupItem onClick={() => this.setState({ orderId: v.order_id, orderList: [] })} key={i} style={{ fontSize: 10, padding: "0.3rem 0.3rem" }} >{v.order_id}</ListGroupItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ListGroup>
                                                                    </div> : null} */}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xs="6">
                                                            <FormGroup>
                                                                <label className="form-control-label" htmlFor="pay" >Pay</label>
                                                                <Input
                                                                    onChange={this.paymentHandler.bind(this)}
                                                                    name="pay"
                                                                    value={this.state.pay}
                                                                    id="pay"
                                                                    placeholder="Pay"
                                                                    type="text"
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xs="6">
                                                            <label className="form-control-label" htmlFor="discretion" >Discretion</label>
                                                            <FormGroup>
                                                                <Input
                                                                    onChange={this.paymentHandler.bind(this)}
                                                                    name="discretion"
                                                                    value={this.state.discretion}
                                                                    id="discretion"
                                                                    placeholder="Discretion"
                                                                    type="text"
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col xs="12">
                                                            <Button onClick={this.addPay.bind(this)} style={{ width: "100%" }} color={"info"} >Submit</Button>
                                                        </Col>
                                                    </Row>
                                                    <div style={{ marginTop: 20, color: "red", textAlign: "center" }} >{this.state.errorMsg}</div>
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
