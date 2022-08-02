import Header from "components/Headers/Header";
import React from "react";
import { Col } from "reactstrap";
import Card from "reactstrap/lib/Card";
import CardHeader from "reactstrap/lib/CardHeader";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import Table from "reactstrap/lib/Table";

const ApproveVendor = () => {
  return (
    <div>
      <Header />
      <Container className="mt--9" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h1 className="text-align-center">
                      Vendor product checklist
                    </h1>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="col">S.no</th>
                    <th scope="col">productCode</th>
                    <th scope="col">productName</th>
                    <th scope="col">sub Category</th>
                    <th scope="col">sell price</th>
                    <th className="col-3">More</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  <tr></tr>
                  <div></div>
                </tbody>
              </Table>
            </Card>
            <br />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default ApproveVendor;
