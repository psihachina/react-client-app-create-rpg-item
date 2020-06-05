import React, { Component } from 'react';
import { ButtonGroup } from 'reactstrap'
import ItemAdd from "./ItemAdd";
import DeleteItem from "./DeleteItem";
import ItemEdit from "./ItemEdit";
import ListAttribute from "../Attributes/ListAttributes";
import ListCraft from "./ListCtaft";





export class ItemList extends Component {
  static displayName = ItemList.name;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      popoverOpen: false
    };
  }

  componentDidMount() {
    this.itemData();
  }

  updateData = (value) => {
    console.log(value);
    this.setState({ items: value });
  }

  toggle = () => {
    let current = this.state.popoverOpen;
    this.setState({ popoverOpen: !current })
  }

  renderItemTable(items) {
    return (
      <div>
        <table className='table' aria-labelledby="tabelLabel">
          <thead className="thead-light">
            <tr>
              <th className="align-middle text-center h4">Type</th>
              <th className="align-middle text-center h4">Name</th>
              <th className="align-middle text-center h4">Attributes</th>
              <th className="align-middle text-center h4">Craft</th>
              <th className="align-middle text-center h4">Level</th>
              <th className="align-middle text-center h4">Durability</th>
              <th className="align-middle text-center h4">
                <ItemAdd updateData={this.updateData} />
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map(item =>
              <tr key={item.item_id}>
                <td className="align-middle text-center h6">{item.item_type_name}
                  <img type="button" onMouseEnter={this.toggle} onMouseLeave={this.toggle} width="50px" alt="img" src={item.image_path}></img>
                </td>
                <td className="align-middle text-center h6">{item.item_name}</td>
                <td className="align-middle text-center h6 p-1"><ListAttribute id={item.item_id}/></td>
                <td className="align-middle text-center h6 p-1"><ListCraft id={item.item_id}/></td>
                <td className="align-middle text-center h6">{item.required_level}</td>
                <td className="align-middle text-center h6">{item.durability} second</td>
                <td className="align-middle text-center">
                  <ButtonGroup>
                    <DeleteItem id={item.item_id} updateData={this.updateData} />
                    <ItemEdit item={item}/>
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
      <div id="divToPrint">
        <h1 id="tabelLabel">List of items</h1>
        {contents}
      </div>
    );
  }

  async itemData() {
    const response = await fetch('https://rpg-craft-item.azurewebsites.net/api/v1/item');
    const data = await response.json();
    this.setState({ items: data, loading: false });
  }
}
