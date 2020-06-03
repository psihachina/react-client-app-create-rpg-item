import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Col, FormGroup } from 'reactstrap';
import { AddAttribute } from '../Attributes/AddAttribute';
import { Craft } from './Craft';

export class ItemAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attr: [],
            crt: [],
            types: [],
            itemTypeName: "",
            itemName: "",
            requiredLevel: "",
            durability: "",
            modal: false
        };
    }
    itemTypeData = async () => {
        const response = await fetch('http://localhost:8081/typesOfItems');
        const data = await response.json();
        this.setState({ types: data });
    }
    updateAttr = (value) => {
        this.setState({ attr: value })
    }
    updateCraft = (value) => {
        this.setState({ crt: value })
    }
    componentDidMount() {
        this.itemTypeData();
    }

    onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            let itemTypeName = this.state.itemTypeName;
            let itemName = this.state.itemName;
            let requiredLevel = this.state.requiredLevel;
            let durability = this.state.durability;
            let attrs = this.state.attr;
            let crafts = this.state.crt;
            const body = { itemTypeName, itemName, requiredLevel, durability, attrs, crafts };
            await fetch("http://localhost:8081/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const response = await fetch('http://localhost:8081/items');
            let data = await response.json();
            this.props.updateData(data);
            this.toggle();
            this.setState({crt: [],att: []});
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
                <Modal size="md" isOpen={this.state.modal} toggle={this.toggle} className="btn" centered>
                    <ModalHeader toggle={this.toggle}>Adding an item</ModalHeader>
                    <ModalBody>
                        <form action="" className="" onSubmit={this.onSubmitForm} novalidate>
                            <FormGroup row className="align-middle">
                                <Label htmlFor="itemTypeName" sm={4}>Item type</Label>
                                <Col sm={8}>
                                    <Input type="select" name="select" id="exampleSelect" value={this.temTypeName} onChange={e =>
                                        this.setState({ itemTypeName: e.target.value })}>
                                        {this.state.types.map(type => <option key={type.item_type_id}>{type.item_type_name}</option>)}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row className="align-middle">
                                <Label htmlFor="itemName" sm={4}>Item name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="" id="ItemName" className="form-control" value={this.itemName} onChange={e =>
                                        this.setState({ itemName: e.target.value })} />
                                </Col>
                            </FormGroup>
                            <FormGroup row className="align-middle">
                                <Label htmlFor="requiredLevel" sm={4}>Required level</Label>
                                <Col sm={8}>
                                    <Input type="number" name="" id="RequiredLevel" className="form-control" value={this.requiredLevel} onChange={e =>
                                        this.setState({ requiredLevel: e.target.value })} />
                                </Col>
                            </FormGroup>
                            <FormGroup row className="align-middle">
                                <Label htmlFor="durability" sm={4}>Durability</Label>
                                <Col sm={8}>
                                    <Input type="number" name="" id="Durability" className="form-control mt-2" value={this.durability} onChange={e =>
                                        this.setState({ durability: e.target.value })} />
                                </Col>
                            </FormGroup>
                            <Craft updateCraft={this.updateCraft} updateAttr={this.updateAttr} />
                            <AddAttribute updateAttr={this.updateAttr} attrs={this.state.attr} />
                            <ModalFooter>
                                <Button color="primary" onClick={e => this.onSubmitForm(e)}>Add</Button>{' '}
                                <Button color="secondary" onClick={this.toggle} >Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </Modal>
            </div >
        )
    }



};

export default ItemAdd;