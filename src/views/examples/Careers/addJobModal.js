import React, { Component } from "react";
import {
  Row,
  Modal,
  Col,
  FormGroup,
  Input,
  ModalBody,
  ModalHeader,
  Label,
} from "reactstrap";

import Button from "reactstrap/lib/Button";
import TextArea from "components/TextArea/TextArea";

export default class AddJobModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.addJobModal}
        toggle={this.props.toggle}
        className="modal-container"
      >
        <ModalHeader>Add New Sub-Service</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12">
              <FormGroup>
                <h5>Job Name</h5>
                <Input
                  onChange={this.props.handleChange}
                  name="job_name"
                  value={this.props.job_name}
                  id="input-address"
                  placeholder="Job Name"
                  type="text"
                />
              </FormGroup>
            </Col>

            <Col xs="12">
              <FormGroup>
                <h5>Designation Name</h5>
                <Input
                  onChange={this.props.handleChange}
                  name="designation_name"
                  value={this.props.designation_name}
                  id="input-address"
                  placeholder="Designation Name"
                  type="text"
                />
              </FormGroup>
            </Col>

            <Col xs="12">
              <FormGroup>
                <h5>Country</h5>
                <Input
                  onChange={this.props.handleChange}
                  name="country"
                  value={this.props.country}
                  id="input-address"
                  placeholder="Country"
                  type="text"
                />
              </FormGroup>
            </Col>

            <Col xs="12">
              <FormGroup>
                <h5>Area</h5>
                <Input
                  onChange={this.props.handleChange}
                  name="area"
                  value={this.props.area}
                  id="input-address"
                  placeholder="Designation Name"
                  type="text"
                />
              </FormGroup>
            </Col>

            <Col xs="12">
              <h5>Job Type</h5>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="job_type"
                    onChange={this.props.handleChange}
                    value="Full Time"
                  />{" "}
                  Full Time
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="job_type"
                    onChange={this.props.handleChange}
                    value="Part Time"
                  />{" "}
                  Part Time
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="job_type"
                    onChange={this.props.handleChange}
                    value="Remote"
                  />{" "}
                  Part Time
                </Label>
              </FormGroup>

              <Button
                className="mt-5"
                color="info"
                size="md"
                type="button"
                onClick={this.props.onJobSave}
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
