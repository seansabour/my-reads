import React from "react";
import PropTypes from "prop-types"

// Stateless Book Component
function Book(props) {
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${props.book.imageLinks ? props.book.imageLinks.smallThumbnail : "http://via.placeholder.com/128x193?text=No%20Cover"})`
                    }}
                />
                <div className="book-shelf-changer">
                    <select
                        value={props.book.shelf || "moveto"}
                        onChange={e =>
                            props.handleShelfChange(
                                props.book,
                                e.target.value
                            )}
                    >
                        <option value="moveto" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title"><a href={props.book.previewLink} target="_blank" >{props.book.title}</a></div>
            <div className="book-authors">{props.book.authors ? props.book.authors.join(", ") : "Unknown"}</div>
        </div>
    );
}

Book.propTypes = {
    book: PropTypes.object,
    handleShelfChange: PropTypes.func,
}

export default Book;
