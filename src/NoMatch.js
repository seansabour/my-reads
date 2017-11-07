import React from "react";
import { Link } from "react-router-dom";

// Stateless NoMatch Component that handles routes that do not match any components.
function NoMatch(props) {
        return (
            <div style={{textAlign: "center" }}>
                <div >
                    <Link to="/" className="close-search">
                        Go Back
                    </Link>

                </div>
                <h1>Oops! 404 Page Not Found!</h1>
                <h3>It seems that you stumbled across a page that does not exist</h3>
            </div>
        );
}

export default NoMatch;
