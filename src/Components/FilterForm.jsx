import PropTypes from "prop-types"

export default function FilterForm({buttonClasses, buttonOnClick, buttonText, spanClasses, spanText, divClasses, formOnInput, formClasses, children }) {
    return (
    <>
        <button className={buttonClasses} onClick={buttonOnClick}>{buttonText} <span className={spanClasses}>{spanText}</span></button>
        <div className={divClasses}>
        <form onInput={formOnInput} className={formClasses}>{children}</form>
        </div>
    </>
    )
}

FilterForm.propTypes = {
    buttonClasses: PropTypes.string,
    buttonOnClick: PropTypes.func,
    buttonText: PropTypes.string,
    spanClasses: PropTypes.string,
    spanText: PropTypes.string,
    divClasses: PropTypes.string,
    formOnInput: PropTypes.func,
    formClasses: PropTypes.string,
    children: PropTypes.node
}

