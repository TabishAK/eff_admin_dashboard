import React from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  Col,
  Table,
} from "reactstrap";
import { get, post, _delete } from "../../../request/request";
import Header from "components/Headers/Header.js";
import "../../index.css";
import Box from "@mui/material/Box";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextArea from "components/TextArea/TextArea";
import CardBody from "reactstrap/lib/CardBody";
import AddJobModal from "./addJobModal";
import { AiFillDelete } from "react-icons/ai";
import AddBenefitModal from "./addBenefitModal";

class Careers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      careers_data: null,

      mainPara: null,
      editMainPara: false,

      addJobModal: false,
      addBenefitModal: false,

      benefit_details: "",
      benefit_name: "",

      job_name: "",
      designation_name: "",
      area: "",
      country: "",
      job_type: "",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fetchData() {
    get("careers/")
      .then(({ data }) => {
        if (data) {
          this.setState({ careers_data: data });
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggle = () =>
    this.setState({
      addJobModal: !this.state.addJobModal,
    });

  toggle2 = () =>
    this.setState({
      addBenefitModal: !this.state.addBenefitModal,
    });

  onJobSave = async () => {
    this.setState({ addJobModal: false });
    const object = {
      job_name: this.state.job_name,
      designation_name: this.state.designation_name,
      area: this.state.area,
      country: this.state.country,
      job_type: this.state.job_type,
    };
    try {
      const result = await post(object, "careers/add_job");
      this.setState({ careers_data: result.data });
    } catch (e) {
      console.log(e);
    }
  };

  deleteJob = async (v) => {
    if (window.confirm("Are you sure want to delete this Job?")) {
      const _id = v._id;
      try {
        const result = await _delete({ _id }, "careers/deleteJob");
        this.setState({ careers_data: result?.data?.data });
      } catch (e) {
        console.log(e);
      }
    }
  };

  deleteBenefit = async (b) => {
    if (window.confirm("Are you sure want to delete this Benefit?")) {
      const _id = b._id;
      try {
        const result = await _delete({ _id }, "careers/deleteBenefits");
        this.setState({ careers_data: result.data });
      } catch (e) {
        console.log(e);
      }
    }
  };

  onBenefitSave = async () => {
    try {
      const result = await post(
        {
          benefit_details: this.state.benefit_details,
          benefit_name: this.state.benefit_name,
        },
        "careers/addBenefits"
      );
      if (result) {
        this.setState({ addBenefitModal: false, careers_data: result.data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <AddJobModal
          addJobModal={this.state.addJobModal}
          job_name={this.state.job_name}
          job_type={this.state.job_type}
          designation_name={this.designation_name}
          area={this.state.area}
          country={this.state.country}
          handleChange={this.handleChange}
          toggle={this.toggle}
          onJobSave={this.onJobSave}
        />

        <AddBenefitModal
          toggle={this.toggle2}
          addBenefitModal={this.state.addBenefitModal}
          handleChange={this.handleChange}
          benefit_name={this.state.benefit_name}
          benefit_details={this.state.benefit_details}
          onBenefitSave={this.onBenefitSave}
        />

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
                  <h2 style={{ color: "#1672ef" }} className="mb-4">
                    Main Paragraph
                  </h2>
                  <Row style={{ textAlign: "right" }}>
                    <Col md={12}>
                      <TextArea
                        name="mainPara"
                        style={{ height: "6rem", fontSize: 14 }}
                        value={this.state.careers_data?.firstPara}
                        disabled={!this.state.editMainPara}
                        onChange={this.handleChange}
                      />

                      {this.state.editMainPara ? (
                        <Button
                          color="primary"
                          size="md"
                          type="button"
                          className="mt-3 mb-5"
                          onClick={this.saveMainPara}
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
                              editMainPara: true,
                            })
                          }
                        >
                          Edit
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <h2 style={{ color: "#1672ef" }} className="mb-4">
                    Sierra Jobs Opening:
                  </h2>

                  <Row style={{ textAlign: "right" }}>
                    <Col>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead
                          className="thead-light"
                          style={{ textAlign: "center" }}
                        >
                          <tr>
                            {/* <th scope="col">ID</th> */}
                            <th scope="col">Job Name</th>
                            <th scope="col">Country</th>
                            <th scope="col">Job Type</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody
                          className="product-names"
                          style={{ textAlign: "center" }}
                        >
                          {this.state.careers_data?.jobs?.map((v, x) => {
                            return (
                              <tr key={x}>
                                {/* <td>{v._id}</td> */}
                                <td scope="row">
                                  {v.job_name}
                                  <br />
                                  {v.designation_name}
                                </td>
                                <td scope="row">
                                  {v.country}
                                  <br />
                                  {v.area}
                                </td>
                                <td scope="row">{v.job_type}</td>
                                <td scope="row">
                                  <AiFillDelete
                                    style={{ cursor: "pointer" }}
                                    onClick={() => this.deleteJob(v)}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>

                      <Button
                        color="info"
                        size="md"
                        type="button"
                        className="mt-3 mb-5"
                        onClick={() => this.setState({ addJobModal: true })}
                      >
                        Add Job
                      </Button>
                    </Col>
                  </Row>

                  <h2 style={{ color: "#1672ef" }} className="mb-4">
                    Sierra Benefits:
                  </h2>

                  <Row className="mt-5" style={{ justifyContent: "right" }}>
                    {this.state.careers_data?.benefits.map((benefits) => (
                      <>
                        <Col lg={2}>
                          <h3>{benefits.benefit_name} </h3>
                        </Col>
                        <Col lg={9}>
                          <p>{benefits.benefit_details}</p>
                        </Col>
                        <Col lg={1}>
                          <AiFillDelete
                            style={{ cursor: "pointer" }}
                            onClick={() => this.deleteBenefit(benefits)}
                          />
                        </Col>
                        <hr style={{ width: "100%" }} />
                      </>
                    ))}
                    <Button
                      color="info"
                      size="md"
                      type="button"
                      onClick={() => this.setState({ addBenefitModal: true })}
                    >
                      Add Benefits
                    </Button>
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

export default Careers;
