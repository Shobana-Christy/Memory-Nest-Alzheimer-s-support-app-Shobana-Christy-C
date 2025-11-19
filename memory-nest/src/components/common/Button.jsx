const Button = ({ id, name, label, value, classes,onClick }) => {

    return (
        <button id={id} name={name} value={value} className={classes} onClick={onClick}>
            {label}
        </button>
    );
}
export default Button;