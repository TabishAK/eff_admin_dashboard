import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { get, post, _delete } from "../../../request/request";
import Header from "components/Headers/Header.js";
import BannerDetails from "../../examples/Banners/bannerDetails";
import "../../index.css";

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
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    get("banner/")
      .then(({ data }) => {
        if (data) {
          this.setState({ banners: data[0] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggle = (v) =>
    this.setState({
      modal: !this.state.modal,
      viewCategoryDetails: v,
      imageToSend: null,
      code: v.code,
      image: null,
    });

  deleteCategory(e) {
    _delete(e._id, "subCategories/delete").then(({ data }) => {
      this.setState({
        banners: this.state.banners.filter((x) => e._id !== x._id),
      });
      this.toggle({ subcategories: [] });
    });
  }

  searchHandler(e) {
    this.setState({ searchVal: e.target.value });
    if (e.target.value == "") {
      this.fetchData();
    } else {
      post({ text: e.target.value }, "category/search")
        .then(({ data }) => {
          if (data) {
            this.setState({ banners: data.categories });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png"
      ) {
        this.setState({
          image: URL.createObjectURL(e.target.files[0]),
          imageToSend: e.target.files[0],
          makeChange: true,
        });
      } else if (e.target.files[0].type === "video/mp4") {
        this.setState({
          video: URL.createObjectURL(e.target.files[0]),
          imageToSend: e.target.files[0],
        });
      }
    }
  };

  deleteBanner = () => {
    console.log(this.state.banners);
    if (this.state.code === "img1") {
      _delete({}, "banner/delete_image_1")
        .then((res) => {
          const banners = this.state.banners;
          banners.image_1 = "";
          this.setState({ loader: false, modal: false, banners: banners });
          this.props.history.push("banners");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.state.code === "img2") {
      _delete({}, "banner/delete_image_2")
        .then((res) => {
          const banners = this.state.banners;
          banners.image_2 = "";
          this.setState({ loader: false, modal: false, banners: banners });
          this.props.history.push("banners");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (this.state.code === "img3") {
      _delete({}, "banner/delete_image_3")
        .then((res) => {
          const banners = this.state.banners;
          banners.image_3 = "";
          this.setState({ loader: false, modal: false, banners: banners });
          this.props.history.push("banners");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (this.state.code === "vid") {
      _delete({}, "banner/deleteVideo")
        .then((res) => {
          const banners = this.state.banners;
          banners.video = "";
          this.setState({ loader: false, modal: false, banners: banners });
          this.props.history.push("banners");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  saveChanges = () => {
    if (this.state.imageToSend !== null) {
      let formData = new FormData();

      if (this.state.code === "img1") {
        formData.append("image_1", this.state.imageToSend);
        post(formData, "banner/add_image_1")
          .then((res) => {
            console.log(res);
            this.setState({ loader: false, modal: false, banners: res.data });
            this.props.history.push("banners");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.state.code === "img2") {
        formData.append("image_2", this.state.imageToSend);
        post(formData, "banner/add_image_2")
          .then((res) => {
            console.log(res);
            this.setState({ loader: false, modal: false, banners: res.data });
            this.props.history.push("banners");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (this.state.code === "img3") {
        formData.append("image_3", this.state.imageToSend);
        post(formData, "banner/add_image_3")
          .then((res) => {
            console.log(res);
            this.setState({ loader: false, modal: false, banners: res.data });
            this.props.history.push("banners");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (this.state.code === "vid") {
        formData.append("video", this.state.imageToSend);
        post(formData, "banner/addVideo")
          .then((res) => {
            this.setState({ loader: false, modal: false, banners: res.data });
            this.props.history.push("banners");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  render() {
    const { banners, viewCategoryDetails } = this.state;
    return (
      <>
        <Header />
        <Container className="mt--9" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col xs="6">
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
                    <Col style={{ textAlign: "right" }} xs="6">
                      <Nav
                        style={{
                          textAlign: "right",
                          justifyContent: "flex-end",
                        }}
                      >
                        <NavItem>
                          <NavLink
                            to={"/admin/create-sub-category"}
                            tag={NavLinkRRD}
                            activeClassName="active"
                          >
                            <Button color="info" type="button">
                              Add New
                            </Button>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead
                    className="thead-light"
                    style={{ textAlign: "center" }}
                  >
                    <tr>
                      <th scope="col">Serial No</th>
                      <th scope="col">Item</th>
                      <th scope="col">Option 1</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="row">Banner Image 1</th>
                      <td>
                        <a onClick={(e) => e.preventDefault()}>
                          <img
                            style={{ height: 150, width: 300 }}
                            alt="..."
                            src={banners && banners.image_1}
                          />
                        </a>
                      </td>

                      <th>
                        <Button
                          color="info"
                          onClick={this.toggle.bind(this, {
                            image: banners && banners.image_1,
                            text: "Edit Image 1",
                            code: "img1",
                          })}
                        >
                          {"Edit"}
                        </Button>
                      </th>
                    </tr>

                    <tr>
                      <th scope="row">Banner Image 2</th>
                      <td>
                        <a onClick={(e) => e.preventDefault()}>
                          <img
                            style={{ height: 150, width: 300 }}
                            alt="..."
                            src={banners && banners.image_2}
                          />
                        </a>
                      </td>

                      <th>
                        <Button
                          color="info"
                          onClick={this.toggle.bind(this, {
                            image: banners && banners.image_2,
                            text: "Edit Image 2",
                            code: "img2",
                          })}
                        >
                          {"Edit"}
                        </Button>
                      </th>
                    </tr>

                    <tr>
                      <th scope="row">Banner Image 3</th>
                      <td>
                        <a onClick={(e) => e.preventDefault()}>
                          <img
                            style={{ height: 150, width: 300 }}
                            alt="..."
                            src={banners && banners.image_3}
                          />
                        </a>
                      </td>

                      <th>
                        <Button
                          color="info"
                          onClick={this.toggle.bind(this, {
                            image: banners && banners.image_3,
                            text: "Edit Image 3",
                            code: "img3",
                          })}
                        >
                          {"Edit"}
                        </Button>
                      </th>
                    </tr>

                    <tr>
                      <th scope="row">Front Video</th>
                      <td>
                        <a onClick={(e) => e.preventDefault()}>
                          <video
                            style={{ height: 250, width: 300 }}
                            alt="..."
                            autoPlay
                            muted
                            src={banners && banners.video}
                          />
                        </a>
                      </td>

                      <th>
                        <Button
                          color="info"
                          onClick={this.toggle.bind(this, {
                            video: banners && banners.video,
                            text: "Edit Banner Video",
                            code: "vid",
                          })}
                        >
                          Edit
                        </Button>
                      </th>
                    </tr>

                    <div>
                      <Modal
                        isOpen={this.state.modal}
                        className="modal-container"
                        toggle={this.toggle}
                      >
                        <ModalBody>
                          <BannerDetails
                            data={viewCategoryDetails}
                            image={this.state.image}
                            video={this.state.video}
                            onImageChange={this.onImageChange}
                          />
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color=""
                            onClick={this.deleteBanner.bind(this)}
                          >
                            Delete this banner
                          </Button>

                          <Button
                            color="info"
                            onClick={this.saveChanges.bind(this)}
                          >
                            Save Changes
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </tbody>
                </Table>
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
