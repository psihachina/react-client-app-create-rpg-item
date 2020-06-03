import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';




export class ListAttributes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attrs: [],
            loading: true
        };
    }

    componentDidMount() {
        this.attrsData();
    }

    toggle = () => {
        let current = this.state.popoverOpen;
        this.setState({ popoverOpen: !current })
    }

    renderAttrsTable(attrs) {
        console.log(attrs);

        if (attrs.length == 0)
            return (<h6>This item has no attributes</h6>)
        else
            return (
                <ListGroup flush>
                    {attrs.map(attr =>
                        <ListGroupItem className="justify-content-between"><h6 className="m-0">{attr.attribute_name} <Badge>{attr.value}</Badge></h6></ListGroupItem>
                    )}
                </ListGroup>
            );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...{this.state.attrs}</em></p>
            : this.renderAttrsTable(this.state.attrs);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async attrsData() {
        const response = await fetch('http://localhost:8081/itemAttribute/' + this.props.id);
        const data = await response.json();
        this.setState({ attrs: data, loading: false });
    }
}
export default ListAttributes;
