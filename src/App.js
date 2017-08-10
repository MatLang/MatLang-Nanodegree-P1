import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookshelfTable from './components/BookshelfTable'
import Search from './components/Search'

export default class BooksApp extends Component {
  state = {
          books: [],
          showSearchPage: true
  }

  /**
  * @description componentDidMount() is invoked immediately after a component is
    mounted. Initialization that requires DOM nodes should go here. If you need
    to load data from a remote endpoint, this is a good place to instantiate the
    network request. Setting state in this method will trigger a re-rendering.
    As soon as the the component did mount, an API request gets fired in order
    to recieve the books from the database. Hereafter, the state is set based on
    the recieved data.
  * @returns Object which then is used to set the state
  */
    componentDidMount () {
      BooksAPI.getAll().then((books) => {
        this.setState( { books: books, showSearchPage: false })
      })
    }
  /**
  * @description This function gets fired every time a user selects a shelf for
    the respective book, either in the bookshelf or inside the booksearch comp.
    The function first updates book data on the data base server, and then
    changes the state according to the selected shelf and book.
  * @returns an updated version of the bookshelf state
  */
  onShelfChange = (book,shelf) => {
    BooksAPI.update(book,shelf)
      .then((response) => {
        book.shelf = shelf
        this.setState( (state) => (
          { books: state.books.filter(b => b.id !== book.id).concat([ book ]),
            showSearchPage: false}
          )
        )
      })
  };

  render() {

    // In order to display the different shelves, the state data gets filtered
    // for each individual state
    const state = this.state.books
    const wantToRead = state.filter((book) => book.shelf === 'wantToRead')
    const read = state.filter((book) => book.shelf === 'read')
    const currentlyReading = state.filter((book) => book.shelf === 'currentlyReading')

    return (
        <div className="app">
            <Route path="/searchbooks" render={() => (
              <Search
              books={currentlyReading.concat(wantToRead,read)}
              onShelfChange={this.onShelfChange}/>
            )}
            />
            <Route exact path="/" render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <BookshelfTable
                        currentlyReading={currentlyReading}
                        wantToRead={wantToRead}
                        read={read}
                        onShelfChange={this.onShelfChange}
                        />
                    </div>
                    <div className="open-search">
                        <Link to="/searchbooks">
                        </Link>
                    </div>
                </div>
            )}/>
        </div>
      )
    }
  }
