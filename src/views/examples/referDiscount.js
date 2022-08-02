import React from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Badge, CustomInput } from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import "../index.css";
import { get, post, _delete } from "../../request/request";


class RefCode extends React.Component {
    constructor() {
        super()
        this.state = {
            discountVal: "",
            showButton: true
        }
    }


    componentDidMount() {
        get("discount/get").then(({ data }) => {
            console.log(data.data[0])
            if (data.data[0]) {
                this.setState({ discountVal: data.data[0].discountVal })
            }
        })
    }

    remove() {
        _delete("discount/delete").then(() => {
            this.setState({ discountVal: "" })
        }).catch(() => {
            alert("Somthing wrong!")
        })
    }

    addDiscount = () => {
        const { discountVal, showButton } = this.state;
        if (discountVal !== "") {
            this.setState({ showButton: false })
            post({ discountVal }, "discount/add")
                .then(({ data }) => {
                    setTimeout(() => {
                        this.setState({ showButton: true })
                    }, 1000)
                }).catch((err) => {
                    setTimeout(() => {
                        this.setState({ showButton: true })
                        alert("Somthing went to wrong!")
                    }, 3000)
                })
        } else {
            alert("Discount value is required!")
        }
    }

    render() {
        const { discountVal, } = this.state;
        return (
            <>
                <UserHeader />
                <Container
                    className="mt--9"
                    fluid>
                    <Row>
                        <Col className="order-xl-1" xl="12"  >
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Add Discount</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody style={{ backgroundColor: "#fff" }} >
                                    <Form>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="12">
                                                    <FormGroup>
                                                        <label className="form-control-label" htmlFor="input-address" >Product Name</label>
                                                        <Input
                                                            onChange={(e) => { this.setState({ discountVal: e.target.value }) }}
                                                            name={"discountVal"}
                                                            value={discountVal}
                                                            id="input-address"
                                                            placeholder="Add Discount"
                                                            type="number"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                {this.state.showButton ?

                                                    < Col lg="12">
                                                        <Button onClick={() => this.addDiscount()} color="info" style={{ width: "100%" }} >Save</Button>

                                                    </Col>
                                                    : null}
                                                <br />
                                                <br />
                                                <br />
                                                < Col lg="12">
                                                    <Button onClick={() => this.remove()} color="red" style={{ width: "100%" }} >Delete</Button>

                                                </Col>                                            </Row>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </>
        );
    }
}

export default RefCode;
