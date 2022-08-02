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
                    <h3 className="mb-0">Sub Category Detail</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="col">Subcategory Name</th>
                    <th scope="col">PDF</th>
                    <th scope="col">Image</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="row">{data.subCategory_name}</th>
                    <th style={{ cursor: "pointer" }}>Download PDF</th>
                    <td>
                      <a
                        className="avatar rounded-circle mr-3"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <img
                          style={{ height: 50, width: 50 }}
                          alt="..."
                          src={data.subCategory_image}
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <br />
              <CardHeader className="border-0">
                <Row>
                  <Col
                    xs="6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3 className="mb-0">Main Categories</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="col">Main Category Name</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="row">
                      {data.mainCategory && data.mainCategory.category_name}
                    </th>
                  </tr>
                </tbody>
              </Table>
              {/* </Card> */}
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
