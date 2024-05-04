import "./GlobalStyle.scss";

import PropTypes from "prop-types";

function GlobalStyle({ children }) {
    return children;
}

GlobalStyle.propTypes = {
    chidren: PropTypes.element,
};

export default GlobalStyle;
