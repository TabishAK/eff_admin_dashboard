import React, { useEffect, useState } from "react";
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
  FormGroup,
  Input,
  Modal,
  ModalBody,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import * as actions from "../../store/action/vendorAction";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import FileBase64 from "views/base64";

const BecomeVendor = () => {
  const dispatch = useDispatch();
  const action = bindActionCreators(actions, dispatch);
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    action
      .vendorAction()
      .then((res) => {
        setData(res?.vendors);
      })
      .catch((e) => console.log(e, "this is e"));
  }, []);

  const openModal = () => {
    setOpen(!open);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Header />
      <Container className="mt--9" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col xs="8">
                    <FormGroup>
                      <Input id="Search" placeholder="Search" type="text" />
                    </FormGroup>
                  </Col>
                  <Col xs="4" style={{ textAlign: "right" }}>
                    <Button onClick={() => openModal()} color="info">
                      Add New
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light" style={{ textAlign: "center" }}>
                  <tr>
                    <th scope="col">NO</th>
                    <th scope="col">VENDOR NAME</th>
                    <th scope="col">CONTACT</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">ADDRESS </th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                  {data &&
                    data?.map((item, index) => {
                      console.log(
                        "TCL ~ file: BecomeVendor.js ~ line 67 ~ {data&&data?.map ~ item",
                        item
                      );
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{item?.name}</td>
                          <td>{item?.email}</td>
                          <td>{item?.contact}</td>
                          <td>{item?.address}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <CardFooter className="py-4"></CardFooter>
            </Card>
            <br />
          </div>
        </Row>
        <Modal isOpen={open} style={{}} className="modal-container">
          <ModalBody>
            <Row>
              <Col xs="6">
                <FormGroup style={{}}>
                  <label className="form-control-label" htmlFor="Customer">
                    productCode
                  </label>
                  <Input placeholder="ProductCode" type="text" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup style={{}}>
                  <label className="form-control-label" htmlFor="Order">
                    productName
                  </label>
                  <Input placeholder="ProductName" type="text" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="pay">
                    subCategory
                  </label>
                  <Input placeholder="SubCategory" type="text" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <label className="form-control-label" htmlFor="discretion">
                  sell price
                </label>
                <FormGroup>
                  <Input placeholder="Sell price" type="text" />
                </FormGroup>
                <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                      Thumbnail
                    </label>
                    <FileBase64
                      id="exampleCustomFileBrowser"
                      label="Upload Image"
                    />
                  </FormGroup>
                </Col>
              </Col>
              <Col xs="12">
                <Button
                  onClick={() => openModal()}
                  style={{ width: "100%" }}
                  color={"info"}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
};

export default BecomeVendor;
