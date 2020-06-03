import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Col, FormGroup } from 'reactstrap';

export class ItemTypeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { itemTypeName: "", path: "", desc: "", modal: false };
    }

    onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("itemTypeName", this.state.itemTypeName);
            formData.append("desc", this.state.desc);
            formData.append("filedata", this.state.path);
            await fetch("http://localhost:8081/itemType", {
                method: "POST",
                body: formData
            });
            const response = await fetch('http://localhost:8081/itemType');
            const data = await response.json();  
            this.props.updateData(data)
            this.toggle();
        } catch (err) {
            console.error(err.message);
        }
    }

    toggle = () => {
        const currentState = this.state.modal;
        this.setState({ modal: !currentState });
    };
    render() {
        return (
            <div>
                <Button color="ligth" onClick={this.toggle} className="p-0"><img alt="Add" width="65px" src="../anvil-impact.png" /></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="btn" centered>
                    <ModalHeader toggle={this.toggle}>Adding an item type</ModalHeader>
                    <ModalBody>
                        <form id="formElem" action="" className="" onSubmit={this.onSubmitForm} encType="multipart/form-data">
                            <FormGroup row className="align-middle">
                                <Label htmlFor="itemTypeName" sm={4}>Item type name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="" id="itemTypeName" className="form-control" value={this.itemTypeName} onChange={e =>
                                        this.setState({ itemTypeName: e.target.value })} />
                                </Col>
                            </FormGroup>
                            <FormGroup row className="align-middle">
                                <Label htmlFor="requiredLevel" sm={4}>Description</Label>
                                <Col sm={8}>
                                    <textarea type="text" name="" id="description" className="form-control" value={this.desc} onChange={e =>
                                        this.setState({ desc: e.target.value })} />
                                </Col>
                            </FormGroup>
                            <FormGroup row className="align-middle">
                                <Label htmlFor="durability" sm={4}>Image</Label>
                                <Col sm={8}>
                                    <Input type="file" multiple name="" id="filedata" className="mt-2" value={this.path} onChange={e =>
                                        this.setState({ path: e.target.files[0] })} />
                                </Col>
                            </FormGroup>
                            <ModalFooter>
                                <Button color="primary" onClick={e => this.onSubmitForm(e)}>Add</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </Modal>
            </div >
        )
    }



};

export default ItemTypeAdd;