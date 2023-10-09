import React from "react";

const Button = ({ Text, onClick, Type = "button" }) => {
    return (
        <button type={Type} onClick={onClick} className="btn btn-secondary" style={{marginBottom:'20px'}}>
            {Text}
        </button>
    );
};

export default Button;