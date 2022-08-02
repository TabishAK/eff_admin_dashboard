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
  CardHeader,
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
import "../../index.css";

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
                    <th scope="col">Category Name</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="row">{data.category_name}</th>
                  </tr>
                </tbody>
              </Table>
              <br />

              {/* </Card> */}
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
