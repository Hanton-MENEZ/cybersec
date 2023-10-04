import React, { useState } from "react";

const TextInput = ({type, placeholder, value, onChange}) => {
    return (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}></input>
    )
}

const FormButton= ({ className, value, type, onClick }) => {
    return (
        <button type={type} onClick={onClick} className={className}>
            {value}
        </button>
    );
};

export {TextInput, FormButton};