import React from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  Col,
  Input,
} from "reactstrap";
import { get, post, _delete } from "../../../request/request";
import Header from "components/Headers/Header.js";
import "../../index.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import TextArea from "components/TextArea/TextArea";
import CardBody from "reactstrap/lib/CardBody";
import { fontSize } from "@mui/system";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      about_data: null,
      para1: null,
      para2: null,
      para3: null,
      para4: null,
      editPara1: false,
      editPara2: false,
      editPara3: false,
      editPara4: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    get("aboutUs/")
      .then(({ data }) => {
        if (data) {
          this.setState({ about_data: data });
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  savePara1 = async () => {
    this.setState({
      editPara1: false,
    });
    try {
      await post({ para1: this.state.para1 }, "aboutUs/add-para-1");
    } catch (e) {
      console.log(e);
    }
  };

  savePara2 = async () => {
    this.setState({
      editPara2: false,
    });

    try {
      await post({ para2: this.state.para2 }, "aboutUs/add-para-2");
    } catch (e) {
      console.log(e);
    }
  };

  savePara3 = async () => {
    this.setState({
      editPara3: false,
    });
    try {
      await post({ para3: this.state.para3 }, "aboutUs/add-para-3");
    } catch (e) {
      console.log(e);
    }
  };

  savePara4 = async () => {
    this.setState({
      editPara4: false,
    });

    try {
      await post({ para4: this.state.para4 }, "aboutUs/add-para-4");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <Header />
        <Container className="mt--9" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h1>About Page Content</h1>
                  </div>
                  <Box sx={{ width: "100%" }} className="mt-4">
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
                  </Box>
                </CardHeader>

                <CardBody>
                  <Row>
                    <Col xs={12}>
                      <h2 style={{ color: "#1672ef" }} className="mb-4">
                        Paragraph 1
                      </h2>
                      <TextArea
                        name="para1"
                        style={{ height: "12rem", fontSize: 14 }}
                        value={this.state.about_data?.para1}
                        disabled={!this.state.editPara1}
                        onChange={this.handleChange}
                      />

                      {this.state.editPara1 ? (
                        <Button
                          color="primary"
                          size="md"
                          type="button"
                          className="mt-3 mb-5"
                          onClick={this.savePara1}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="info"
                          size="md"
                          type="button"
                          className="mt-3 mb-5"
                          onClick={() =>
                            this.setState({
                              editPara1: true,
                            })
                          }
                        >
                          Edit
                        </Button>
                      )}

                      <h2 style={{ color: "#1672ef" }} className="mb-4">
                        Paragraph 2
                      </h2>
                      <TextArea
                        name="para2"
                        style={{ height: "10rem", fontSize: 14 }}
                        value={this.state.about_data?.para2}
                        disabled={!this.state.editPara2}
                        onChange={this.handleChange}
                      />

                      {this.state.editPara2 ? (
                        <Button
                          color="primary"
                          size="md"
                          type="button"
                          className="mt-3 mb-5"
                          onClick={this.savePara2}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="info"
                          size="md"
                          type="button"
                          className="mt-3 mb-5"
                          onClick={() =>
                            this.setState({
                              editPara2: true,
                            })
                          }
                        >
                          Edit
                        </Button>
                      )}

                      <h2 style={{ color: "#1672ef" }} className="mb-4">
                        Paragraph 3
                      </h2>
                      <TextArea
                        name="para3"
                        style={{ height: "6rem", fontSize: 14 }}
                        value={this.state.about_data?.para3}
                        disabled={!this.state.editPara3}
                        onChange={this.handleChange}
                      />

                      {this.state.editPara3 ? (
                        <Button
                          color="primary"
                          size="md"
                          type="button"
                          className="mt-3 mb-5"
                          onClick={this.savePara3}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="info"
                          size="md"
                          type="button"
                          className="mt-3 mb-5"
                          onClick={() =>
                            this.setState({
                              editPara3: true,
                            })
                          }
                        >
                          Edit
                        </Button>
                      )}

                      <h2 style={{ color: "#1672ef" }} className="mb-4">
                        Paragraph 4
                      </h2>
                      <TextArea
                        name="para4"
                        style={{ height: "10rem", fontSize: 14 }}
                        value={this.state.about_data?.para4}
                        disabled={!this.state.editPara4}
                        onChange={this.handleChange}
                      />

                      {this.state.editPara4 ? (
                        <Button
                          color="primary"
                          size="md"
                          type="button"
                          className="mt-3 mb-5"
                          onClick={this.savePara4}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="info"
                          size="md"
                          type="button"
                          className="mt-3 mb-5"
                          onClick={() =>
                            this.setState({
                              editPara4: true,
                            })
                          }
                        >
                          Edit
                        </Button>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <br />
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default About;
