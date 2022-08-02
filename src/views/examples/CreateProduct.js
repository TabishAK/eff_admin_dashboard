import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Badge,
  CustomInput,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import "../index.css";
import { get, post, put } from "../../request/request";
import jwt from "jwt-decode";

const token = JSON.parse(localStorage.getItem("currentUser"));
const userInfo = token && jwt(token);

class CreateCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      service: "",
      cutPrice: "",
      salePrice: "",
      size: "",
      color: "",
      product_img: "",
      category: "",
      subcategory: "",
      discription: "",
      status: "Pending",
      sizes: [],
      colors: [],
      product_imgs: [],
      categoryList: [],
      subcategoryList: [],
      _id: "",
      isEditMod: false,
      fileInputState: "",
      productImg: null,
      isLoadMore: false,
      loader: false,
      deliveryCharges: "",
      showInProductList: true,
      sizeAvailable: false,
      coloreAvailable: false,
      cost: "12",
      discount: "12",
      rating: "12",
      userInfo: {},
    };
  }

  componentWillUnmount() {
    localStorage.removeItem("updateProduct");
  }

  componentDidMount() {
    const updateProduct = JSON.parse(localStorage.getItem("updateProduct"));
    get("category/get")
      .then(({ data }) => {
        if (data) {
          this.setState({ categoryList: data.categories });
          if (updateProduct) {
            const {
              category,
              color,
              cut_price,
              discription,
              product_imgs,
              product_name,
              sale_price,
              services,
              size,
              status,
              subCategory,
              _id,
              deliveryCharges,
              showInProductList,
              cost,
            } = updateProduct;

            let Y = data.categories.find((x) => x.category_name == category);
            let Z = Y.subcategories.find(
              (v) => v.subcategory_name == subCategory
            );

            this.setState({
              productName: product_name,
              service: services,
              cutPrice: cut_price,
              salePrice: sale_price,
              category: Y.category_name,
              subcategory: Z.subcategory_name,
              discription: discription,
              subcategoryList: Y.subcategories,
              status: status,
              isEditMod: true,
              product_imgs,
              sizes: size,
              colors: color,
              deliveryCharges: deliveryCharges,
              showInProductList: showInProductList || false,
              cost: cost,
              _id,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editProduct() {
    const {
      productName,
      service,
      cutPrice,
      salePrice,
      category,
      subcategory,
      discription,
      status,
      colors,
      sizes,
      product_imgs,
      _id,
      deliveryCharges,
      showInProductList,
      cost,
    } = this.state;

    const body = {
      product_name: productName,
      services: service,
      cut_price: cutPrice,
      sale_price: salePrice,
      color: colors,
      size: sizes,
      status: status,
      category: category,
      subCategory: subcategory,
      discription: discription,
      product_imgs: product_imgs,
      deliveryCharges,
      showInProductList,
      _id,
      cost,
    };
    console.log("Edit Body", body);

    // if (
    //   productName !== "" &&
    //   salePrice !== "" &&
    //   colors.length >= 1 &&
    //   sizes.length >= 1 &&
    //   status !== "" &&
    //   category !== "" &&
    //   subcategory !== "" &&
    //   discription !== "" &&
    //   product_imgs.length >= 1 &&
    //   deliveryCharges !== ""
    // ) {
    //   this.setState({ loader: true });
    //   put(body, "product/update")
    //     .then(({ data }) => {
    //       if (data.code == 200) {
    //         this.setState({
    //           productName: "",
    //           service: "",
    //           cutPrice: "",
    //           salePrice: "",
    //           size: "",
    //           color: "",
    //           product_img: "",
    //           category: "",
    //           subcategory: "",
    //           discription: "",
    //           status: "",
    //           sizes: [],
    //           colors: [],
    //           product_imgs: [],
    //           isEditMod: false,
    //           loader: false,
    //           deliveryCharges: "",
    //           showInProductList: false,
    //           cost: "",
    //         });
    //         localStorage.removeItem("updateProduct");
    //         this.props.history.push("Products");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   alert("Requier name, image and status in a category!");
    // }
  }

  saveProduct() {
    const {
      productName,
      service,
      cutPrice,
      salePrice,
      category,
      subcategory,
      discription,
      status,
      colors,
      sizes,
      product_imgs,
      deliveryCharges,
      showInProductList,
      cost,
      discount,
      rating,
    } = this.state;

    const c = this.state.categoryList.find((c) => c.category_name === category);

    c.subcategories = this.state.subcategoryList.find(
      (sc) => sc.subcategory_name === subcategory
    );

    const body = {
      product_name: productName,
      services: service,
      cut_price: cutPrice,
      sale_price: salePrice,
      color: colors,
      size: sizes,
      status: status,
      category: c,
      subCategory: subcategory,
      discription: discription,
      product_imgs: product_imgs,
      deliveryCharges,
      showInProductList,
      cost,
      discount,
      rating,
      user: userInfo,
    };

    // console.log("body", body);
    // console.log("CategoryList", this.state.categoryList);
    // console.log("Sub-CategoryList", this.state.subcategoryList);

    if (
      productName !== "" &&
      salePrice !== "" &&
      colors.length >= 1 &&
      sizes.length >= 1 &&
      status !== "" &&
      category !== "" &&
      subcategory !== "" &&
      discription !== "" &&
      product_imgs.length >= 1 &&
      deliveryCharges !== ""
    ) {
      this.setState({ loader: true });
      post(body, "product/add")
        .then(({ data }) => {
          if (data.code == 200) {
            this.setState({
              productName: "",
              service: "",
              cutPrice: "",
              salePrice: "",
              size: "",
              color: "",
              product_img: "",
              category: "",
              subcategory: "",
              discription: "",
              status: "Pending",
              sizes: [],
              colors: [],
              product_imgs: [],
              loader: false,
              deliveryCharges: "",
              cost: "",
            });

            this.props.history.push("Products");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      alert("All feilsd are required");
    }
  }

  changeHandle(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getProductImg(files) {
    this.setState({ product_img: files[0].base64 });
  }

  addColor() {
    const { colors, color, coloreAvailable } = this.state;
    if (color != "") {
      colors.push({ color, coloreAvailable: true });
      this.setState({ colors, color: "" });
    }
  }
  addSize() {
    const { sizes, size, sizeAvailable } = this.state;
    if (size != "") {
      sizes.push({ size, sizeAvailable: true });
      this.setState({ sizes, size: "" });
    }
  }

  addImg() {
    const { product_imgs, productImg } = this.state;
    if (!productImg) return;
    const reader = new FileReader();
    reader.readAsDataURL(productImg);
    reader.onerror = () => console.error("something went wrong!");
    reader.onloadend = async () => {
      if (productImg != "") {
        try {
          await fetch("http://66.70.215.18:8000/images/upload", {
            method: "POST",
            body: JSON.stringify({ data: reader.result }),
            headers: { "Content-Type": "application/json" },
          }).then((res) => {
            res.json().then((res) => {
              product_imgs.push(res.url);
              console.log("Product Image: ", product_imgs);

              this.setState({ product_imgs, productImg: "" });
            });
          });
        } catch (err) {
          console.error(err);
        }
      }
    };
  }

  selectCategory(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        let X = this.state.categoryList.find(
          (x) => x.category_name == this.state.category
        );
        if (X) {
          this.setState({ subcategoryList: X.subcategories, product_img: "" });
        }
      }
    );
  }

  deleColor = (e, i) => {
    e.preventDefault();
    const { colors } = this.state;
    this.setState({ colors: colors.filter((_, ind) => i !== ind) });
  };

  deleSize = (e, i) => {
    e.preventDefault();
    const { sizes } = this.state;
    this.setState({ sizes: sizes.filter((_, ind) => i !== ind) });
  };

  deleImg = (e, i) => {
    e.preventDefault();
    const { product_imgs } = this.state;
    this.setState({ product_imgs: product_imgs.filter((_, ind) => i !== ind) });
  };

  render() {
    // console.log(this.state.userInfo);
    // console.log("Product Image: ", product_imgs);
    const {
      productName,
      service,
      cutPrice,
      salePrice,
      size,
      color,
      categoryList,
      category,
      subcategory,
      discription,
      status,
      colors,
      sizes,
      product_imgs,
      subcategoryList,
      isEditMod,
      fileInputState,
      loader,
      deliveryCharges,
      showInProductList,
      sizeAvailable,
      coloreAvailable,
      cost,
    } = this.state;
    return (
      <>
        <UserHeader />
        <Container className="mt--9" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Create Product</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{ backgroundColor: "#fff" }}>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Product Name
                            </label>
                            <Input
                              onChange={this.changeHandle.bind(this)}
                              name={"productName"}
                              value={productName}
                              id="input-address"
                              placeholder="Product Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Services
                            </label>
                            <Input
                              onChange={this.changeHandle.bind(this)}
                              name={"service"}
                              value={service}
                              id="input-address"
                              placeholder="Services"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Cut Price
                            </label>
                            <Input
                              onChange={this.changeHandle.bind(this)}
                              name={"cutPrice"}
                              value={cutPrice}
                              id="input-address"
                              placeholder="Cut Price"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Sale Price
                            </label>
                            <Input
                              onChange={this.changeHandle.bind(this)}
                              name={"salePrice"}
                              value={salePrice}
                              id="input-address"
                              placeholder="Sale Price"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="Cost"
                            >
                              Cost Price
                            </label>
                            <Input
                              onChange={this.changeHandle.bind(this)}
                              name={"cost"}
                              value={cost}
                              id="Cost"
                              placeholder="Cost"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="Delivery"
                            >
                              Delivery Charges
                            </label>
                            <Input
                              onChange={this.changeHandle.bind(this)}
                              name={"deliveryCharges"}
                              value={deliveryCharges}
                              id="Delivery"
                              placeholder="Delivery Charges"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                        {/* <Col lg="6">
                                                    <FormGroup>
                                                        <label className="form-control-label" htmlFor="Cost" >Cost</label>
                                                        <Input
                                                            onChange={this.changeHandle.bind(this)}
                                                            name={"cost"}
                                                            value={cost}
                                                            id="Cost"
                                                            placeholder="Cost"
                                                            type="number"
                                                        />
                                                    </FormGroup>
                                                </Col> */}
                      </Row>
                      <Row>
                        <Col md={"6"}>
                          <Row>
                            <Col md="12">
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Col lg="10">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Color
                                    </label>
                                    <Input
                                      onChange={this.changeHandle.bind(this)}
                                      name={"color"}
                                      value={color}
                                      id="input-address"
                                      placeholder="Color"
                                      type="text"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="2">
                                  <Button
                                    onClick={this.addColor.bind(this)}
                                    color="info"
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>
                              <Row>
                                <Col md="12">
                                  <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input
                                      className="custom-control-input"
                                      id="color"
                                      type="checkbox"
                                      checked={coloreAvailable}
                                      onChange={(e) => {
                                        this.setState({
                                          coloreAvailable: e.target.checked,
                                        });
                                      }}
                                    />
                                    <label
                                      className="custom-control-label"
                                      style={{
                                        marginLeft: 0,
                                        fontWeight: "bold",
                                        fontSize: 15,
                                      }}
                                      htmlFor="color"
                                    >
                                      <span className="text-muted">
                                        Available
                                      </span>
                                    </label>
                                  </div>
                                </Col>
                              </Row>
                              <hr />
                            </Col>
                            <Col md="12">
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Col lg="10">
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor="input-address"
                                    >
                                      Size
                                    </label>
                                    <Input
                                      onChange={this.changeHandle.bind(this)}
                                      name={"size"}
                                      value={size}
                                      id="input-address"
                                      placeholder="Size"
                                      type="text"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="2">
                                  <Button
                                    onClick={this.addSize.bind(this)}
                                    color="info"
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>
                              <Row>
                                <Col md="12">
                                  <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input
                                      className="custom-control-input"
                                      id="size"
                                      type="checkbox"
                                      checked={sizeAvailable}
                                      onChange={(e) => {
                                        this.setState({
                                          sizeAvailable: e.target.checked,
                                        });
                                      }}
                                    />
                                    <label
                                      className="custom-control-label"
                                      style={{
                                        marginLeft: 0,
                                        fontWeight: "bold",
                                        fontSize: 15,
                                      }}
                                      htmlFor="size"
                                    >
                                      <span className="text-muted">
                                        Available
                                      </span>
                                    </label>
                                  </div>
                                </Col>
                              </Row>
                              <hr />
                            </Col>
                          </Row>
                          <Row
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Col md="10">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Product Image
                                </label>

                                {/* <FileBase64
                                  id="exampleCustomFileBrowser"
                                  name="categoryImg"
                                  label="Select Category Icon"
                                  multiple={true}
                                  onDone={this.getProductImg.bind(this)} /> */}

                                <CustomInput
                                  id="fileInput"
                                  type="file"
                                  name="image"
                                  onChange={(e) =>
                                    this.setState({
                                      productImg: e.target.files[0],
                                      fileInputState: e.target.value,
                                    })
                                  }
                                  value={fileInputState}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="2">
                              <Button
                                onClick={this.addImg.bind(this)}
                                color="info"
                              >
                                Add
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={"6"}>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Subcategory Details
                          </label>
                          <Card
                            style={{
                              minHeight: "250px",
                              maxHeight: "250px",
                              overflowY: "scroll",
                            }}
                          >
                            <CardBody>
                              <Row>
                                <Col md={"12"}>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-address"
                                  >
                                    Colors:{" "}
                                  </label>
                                  <br />
                                  {colors.map((c, i) => (
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <span className="custom-control custom-control-alternative custom-checkbox">
                                        <Input
                                          onChange={(e) => {
                                            const _colors = colors;
                                            if (c.coloreAvailable) {
                                              _colors[
                                                i
                                              ].coloreAvailable = false;
                                            } else {
                                              _colors[i].coloreAvailable = true;
                                            }
                                            this.setState({ colors: colors });
                                          }}
                                          type="checkbox"
                                          checked={c.coloreAvailable}
                                        />
                                      </span>
                                      <Badge
                                        key={i}
                                        href="#"
                                        color="light"
                                        style={{
                                          "text-decoration": c.coloreAvailable
                                            ? "none"
                                            : "line-through",
                                        }}
                                      >
                                        <div>
                                          {c.color}
                                          <span
                                            onClick={(e) =>
                                              this.deleColor(e, i)
                                            }
                                            style={{ marginLeft: 10 }}
                                          >
                                            <img
                                              style={{ height: 8 }}
                                              src={require("../../assets/multiply.png")}
                                            />
                                          </span>
                                        </div>
                                      </Badge>{" "}
                                    </span>
                                  ))}
                                </Col>
                              </Row>
                              <br />
                              <Row>
                                <Col md={"12"} style={{}}>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-address"
                                  >
                                    Size:{" "}
                                  </label>
                                  <br />
                                  {sizes.map((c, i) => (
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <span className="custom-control custom-control-alternative custom-checkbox">
                                        <Input
                                          onChange={(e) => {
                                            const _sizes = sizes;
                                            if (c.sizeAvailable) {
                                              _sizes[i].sizeAvailable = false;
                                            } else {
                                              _sizes[i].sizeAvailable = true;
                                            }
                                            this.setState({ sizes: _sizes });
                                          }}
                                          type="checkbox"
                                          checked={c.sizeAvailable}
                                        />
                                      </span>
                                      <Badge
                                        key={i}
                                        href="#"
                                        color="light"
                                        style={{
                                          "text-decoration": c.sizeAvailable
                                            ? "none"
                                            : "line-through",
                                        }}
                                      >
                                        <div>
                                          {c.size}
                                          <span
                                            onClick={(e) => this.deleSize(e, i)}
                                            style={{ marginLeft: 10 }}
                                          >
                                            <img
                                              style={{ height: 8 }}
                                              src={require("../../assets/multiply.png")}
                                            />
                                          </span>
                                        </div>
                                      </Badge>{" "}
                                    </span>
                                  ))}
                                </Col>
                              </Row>
                              <br />
                              <Row>
                                <Col md={"12"}>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-address"
                                  >
                                    Images:
                                  </label>
                                  <br />
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      flexWrap: "wrap",
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    {product_imgs &&
                                      product_imgs.map((p) => (
                                        <img src={p} alt="" />
                                      ))}
                                  </div>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      {/* <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Status
                            </label>
                            <Input
                              value={status}
                              type="select"
                              name={"status"}
                              id="exampleSelect"
                              onChange={this.changeHandle.bind(this)}
                            >
                              {" "}
                              <option>Active</option>
                              <option>Disabel</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row> */}
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Select Category
                            </label>
                            <Input
                              value={category}
                              type="select"
                              id="exampleSelect"
                              onChange={this.selectCategory.bind(this)}
                              name={"category"}
                            >
                              <option>Select</option>
                              {categoryList.map((v, i) => {
                                return (
                                  <option key={i}>{v.category_name}</option>
                                );
                              })}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Select Subcategory
                            </label>
                            <Input
                              value={subcategory}
                              type="select"
                              id="exampleSelect"
                              onChange={this.changeHandle.bind(this)}
                              name={"subcategory"}
                            >
                              <option>Select</option>
                              {subcategoryList.map((v, i) => {
                                return (
                                  <option key={i}>{v.subcategory_name}</option>
                                );
                              })}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Discription
                            </label>
                            <Input
                              className="form-control"
                              onChange={this.changeHandle.bind(this)}
                              name={"discription"}
                              value={discription}
                              id="input-address"
                              style={{ height: 100 }}
                              placeholder="Discription"
                              type="textarea"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                              className="custom-control-input"
                              id="customCheckLogin"
                              type="checkbox"
                              checked={showInProductList}
                              onChange={(e) => {
                                this.setState({
                                  showInProductList: e.target.checked,
                                });
                              }}
                            />
                            <label
                              className="custom-control-label"
                              style={{
                                marginLeft: 0,
                                fontWeight: "bold",
                                fontSize: 15,
                              }}
                              htmlFor="customCheckLogin"
                            >
                              <span className="text-muted">
                                Show in product list ?
                              </span>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        {loader ? (
                          <Col
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Saveing...
                          </Col>
                        ) : (
                          <Col md="12">
                            {isEditMod ? (
                              <Button
                                onClick={this.editProduct.bind(this)}
                                color="info"
                                style={{ width: "100%" }}
                              >
                                Update
                              </Button>
                            ) : (
                              <Button
                                onClick={this.saveProduct.bind(this)}
                                color="info"
                                style={{ width: "100%" }}
                              >
                                Save
                              </Button>
                            )}
                          </Col>
                        )}
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br />
          <br />
        </Container>
      </>
    );
  }
}

export default CreateCategory;
