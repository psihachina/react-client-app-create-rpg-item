import React, { Component } from "react";
import { Label, Table, Input } from 'reactstrap';

export class Craft extends Component {
    constructor(props) {
        super(props);
        this.state = { itemCraft: [], item: [], attrs: [], hidden: true, hiddenBtn: false, bufItemName: "", bufItemId: "" };
    }
    itemData = async () => {
        const response = await fetch('http://localhost:8081/items');
        const data = await response.json();
        this.setState({ item: data });
    }

    componentDidMount() {
        this.itemData();
        let bufArr = [];
        this.props.crt.forEach(element => {
            bufArr.push(element.item_craft_name);
        });
        this.setState({itemCraft: bufArr})
    }

    toggle = () => {
        const currentState = this.state.hidden;
        this.setState({ hidden: !currentState });
    };
    render() {
        return (
            <div>
                <div className="row">
                    <Label htmlFor="requiredLevel" sm={4}>Craft item?</Label>
                    <div className="col-sm-8 text-left">
                        <label className="switch">
                            <input type="checkbox" onClick={this.toggle} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>

                <div hidden={this.state.hidden} className="mt-4">
                    <Table>
                        <thead>
                            <tr key="thead">
                                <th scope="col-sm">Item name</th>
                                <th scope="col-sm"></th>
                            </tr>
                        </thead>
                        {this.state.itemCraft.map(item =>
                            <tbody>
                                <tr key={item}>
                                    <td>{item}</td>
                                    <td>
                                        <button className="btn p-0" hidden={this.state.hiddenBtn} onClick={e => this.onClickBtnDel(e, item)}>
                                            <img width="30px" alt="del" src="../trash-can.png"></img>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        <tbody>
                                    <tr>
                                        <td>
                                            <Input type="select" className="form-control" value={this.state.bufItemName} onChange={e =>
                                                this.setState({ bufItemName: e.target.value })}>
                                                {this.state.item.map(i => <option key={i.item_id}>{i.item_name}</option>)}
                                            </Input>
                                        </td>
                                        <td>
                                            <button className="btn p-0" hidden={this.state.hiddenBtn} onClick={e => this.onClickBtnAdd(e)}>
                                                <img width="30px" alt="add" src="../check-mark.png"></img>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                    </Table>

                </div>
                </div >
        )
    }

    onClickBtnAdd = async (e) => {
                    e.preventDefault();
        let bufItemName = this.state.bufItemName;
        let itemCraft = this.state.itemCraft;
        let id;
        this.state.item.forEach(element => {
                    console.log(element);
            console.log(bufItemName);
            if (element.item_name === bufItemName) {
                    id = element.item_id;

            }
        });
        itemCraft.push(bufItemName);
        this.setState({ itemCraft: itemCraft })
        this.setState({ bufItemName: "" });
        this.props.updateCraft(this.state.itemCraft);
        const response = await fetch('http://localhost:8081/itemAttribute/' + id);
        const data = await response.json();
        console.log(data);

        let bufAttrs = this.state.attrs;
        data.forEach(element => {
                    let fl = false;
            bufAttrs.forEach(elementBuf => {
                if (element.attribute_name === elementBuf.attribute_name) {
                    elementBuf.value = parseInt(elementBuf.value) + parseInt(element.value);
                    fl = true;
                }
            });
            if (!fl) {
                    let attribute = { attribute_name: element.attribute_name, value: element.value };
                bufAttrs.unshift(attribute);
            }
            fl = false;
        });
        this.setState({ attrs: bufAttrs });
        this.props.updateAttr(this.state.attrs);
    }

    onClickBtnDel = async(e, item) => {
        e.preventDefault();
        let itemCraft = this.state.itemCraft;
        itemCraft.splice(itemCraft.indexOf(item), 1);
        this.setState({itemCraft: itemCraft})
        this.props.updateCraft(this.state.itemCraft);
    }
};

export default Craft;