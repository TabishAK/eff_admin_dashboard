import React, { useState } from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import "../../../views/index.css";
import ProductModal from "./../ProductDetailsModal";

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
                    <h3 className="mb-0">Product Details</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Slug</th>
                    <th scope="col">Subcategory Name</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="row">{data && data.product_name}</th>
                    <th>{data && data.product_slug}</th>
                    <td>
                      {data.subCategory && data.subCategory.subCategory_name}
                    </td>
                  </tr>
                </tbody>
              </Table>

              <CardHeader className="border-0">
                <h3 className="mb-0">Product Description</h3>
                <br />
                <Row>
                  <Col
                    xs="12"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <p>{data && data.product_description}</p>
                  </Col>
                </Row>
              </CardHeader>

              <CardHeader className="border-0">
                <Row style={{ textAlign: "center" }}>
                  <Col
                    xs="6"
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <h3 className="mb-0">Broucher Image</h3>
                    <br />
                    <img
                      style={{ width: 250 }}
                      src={data && data.product_broucher_image}
                      alt=""
                    />
                  </Col>

                  <Col
                    xs="6"
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ width: "100%" }} className="mb-0">
                      Creative Image
                    </h3>
                    <br />
                    <img
                      style={{ width: 300 }}
                      src={data && data.product_creative_image}
                      alt=""
                    />
                  </Col>
                </Row>
              </CardHeader>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
