import React from "react";
import {
  FormGroup,
  CustomInput,
  CardHeader,
  Container,
  Row,
  Col,
} from "reactstrap";
import "../../../views/index.css";
class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      image: null,
      video: null,
      imageToSend: null,
    };
  }

  render() {
    const { data } = this.props;

    return (
      <>
        <Container fluid>
          <Row>
            <div className="col">
              <CardHeader className="border-0">
                <Row>
                  <Col
                    xs="12"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "2rem",
                    }}
                  >
                    <h3 className="mb-0">{data.text}</h3>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <CustomInput
                        id="fileInput"
                        type="file"
                        name="product_broucher_image"
                        onChange={this.props.onImageChange}
                      />
                    </FormGroup>
                  </Col>
                  <Row>
                    <Col md="12">
                      {data.code !== "vid" ? (
                        <img
                          src={
                            this.props.image !== null
                              ? this.props.image
                              : data.image
                          }
                          style={{ width: "100%" }}
                          alt="banner_image"
                        />
                      ) : (
                        <video
                          autoPlay
                          muted
                          style={{ width: "100%" }}
                          src={
                            this.props.video !== null
                              ? this.props.video
                              : data.video
                          }
                          alt="banner_image"
                        />
                      )}
                    </Col>
                  </Row>
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
