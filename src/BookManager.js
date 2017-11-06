import React, { Component } from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

// Handles displaying the 3 shelves.
class BookManager extends Component {
    constructor() {
        super();
        this.READ = "read";
        this.CURRENTLY_READING = "currentlyReading";
        this.WANT_TO_READ = "wantToRead";
    }

    render() {
        // Filter out current books and create book view li
        let currentBooks = this.props.books.filter(book => book.shelf === this.CURRENTLY_READING);
        currentBooks = this.props.createBooks(currentBooks);

        // Filter out read books and create book view li
        let readBooks = this.props.books.filter(book => book.shelf === this.READ);
        readBooks = this.props.createBooks(readBooks);

        // Filter out interested books and create book view li
        let interestedBooks = this.props.books.filter(book => book.shelf === this.WANT_TO_READ);
        interestedBooks = this.props.createBooks(interestedBooks);

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <Shelf title="Currently Reading" books={currentBooks} />
                    <Shelf title="Want to Read" books={interestedBooks} />
                    <Shelf title="Read" books={readBooks} />
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default BookManager;
