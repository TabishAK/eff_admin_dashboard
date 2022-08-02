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

export default class AddBenefitModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.addBenefitModal}
        toggle={this.props.toggle2}
        className="modal-container"
      >
        <ModalHeader>Add New Sub-Service</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12">
              <FormGroup>
                <h5>Benefit Name</h5>
                <Input
                  onChange={this.props.handleChange}
                  name="benefit_name"
                  value={this.props.benefit_name}
                  id="input-address"
                  placeholder="Benefit Name"
                  type="text"
                />
              </FormGroup>
            </Col>

            <Col xs="12">
              <FormGroup>
                <h5>Benefit Description</h5>
                <TextArea
                  onChange={this.props.handleChange}
                  name="benefit_details"
                  placeholder="Benefit Description"
                  value={this.benefit_details}
                />
              </FormGroup>

              <Button
                color="info"
                size="md"
                type="button"
                onClick={this.props.onBenefitSave}
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
