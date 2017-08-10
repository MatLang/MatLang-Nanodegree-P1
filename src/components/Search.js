import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

export default class SearchBook extends Component {
    constructor(args) {
        super(args);
        this.state = {
            searchResults: []
        }
    }

    search = (e) => {
        const query = e.target.value;
        if (!query) {
            this.setState({searchResults: []});
            return;
        }
        BooksAPI.search(query, 20).then(searchResults => {
            if (searchResults.error) {
                searchResults = [];
            }
            console.log(searchResults);
            searchResults = searchResults.map((book) => {
                const bookInShelf = this.props.books.find(b => b.id === book.id);
                if (bookInShelf) {
                    book.shelf = bookInShelf.shelf;
                }
                if (!bookInShelf){
                  book.shelf = "none";
                }
                return book;
            });
            function trim(arr, key) {
              let values = {}
              return arr.filter(function(item) {
                let val = item[key]
                let exists = values[val]
                values[val] = true
                return !exists
                })
              }
            this.setState({searchResults: trim(searchResults,'id')});
        });
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.search}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResults && this.state.searchResults.map(book => (
                            <li key={book.id}>
                                <Book book={book} onShelfChange={this.props.onShelfChange}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}
