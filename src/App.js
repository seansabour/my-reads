import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import Search from "./Search";
import BookManager from "./BookManager";
import Book from "./Book";
import "./App.css";

class BooksApp extends React.Component {
    // Set initial state.
    state = {
        books: [],
        query: "",
        searchBooks: []
    };

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
            BooksAPI.search(e.target.value, 20).then(res => {
                if(res.error) return;
                const books = res.map(searchBook => {
                    this.state.books.map(book => {
                        if (searchBook.id === book.id) {
                            searchBook.shelf = book.shelf
                        }
                        return book;
                    })
                    return searchBook;
                })
                this.setState({
                    searchBooks: books,
                })
            }).catch(err => console.error(err));
        }
        this.setState({
            query: e.target.value,
            searchBooks: e.target.value === "" ? [] : this.state.searchBooks
        });

    };

    // Handles changing the bookshelves by checking if a shelf exists (current book)
    // If no book shelf exists, then update the shelf and update state. If book shelf
    // exists then iterate through the current book state and update the shelf.
    handleChange = (updateBook, value) => {
        let newState;
        if (updateBook.shelf) {
            newState = this.state.books.map(book => {
                if (book.id === updateBook.id) {
                    updateBook.shelf = value;
                }
                return book;
            });
        } else {
            updateBook.shelf = value;

            newState = [...this.state.books, updateBook];
        }
        BooksAPI
            .update(updateBook, value)
            .catch(e =>
                console.error(`Error occured while updating book's shelf.`)
            );
        this.setState({
            books: newState
        });
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
            </div>
        );
    }
}

export default BooksApp;
