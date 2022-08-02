import React from "react";
import { CardHeader, Table, Container, Row, Col } from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";
import "../../index.css";

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  render() {
    const { data } = this.props;

    return (
      <>
        <Container fluid>
          <Row>
            <div className="col">
              <CardBody>
                <h3>Swatches</h3>
                {data.swatches &&
                  data.swatches.map((s) => (
                    <img
                      src={s.swatch_image}
                      style={{ width: 120, margin: 15 }}
                    />
                  ))}
              </CardBody>
              <br />
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
