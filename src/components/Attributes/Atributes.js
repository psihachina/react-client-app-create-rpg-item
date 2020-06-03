import React, { Component } from 'react';

export class Atributes extends Component {

  constructor(props) {
    super(props);
    this.state = { attr: [], loading: true };
  }

  componentDidMount() {
    this.atributesData();
    console.log(this.state.attr)
  }

  renderItemTable(attr) {
    return (
      <div>
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead className="thead-light">
            <tr>
              <th className="align-middle text-center">Name</th>
              <th className="align-middle text-center">Description</th>
            </tr>
          </thead>
          <tbody>
            {attr.map(att =>
              <tr key={att.attribute_id}>
                <td className="align-middle text-center">{att.attribute_name}</td>
                <td className="align-middle text-center">{att.description}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    let contents = this.state.loading
    ? <p><em>Loading...{this.state.attr}</em></p>
    : this.renderItemTable(this.state.attr);
    return (
      <div>
        <h1>Attribute list</h1>
        <p>This page is just an attribute reference.</p>
        {contents}
      </div>
    );
  }

  async atributesData() {
    const response = await fetch('http://localhost:8081/attributes');
    const data = await response.json();
    this.setState({ attr: data, loading: false });
  }
}

export default Atributes;