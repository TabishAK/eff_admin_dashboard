import React from "react";

// reactstrap components
import {
    Table,
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import "../index.css"
// import CategoryDetail from "./CategoryDetails"


class OrderModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: true
        }
    }

    toggle = () => this.setState({ modal: !this.state.modal });
    render() {
        const { orderDetail } = this.props
        const { company_info, orders_info, user_info, status, _id } = orderDetail;
        console.log(company_info, orders_info, user_info, status, _id)
        return (
            <>
                <Container fluid>
                    <Row>
                        <div className="col">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <h2>Order Detail</h2>
                                        </Col>
                                        <Col style={{ textAlign: "right" }} >
                                            <h5>Order Id: DX-1001</h5>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col md={6} >
                                            <CardTitle>Customer Info</CardTitle>
                                            <Row>
                                                <Col md={4} ><h4>Customer Name</h4></Col>
                                                <Col md={8}>{user_info.customerName}</Col>
                                            </Row>
                                            <Row>
                                                <Col md={4} ><h4>Customer Number</h4></Col>
                                                <Col md={8}>{user_info.phoneNumber}</Col>
                                            </Row>
                                            <Row>
                                                <Col md={4} ><h4>Address</h4></Col>
                                                <Col md={8}>{user_info.address}</Col>
                                            </Row>
                                            <Row>
                                                <Col md={4} ><h4>City</h4></Col>
                                                <Col md={8}>{user_info.city}</Col>
                                            </Row>
                                            <Row>
                                                <Col md={4} ><h4>Payment Method</h4></Col>
                                                <Col md={8}>{user_info.paymentType}</Col>
                                            </Row>
                                        </Col>
                                        <Col md={6} >
                                            <CardTitle >Salesmane Info</CardTitle>
                                            {/* <Row>
                                                <Col md={4} ><h4>Salesmane Id</h4></Col>
                                                <Col md={8}>{"==> N <=="}</Col>
                                            </Row> */}
                                            <Row>
                                                <Col md={4} ><h4>Salesmane Name</h4></Col>
                                                <Col md={8}>{company_info.username}</Col>
                                            </Row>
                                            <Row>
                                                <Col md={4} ><h4>Salesmane Number</h4></Col>
                                                <Col md={8}>{company_info.phone_number}</Col>
                                            </Row>
                                            <Row>
                                                <Col md={4} ><h4>Company Name</h4></Col>
                                                <Col md={8}>{company_info.companyDetails.companyName}</Col>
                                            </Row>
                                            <Row>
                                                <Col md={4} ><h4>Invoice Type</h4></Col>
                                                <Col md={8}>{ user_info.invoicetype}</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <br />
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th scope="col">Product Code</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Color</th>
                                        <th scope="col">quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders_info.map((order, inde) => {
                                        return (
                                            <tr inde={inde} >
                                                <td>{order.productCode}</td>
                                                <td>{order.productName}</td>
                                                <td>{order.size}</td>
                                                <td>{order.productcolor}</td>
                                                <td>{order.quantity}</td>
                                                <td>{order.price}</td>
                                                <td>{order.total}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>

                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

export default OrderModal;
