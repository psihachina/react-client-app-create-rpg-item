import React, { Component } from 'react';
import { ButtonGroup } from 'reactstrap'
import ItemTypeAdd from "./ItemTypeAdd";
import ItemTypeDelete from "./ItemTypeDelete";
import ItemTypeEdit from "./ItemTypeEdit"

export class ItemTypeList extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], loading: true };
  }

  componentDidMount() {
    this.itemData();
  }

  updateData = (value) => {
    console.log(value);
    this.setState({ items: value });
  }

  renderItemTable(items) {
    return (
      <div>
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead className="thead-light">
            <tr key="header">
              <th className="align-middle text-center h3">Type name</th>
              <th className="align-middle text-center h3">Description</th>
              <th className="align-middle text-center h3">
                <ItemTypeAdd updateData={this.updateData} />
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map(item =>
              <tr key={item.item_type_id}>
                <td className="align-middle text-center mr-3 h4">{item.item_type_name}<img alt="img" width="65px" src={item.image_path} /></td>
                <td className="align-middle text-center mr-3 h5">{item.description}</td>
                <td className="align-middle text-center">
                  <ButtonGroup>
                    <ItemTypeDelete id={item.item_type_id} updateData={this.updateData} />
                    <ItemTypeEdit updateData={this.updateData} item={item}/>
                  </ButtonGroup>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...{this.state.items}</em></p>
      : this.renderItemTable(this.state.items);

    return (
      <div>
        <h1 id="tabelLabel">List of item types</h1>
        {contents}
      </div>
    );
  }

  async itemData() {
    const response = await fetch('http://localhost:8081/itemType');
    const data = await response.json();
    this.setState({ items: data, loading: false });
  }
}
