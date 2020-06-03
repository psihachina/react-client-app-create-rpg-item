import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ItemList } from './components/Item/ItemList';
import { Atributes } from './components/Attributes/Atributes';
import { ItemTypeList } from './components/ItemTypes/ItemTypeList';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/atributes' component={Atributes} />
        <Route path='/item-list' component={ItemList} />
        <Route path='/item-type-list' component={ItemTypeList} />
      </Layout>
    );
  }
}
