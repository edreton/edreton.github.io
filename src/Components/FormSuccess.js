import React from 'react';
import { GrMail } from "react-icons/gr";

const FormSuccess = () => {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", maxWidth: "1100px", margin: "0 auto"}}>
        <div style={{ fontSize: "32px"}}>
            <GrMail /> 
        </div> 
        <div style={{ paddingLeft: "10px", float: "left", textAlign: "left" }}>
            Message sent successfully!
        </div>
    </div>
    )
}

export default FormSuccess
