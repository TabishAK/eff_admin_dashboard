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

export default class ProcessModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.addProcessModal}
        toggle={this.props.toggle}
        className="modal-container"
      >
        <ModalHeader>Add New Sub-Service</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12">
              <FormGroup>
                <h5>Process Name</h5>
                <Input
                  onChange={this.props.handleChange}
                  name="process_name"
                  value={this.props.process_name}
                  id="input-address"
                  placeholder="Process Name"
                  type="text"
                />
              </FormGroup>
            </Col>

            <Col xs="12">
              <FormGroup>
                <h5>Process Description</h5>
                <TextArea
                  onChange={this.props.handleChange}
                  name="process_description"
                  placeholder="Process Description"
                  value={this.process_description}
                />
              </FormGroup>

              <Button
                color="info"
                size="md"
                type="button"
                onClick={this.props.onProcessSave}
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
