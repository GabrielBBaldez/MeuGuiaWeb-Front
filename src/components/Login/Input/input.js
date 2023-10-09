import React from "react";

const Input = ({ type, placeholder, value, onChange }) => {
    return (
        <input
            style={{width:'300px'}}
            className="form-control"
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
        />
    );
};

export default Input;