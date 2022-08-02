import React, { useState, useRef } from "react";
import ComponentToPrint from "./PrintScreen";
import { useReactToPrint } from "react-to-print";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  FormGroup,
  Input,
  CardFooter,
} from "reactstrap";
import OrderModal from "./OrderDetails";
import Header from "components/Headers/Header.js";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { get, put, post } from "../../request/request";
import "../index.css";
import classnames from "classnames";

const OrderTable = ({ orderList }) => {
  const [modal, setModal] = useState(false);
  const [orderData, setOrderData] = useState(orderList);

  const toggle = (data) => {
    setModal(false);
  };

  const ViewDetail = (data) => {
    setModal(true);
    setOrderData(data);
  };

  const updateStatus = (_id, orderInfo, status) => {
    put({ _id: _id, status }, "order/update-status")
      .then(({ data }) => {
        if (data) {
          console.log(data);
          if (status == "approved") {
            var key =
              "AAAA3vjTusM:APA91bFqHb_U-GS0jy4mHMzKTBkuS90Mjbal_N8vyt1SZQ_aLjDdyKB54XFdlvZS9lo5K9azgQX0xuTNFXjBGWy8VahnPxUxHdwQbn3BSNoh8riAFqNnf7cYLXgBNmDbq6B3bMT8mBmo";
            fetch("https://fcm.googleapis.com/fcm/send", {
              method: "POST",
              headers: {
                Authorization: "key=" + key,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                registration_ids: [orderInfo.fcm],
                notification: {
                  body:
                    "Your order '" + orderInfo.order_id + "' has been approved",
                  title: "Deltrix Order",
                  content_available: true,
                  priority: "high",
                },
                data: {
                  body: "great match!",
                  title: "Portugal vs. Denmark",
                  content_available: true,
                  priority: "high",
                },
              }),
            })
              .then(function (response) {
                toggle();
              })
              .catch(function (error) {});
          }
        }
      })
      .catch((err) => {
        alert("Something went to wrong!");
        console.log(err);
      });
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light" style={{ textAlign: "center" }}>
        <tr>
          <th scope="col">Orders Id</th>
          <th scope="col">Date</th>
          <th scope="col">Salesmane</th>
          <th scope="col">Customer</th>
          <th scope="col">Total Bill</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody style={{ textAlign: "center" }}>
        {orderList.map((v, x) => (
          <tr key={x}>
            <th>{v.order_id}</th>
            <td scope="row">{new Date(Number(v.date)).toLocaleDateString()}</td>
            <td>{v.company_info.username}</td>
            <td>{v.user_info.customerName}</td>
            <td>{new Date(Number(v.date)).toLocaleDateString()}</td>
            <th>
              <Button color="info" onClick={() => ViewDetail(v)}>
                {"View more"}
              </Button>
            </th>
          </tr>
        ))}
      </tbody>
      <Modal
        style={{ width: "90%" }}
        size={"larg"}
        isOpen={modal}
        className="modal-dialog-order-list"
        toggle={toggle}
      >
        <ModalBody>
          <OrderModal orderDetail={orderData} />
        </ModalBody>
        <ModalFooter>
          <Button color="" onClick={() => toggle()}>
            Close
          </Button>
          {orderData.status == "approved" ? (
            <Button color="red" onClick={() => handlePrint()}>
              Print
            </Button>
          ) : null}
          <Nav style={{ textAlign: "right", justifyContent: "flex-end" }}>
            <NavItem>
              <NavLink to={"#"} tag={NavLinkRRD} activeClassName="active">
                {orderData.status == "panding" ? (
                  <Button
                    color="info"
                    onClick={() =>
                      updateStatus(orderData._id, orderData, "approved")
                    }
                  >
                    Approve
                  </Button>
                ) : orderData.status == "approved" ? (
                  <Button
                    color="info"
                    onClick={() => updateStatus(orderData._id, "delivered")}
                  >
                    Delivered
                  </Button>
                ) : null}
              </NavLink>
            </NavItem>
          </Nav>
        </ModalFooter>
      </Modal>
      <div style={{ display: "none" }}>
        <ComponentToPrint orderData={orderData} ref={componentRef} />
      </div>
    </Table>
  );
};

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      orderList: [],
      activeTab: "1",
      searchVal: "",
      isLoadMore: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    get("order/get?status=panding&skip=0&limit=20")
      .then(({ data }) => {
        if (data) {
          console.log(data.orders, "- -- -");
          this.setState({ orderList: data.orders, isLoadMore: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleTab = (tab, status) => {
    console.log(status);
    this.setState({ activeTab: tab }, () => {
      // if (this.state.activeTab !== tab) {
      get("order/get?status=" + status)
        .then(({ data }) => {
          console.log("----", data);
          this.setState({ orderList: data.orders });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  searchHandler(e) {
    this.setState({ searchVal: e.target.value });
    if (e.target.value == "") {
      this.fetchData();
    } else {
      post({ text: e.target.value }, "order/search")
        .then(({ data }) => {
          if (data) {
            console.log(data, "ppp ppp");
            this.setState({ orderList: data.orders });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  nextData() {
    const orderList = this.state.orderList;
    let skip = orderList.length;
    let limit = orderList.length + 20;
    let url = "order/get?skip=" + skip + "&limit=" + limit;
    get(url)
      .then(({ data }) => {
        if (data && data.products.length > 0) {
          console.log(data);
          this.setState(
            { orderList: orderList.concat(data.products) },
            () => {}
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <>
        <Header />
        <Container className="mt--9" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col
                      xs="12"
                      style={
                        {
                          // display: "flex",
                          // alignItems: "center",
                        }
                      }
                    >
                      {/* <h3 className="mb-0">Orders</h3> */}
                      <Row>
                        <Col xs="12">
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
                    </Col>
                  </Row>
                </CardHeader>
                <Card>
                  <CardBody>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "1" })}
                          onClick={() => {
                            this.toggleTab("1", "panding");
                          }}
                        >
                          Pending
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "2" })}
                          onClick={() => {
                            this.toggleTab("2", "approved");
                          }}
                        >
                          Approved
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: activeTab === "3" })}
                          onClick={() => {
                            this.toggleTab("3", "delivered");
                          }}
                        >
                          Delivered
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <br />
                    <Card>
                      <CardBody>
                        <TabContent activeTab={"1"}>
                          <TabPane tabId="1">
                            <OrderTable orderList={this.state.orderList} />
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </Card>
                  </CardBody>
                  <CardFooter style={{ margin: "auto" }} className="py-2  ">
                    {this.state.isLoadMore ? (
                      <div>
                        <Button onClick={this.nextData.bind(this)} color="link">
                          Load more
                        </Button>
                      </div>
                    ) : null}
                  </CardFooter>
                </Card>
              </Card>
            </div>
          </Row>
          {/* <ComponentToPrint ref={componentRef} /> */}
        </Container>
      </>
    );
  }
}

export default Tables;
