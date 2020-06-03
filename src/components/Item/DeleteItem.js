import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class DeleteItem extends Component {
    constructor(props) {
        super(props);
        this.state = { types: [], itemTypeName: "", itemName: "", requiredLevel: "", durability: "", modal: false };
    }
    itemTypeData = async () => {
        const response = await fetch('http://localhost:8081/typesOfItems');
        const data = await response.json();
        this.setState({ types: data });
    }

    componentDidMount() {
        this.itemTypeData();
    }

    onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:8081/items/" + this.props.id, {
                method: "DELETE"
            });
            const response = await fetch('http://localhost:8081/items');
            let data = await response.json();
            this.props.updateData(data);
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
                <Button color="ligth" onClick={this.toggle} className="p-0"><img width="50px" alt="Add" src="../trash-can.png" /></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="btn" centered>
                    <ModalHeader toggle={this.toggle}>Delete item</ModalHeader>
                    <ModalBody>
                        <form action="" className="" onSubmit={this.onSubmitForm}>
                            <h1 className="text-center">Are you sure?</h1>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toggle}>No</Button>{' '}
                                <Button color="danger" onClick={e => this.onSubmitForm(e)}>Yes</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </Modal>
            </div >
        )
    }



};

export default DeleteItem;