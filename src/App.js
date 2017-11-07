import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Switch } from "react-router-dom";
import Search from "./Search";
import NoMatch from "./NoMatch";
import BookManager from "./BookManager";
import Book from "./Book";
import "./App.css";
import { debounce } from 'lodash';

class BooksApp extends React.Component {
    constructor() {
        super();
        this.state = {
            books: [],
            query: "",
            searchBooks: []
        }
        // Debounce the search API so we don't bombard the backend with every keystroke.
        this.handleSearchAPI = debounce(this.handleSearchAPI, 400);
    }


    // Grabs all books that are on the ["wantToRead", "read", "currentlyReading"] shelf.
    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                this.setState({
                    books
                });
            })
            .catch(err =>
                console.error(
                    "An error occured retrieving the books from the backend."
                )
            );
    }

    // Handle search to see if value is not empty then query API
    // If no error, loop over all searched books and the current books on the shelf
    // to check if that book exists, if it does it updates the shelf and sets the
    // state of searchBooks. If empty value it resets searchBooks and query.
    handleSearch = e => {
        if (e.target.value !== "") {
            this.handleSearchAPI(e.target.value);
        }
        this.setState({
            query: e.target.value,
            searchBooks: e.target.value === "" ? [] : this.state.searchBooks
        });

    };

    handleSearchAPI = (value) => {
        BooksAPI.search(value, 20).then(res => {
            if(res.error) {
                console.log(`Error occured: ${res.error} and ${value}`)
                this.setState({ searchBooks: [] });
                return;
            }
            const books = res.map(searchBook => {
                this.state.books.map(book => {
                    if (searchBook.id === book.id) {
                        searchBook.shelf = book.shelf
                    }
                    return book;
                })
                return searchBook;
            });

            this.setState({
                searchBooks: books,
            });

        }).catch(err => console.error(err));
    }

    // Handles changing the bookshelves by checking if a shelf exists (current book)
    // If no book shelf exists, then update the shelf and update state. If book shelf
    // exists then iterate through the current book state and update the shelf.
    handleChange = (book, shelf) => {
        let newState;
        // check to see if the book already has a shelf, if it does
        // Then iterate through the books and update the book's shelf
        if (book.shelf) {
            newState = this.state.books.map(b => {
                if (b.id === book.id) {
                    b.shelf = shelf;
                }
                return b;
            });
        } else {
            // If it does not have a shelf then set the shelf and concat it with
            // the books on the shelves.
            book.shelf = shelf;
            newState = [...this.state.books, book];
        }

        // Update the book to persist through refresh.
        BooksAPI
            .update(book, shelf)
            .then(() => {
                this.setState({
                    books: newState
                });
            })
            .catch(e =>
                console.error(`Error occured while updating book's shelf.`)
            );
    };

    // Creates a list items of books.
    createBooks = books => {
        return books.map(book => (
            <li key={book.id}>
                <Book
                    book={book}
                    handleShelfChange={this.handleChange}
                />
            </li>
        ));
    };

    // Render BookManager or Search depending on route.
    render() {
        return (
            <div className="app">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <BookManager
                                books={this.state.books}
                                createBooks={this.createBooks}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/search"
                        render={() => (
                            <Search
                                books={this.state.searchBooks}
                                query={this.state.query}
                                createBooks={this.createBooks}
                                handleSearch={this.handleSearch}
                            />
                        )}
                    />
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        );
    }
}

export default BooksApp;
