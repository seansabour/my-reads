import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"

// Stateless Search Component that handles displaying all the searched books.
function Search(props) {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={props.query}
                            onChange={props.handleSearch}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid" >
                        {props.createBooks(props.books)}
                    </ol>
                </div>
            </div>
        );
}

Search.propTypes = {
    handleSearch: PropTypes.func,
    createBooks: PropTypes.func,
    query: PropTypes.string,
    books: PropTypes.arrayOf(PropTypes.object)
}
export default Search;
