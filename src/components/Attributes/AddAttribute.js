import React, { Component } from "react";
import { Label, Table, Input } from 'reactstrap';

export class AddAttribute extends Component {
    constructor(props) {
        super(props);
        this.state = { attributeItem: [], attribute: [], hidden: true, hiddenBtn: false, bufAttrName: "", bufAttrValue: "" };
    }
    itemTypeData = async () => {
        const response = await fetch('http://localhost:8081/attributes');
        const data = await response.json();
        this.setState({ attribute: data });
    }

    componentDidMount() {
        this.itemTypeData();
        let buf = this.state.attribute[0];
        this.setState({ bufAttrName: buf });
    }

    toggle = () => {
        const currentState = this.state.hidden;
        this.setState({ hidden: !currentState });
        console.log(this.props.attrs);
        if(this.props.attrs !== undefined)
            this.setState({attributeItem: this.props.attrs});
    };
    render() {
        return (
            <div>
                <div className="row">
                    <Label htmlFor="requiredLevel" sm={4}>Show attribute?</Label>
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
                                <th scope="col-sm">Attribute name</th>
                                <th scope="col-sm">Value</th>
                                <th scope="col-sm"></th>
                            </tr>
                        </thead>
                        {this.state.attributeItem.map(attrItem =>
                            <tbody>
                                <tr key={attrItem.attribute_name}>
                                    <td>{attrItem.attribute_name}</td>
                                    <td>{attrItem.value}</td>
                                    <td>
                                        <button className="btn p-0" hidden={this.state.hiddenBtn} onClick={e => this.onClickBtnDel(e, attrItem)}>
                                            <img width="30px" alt="del" src="../trash-can.png"></img>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        <tbody>
                            <tr>
                                <td>
                                    <Input type="select" className="form-control" value={this.state.bufAttrName} onChange={e =>
                                        this.setState({ bufAttrName: e.target.value })}>
                                        {this.state.attribute.map(attr => <option key={attr.attribute_id}>{attr.attribute_name}</option>)}
                                    </Input>
                                </td>
                                <td>
                                    <Input type="number" className="form-control" value={this.state.bufAttrValue} onChange={e =>
                                        this.setState({ bufAttrValue: e.target.value })}>
                                    </Input>
                                </td>
                                <td>
                                    <button className="btn p-0" hidden={this.state.hiddenBtn} onClick={ e => this.onClickBtnAdd(e)}>
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

    onClickBtnAdd = (e) => {
        e.preventDefault();
        let bufAttrValue = this.state.bufAttrValue;
        let bufAttrName = this.state.bufAttrName;
        let attribute = { attribute_name: bufAttrName, value: bufAttrValue }

        var buf = this.state.attributeItem;

        buf.push(attribute);

        this.setState({attributeItem: buf})        

        this.setState({ bufAttrName: ""});
        this.setState({ bufAttrValue: ""});
        console.log(this.state.attributeItem);
        
        this.props.updateAttr(this.state.attributeItem);
    }
    onClickBtnDel = async(e, attrItem) => {
        e.preventDefault();
        let attributeItem = this.state.attributeItem;
        attributeItem.splice(attributeItem.indexOf(attrItem), 1);
        this.setState({attributeItem: attributeItem})
        this.props.updateAttr(this.state.attributeItem);
    }


};

export default AddAttribute;