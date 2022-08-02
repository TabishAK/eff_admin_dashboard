import React, { Component } from "react";
import {
  Row,
  Modal,
  Col,
  FormGroup,
  Input,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import Button from "reactstrap/lib/Button";
import TextArea from "components/TextArea/TextArea";

export default class SubserviceModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.addSubServiceModal}
        toggle={this.props.toggle}
        className="modal-container"
      >
        <ModalHeader>Add New Sub-Service</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12">
              <FormGroup>
                <h5>Sub Service Name</h5>
                <Input
                  onChange={this.props.handleChange}
                  name="sub_service_name"
                  value={this.props.sub_service_name}
                  id="input-address"
                  placeholder="Service Name"
                  type="text"
                />
              </FormGroup>
            </Col>

            <Col xs="12">
              <FormGroup>
                <h5>Service Description</h5>
                <TextArea
                  onChange={this.props.handleChange}
                  name="sub_service_description"
                  placeholder="Description"
                />
              </FormGroup>

              <Button
                color="info"
                size="md"
                type="button"
                onClick={this.props.onSubServiceSave}
              >
                Save
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );
  }
}
