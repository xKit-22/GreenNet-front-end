import './error-text.scss';

import PropTypes from 'prop-types';

export const ErrorText = (props) => {
    const errorText = props.text;

    return <h4>{errorText}</h4>
}

ErrorText.propTypes = {
    text: PropTypes.string,
}