import React from 'react';
import { BiError } from "react-icons/bi";

const FormError = () => {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", maxWidth: "1100px", margin: "0 auto"}}>
            <div style={{ fontSize: "32px"}}>
                <BiError /> 
            </div> 
            <div style={{ paddingLeft: "10px", float: "left", textAlign: "left" }}>
                Your message could not be sent, please try again later.
            </div>
        </div>
    )
}

export default FormError
