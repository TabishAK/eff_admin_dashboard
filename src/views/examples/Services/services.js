import React from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  Modal,
  Col,
  FormGroup,
  Input,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { get, post, _delete } from "../../../request/request";
import Header from "components/Headers/Header.js";
import "../../index.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import SubserviceModal from "./Add-Subservice-Modal";
import AddProcessModal from "./Add-Process-Modal";
import TextArea from "components/TextArea/TextArea";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      banners: null,
      viewCategoryDetails: {},
      searchVal: "",
      image: null,
      imageToSend: null,
      makeChange: false,
      video: null,
      code: null,
      value: 0,
      editorState: "",

      new_service_description: "",
      new_service_name: "",

      addProcessModal: false,
      process_name: "",
      process_description: "",

      service_data: null,
      currentEditSerivce: null,
      addSubServiceModal: false,
      sub_service_name: "",
      sub_service_description: "",
      slug: "",

      slugEditEnable: false,
      enableTextArea: false,
      mainPara: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    get("services/")
      .then(({ data }) => {
        if (data) {
          this.setState({ service_data: data });
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  handleTabs = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ value: newValue });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggle = () =>
    this.setState({
      modal: false,
      addSubServiceModal: false,
      confirmationModal: false,
    });

  toggle2 = () =>
    this.setState({
      modal: !this.state.modal,
    });

  deleteSubService = (mainID, subID) => {
    if (window.confirm("Are you sure want to delete this subcategory?")) {
      _delete({ main_id: mainID, _id: subID }, "services/delete_service")
        .then((res) => {
          const temp = [...this.state.service_data];
          temp.filter((t) => {
            if (t._id === mainID) {
              t.services = t.services.filter((tj) => tj._id !== subID);
            }
          });
          this.setState({ service_data: temp });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  onSubServiceSave = () => {
    const object = {
      _id: this.state.currentEditSerivce._id,
      service: {
        service_name: this.state.sub_service_name,
        service_description: this.state.sub_service_description,
      },
    };

    post(object, "services/add-services")
      .then((res) => {
        const temp = [...this.state.service_data];
        temp.filter((t) => {
          if (t._id === res.data._id) {
            t.services = res.data.services;
          }
        });
        this.setState({ service_data: temp, addSubServiceModal: false });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  onSlugEdit = (sd) => {
    this.setState({ slugEditEnable: true, slug: sd.slug });
  };

  saveSlug = (_id) => {
    this.setState({
      slugEditEnable: !this.state.slugEditEnable,
    });
    post({ _id: _id, slug: this.state.slug }, "services/add-slug")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  onProcessDelete = (mainID, processID) => {
    console.log(mainID);
    console.log(processID);

    if (window.confirm("Are you sure want to delete this Process?")) {
      _delete({ main_id: mainID, _id: processID }, "services/delete_process")
        .then((res) => {
          const temp = [...this.state.service_data];
          temp.filter((t) => {
            if (t._id === mainID) {
              t.process = t.process.filter((tj) => tj._id !== processID);
            }
          });
          this.setState({ service_data: temp });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  onProcessSave = () => {
    const object = {
      _id: this.state.currentEditSerivce?._id,
      process: {
        process_name: this.state.process_name,
        process_description: this.state.process_description,
      },
    };

    console.log(object);

    post(object, "services/add-process")
      .then((res) => {
        const temp = [...this.state.service_data];
        temp.filter((t) => {
          if (t._id === res.data._id) {
            t.process = res.data.process;
          }
        });
        this.setState({ service_data: temp, addProcessModal: false });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  saveMainPara = () => {
    this.setState({
      enableTextArea: false,
    });

    post(
      {
        _id: this.state.currentEditSerivce._id,
        mainParagraph: this.state.mainPara,
      },
      "services/add-main-paragraph"
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  deleteEntireService = (_id) => {
    if (window.confirm("Are you sure want to delete this Entire Service?")) {
      _delete({ _id }, "services/delete_main_service")
        .then(() => window.location.reload())
        .catch((err) => console.log(err.message));
    }
  };

  saveNewService = async () => {
    this.setState({ modal: false });
    post(
      {
        main_service_name: this.state.new_service_name,
        mainParagraph: this.state.new_service_description,
      },
      "services/add-new-service"
    )
      .then((res) => {
        const temp = [...this.state.service_data];
        temp.push(res.data);
        this.setState({ service_data: temp });
      })
      .catch((err) => console.log(err.message));
  };

  render() {
    return (
      <>
        <Header />
        <Container className="mt--9" fluid>
          <SubserviceModal
            addSubServiceModal={this.state.addSubServiceModal}
            sub_service_name={this.state.sub_service_name}
            sub_service_description={this.state.sub_service_description}
            handleChange={this.handleChange}
            toggle={this.toggle}
            onSubServiceSave={this.onSubServiceSave}
          />

          <AddProcessModal
            toggle={this.toggle}
            addProcessModal={this.state.addProcessModal}
            handleChange={this.handleChange}
            process_name={this.state.process_name}
            process_description={this.state.process_description}
            onProcessSave={this.onProcessSave}
          />

          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle2}
            className="modal-container"
          >
            <ModalHeader>Add New Service</ModalHeader>
            <ModalBody>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <h5>Service Name</h5>
                    <Input
                      onChange={this.handleChange}
                      name="new_service_name"
                      value={this.state.service_name}
                      id="input-address"
                      placeholder="Service_Name"
                      type="text"
                    />
                  </FormGroup>
                </Col>

                <Col xs="12">
                  <FormGroup>
                    <h5>Service Description</h5>
                    <TextArea
                      onChange={this.handleChange}
                      name="new_service_description"
                      placeholder="Add New Service Description"
                    />
                  </FormGroup>
                </Col>

                <Button
                  color="info"
                  size="md"
                  type="button"
                  onClick={this.saveNewService}
                >
                  Save
                </Button>
              </Row>
            </ModalBody>
          </Modal>

          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h1>Sierra Textiles Services</h1>
                    <Button
                      color="info"
                      size="md"
                      type="button"
                      onClick={this.toggle2.bind(this)}
                    >
                      Add New Service
                    </Button>
                  </div>
                  <Box sx={{ width: "100%" }} className="mt-4">
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={this.state.value}
                        onChange={this.handleTabs}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                      >
                        {this.state.service_data?.map((sd, index) => (
                          <Tab
                            style={{ maxWidth: "25%", fontSize: 12 }}
                            label={sd.main_service_name}
                            {...this.a11yProps(index)}
                          />
                        ))}
                      </Tabs>

                      {this.state.service_data?.map((sd, idx) => (
                        <this.TabPanel value={this.state.value} index={idx}>
                          <div className="sub-services mt-4">
                            <h2 style={{ color: "#1672ef" }} className="mb-4">
                              Sub Services:
                            </h2>
                            <Row style={{ justifyContent: "right" }}>
                              {sd.services.map((serv) => (
                                <>
                                  <Col lg={2}>
                                    <h3>{serv.service_name} </h3>
                                  </Col>
                                  <Col lg={9}>
                                    <p>{serv.service_description}</p>
                                  </Col>
                                  <Col lg={1}>
                                    <AiTwotoneDelete
                                      onClick={() =>
                                        this.deleteSubService(sd._id, serv._id)
                                      }
                                      style={{ cursor: "pointer" }}
                                    />
                                  </Col>
                                </>
                              ))}
                              <Button
                                color="info"
                                size="md"
                                type="button"
                                onClick={() =>
                                  this.setState({
                                    addSubServiceModal: true,
                                    currentEditSerivce: sd,
                                  })
                                }
                              >
                                Add Sub-Service
                              </Button>
                            </Row>
                          </div>

                          <div
                            className="slug mt-5"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <h2 className="mr-5" style={{ color: "#1672ef" }}>
                              Slug:{" "}
                            </h2>

                            <Input
                              onChange={this.handleChange}
                              disabled={!this.state.slugEditEnable}
                              name="slug"
                              value={this.state.slug || sd.slug}
                              id="input-address"
                              placeholder="Search"
                              style={{ width: "80%" }}
                              className="mr-5"
                              type="text"
                            />

                            {this.state.slugEditEnable ? (
                              <Button
                                onClick={() => this.saveSlug(sd._id)}
                                color="info"
                                size="md"
                                type="button"
                              >
                                Save
                              </Button>
                            ) : (
                              <FiEdit
                                style={{ cursor: "pointer" }}
                                onClick={() => this.onSlugEdit(sd)}
                              />
                            )}
                          </div>

                          <div className="process mt-5">
                            <h2 style={{ color: "#1672ef" }} className="mb-4">
                              Process:
                            </h2>

                            <Row style={{ justifyContent: "right" }}>
                              {sd.process.map((proc) => (
                                <>
                                  <Col lg={2}>
                                    <h3>{proc.process_name} </h3>
                                  </Col>
                                  <Col lg={9}>
                                    <p>{proc.process_description}</p>
                                  </Col>
                                  <Col lg={1}>
                                    <AiTwotoneDelete
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        this.onProcessDelete(sd._id, proc._id)
                                      }
                                    />
                                  </Col>
                                </>
                              ))}
                              <Button
                                color="info"
                                size="md"
                                type="button"
                                onClick={() =>
                                  this.setState({
                                    addProcessModal: true,
                                    currentEditSerivce: sd,
                                  })
                                }
                              >
                                Add Process
                              </Button>
                            </Row>
                          </div>

                          <div>
                            <h2 style={{ color: "#1672ef" }} className="mb-4">
                              Add Main Service Paragraph
                            </h2>
                            <Row style={{ justifyContent: "right" }}>
                              <TextArea
                                style={{ height: "10rem" }}
                                onChange={this.handleChange}
                                disabled={!this.state.enableTextArea}
                                name="mainPara"
                                placeholder="Add Main Service Paragraph"
                                value={sd.mainParagraph}
                              />

                              {this.state.enableTextArea ? (
                                <Button
                                  className="mt-3"
                                  color="info"
                                  size="md"
                                  type="button"
                                  onClick={this.saveMainPara}
                                >
                                  Save
                                </Button>
                              ) : (
                                <Button
                                  className="mt-3"
                                  color="info"
                                  size="md"
                                  type="button"
                                  onClick={() =>
                                    this.setState({
                                      enableTextArea: true,
                                      mainPara: sd.mainParagraph,
                                      currentEditSerivce: sd,
                                    })
                                  }
                                >
                                  Edit
                                </Button>
                              )}
                            </Row>
                          </div>

                          <Row style={{ justifyContent: "center" }}>
                            <Button
                              className="mt-3"
                              color="danger"
                              size="md"
                              type="button"
                              onClick={() => this.deleteEntireService(sd._id)}
                            >
                              Delete Entire Service
                            </Button>
                          </Row>
                        </this.TabPanel>
                      ))}
                    </Box>
                  </Box>
                </CardHeader>
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
