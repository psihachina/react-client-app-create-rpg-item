import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Col, FormGroup } from 'reactstrap';

export class ItemTypeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = { itemTypeName: this.props.item.item_type_name, path: this.props.item.image_path, desc: this.props.item.description, modal: false };
    }

    componentDidMount() {
        this.setState({ hidden: true, itemTypeName: this.props.item.item_type_name, path: this.props.item.image_path, desc: this.props.item.description })
    }

    onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("itemTypeName", this.state.itemTypeName);
            formData.append("desc", this.state.desc);
            formData.append("filedata", this.state.path);
            await fetch("http://localhost:8081/itemType/" + this.props.item.item_type_id, {
                method: "PUT",
                body: formData
            });
            const newresponse = await fetch('http://localhost:8081/itemType');
            const data = await newresponse.json();
            this.props.updateData(data)

        } catch (err) {
            console.error(err.message);
        }
    }

    toggle = () => {
        const currentState = this.state.modal;
        this.setState({ modal: !currentState });
    };

    hidden = () => {
        const currentState = this.state.hidden;
        this.setState({ hidden: !currentState });
    };

    render() {
        return (
            <div>
                <Button color="ligth" onClick={this.toggle} className="p-0"><img alt="Add" width="65px" src="../pencil.png" /></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="btn" centered>
                    <ModalHeader toggle={this.toggle}>Adding an item type</ModalHeader>
                    <ModalBody>
                        <form id="formElem" action="" className="" onSubmit={this.onSubmitForm} enctype="multipart/form-data">
                            <FormGroup row className="align-middle">
                                <Label htmlFor="itemTypeName" sm={4}>Item type name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="" id="itemTypeName" className="form-control" value={this.state.itemTypeName} onChange={e =>
                                        this.setState({ itemTypeName: e.target.value })} />
                                </Col>
                            </FormGroup>
                            <FormGroup row className="align-middle">
                                <Label htmlFor="requiredLevel" sm={4}>Description</Label>
                                <Col sm={8}>
                                    <textarea type="text" name="" id="description" className="form-control" value={this.state.desc} onChange={e =>
                                        this.setState({ desc: e.target.value })} />
                                </Col>
                            </FormGroup>
                            <FormGroup row className="align-middle">
                                <Label htmlFor="requiredLevel" sm={4}>Change image?</Label>
                                <div className="col-sm-8 text-left">
                                    <label class="switch nl-auto">
                                        <input type="checkbox" onClick={this.hidden}/>
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </FormGroup>
                            <FormGroup row className="align-middle" hidden={this.state.hidden}>
                                <Label htmlFor="durability" sm={4}>Image</Label>
                                <Col sm={8}>
                                    <Input type="file" multiple name="" id="filedata" className="mt-2" onChange={e =>
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

export default ItemTypeEdit;