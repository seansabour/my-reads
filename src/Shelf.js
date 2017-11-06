import React from "react";
import PropTypes from "prop-types"

// Stateless Shelf Component that displays all books and the title of shelf.
function Shelf(props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">{props.books}</ol>
            </div>
        </div>
    );
}
Shelf.propTypes = {
    title: PropTypes.string,
    books: PropTypes.arrayOf(PropTypes.object)
}

export default Shelf;
