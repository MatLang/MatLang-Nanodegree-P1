import React, { Component } from 'react'
import Bookshelf from './Bookshelf'

export default class BookshelfTable extends Component {
  render () {
    return (
      <div>
        <Bookshelf title="Currently Reading" books={this.props.currentlyReading} onShelfChange={this.props.onShelfChange}/>
        <Bookshelf title="Want To Read" books={this.props.wantToRead} onShelfChange={this.props.onShelfChange}/>
        <Bookshelf title="Read" books={this.props.read} onShelfChange={this.props.onShelfChange}/>
      </div>
    )
  }
}
