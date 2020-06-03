import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';




export class ListCraft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crts: [],
            loading: true
        };
    }

    componentDidMount() {
        this.crtsData();
    }

    toggle = () => {
        let current = this.state.popoverOpen;
        this.setState({ popoverOpen: !current })
    }

    renderCrtsTable(crafts) {
        if (crafts.length == 0)
            return (<h6>This item is not craftable</h6>)
        else
            return (
                <ListGroup  flush>
                    {crafts.map(craft =>
                        <ListGroupItem className="justify-content-between p-1"><h6 className="m-0">{craft.item_craft_name}</h6></ListGroupItem>
                    )}
                </ListGroup>
            );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...{this.state.crts}</em></p>
            : this.renderCrtsTable(this.state.crts);
        return (
            <div>
                {contents}
            </div>
        );
    }

    async crtsData() {
        const response = await fetch('http://localhost:8081/itemCraft/' + this.props.id);
        const data = await response.json();
        this.setState({ crts: data, loading: false });
    }
}
export default ListCraft;
