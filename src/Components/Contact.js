import React, { useState } from "react";
import { send } from 'emailjs-com';
import { toast } from 'react-toastify';
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
// require("dotenv").config({path: "../.env"});
require('dotenv').config();

const Contact = ({ data }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (data) {
    var contactName = data.name;
    var street = data.address.street;
    var city = data.address.city;
    var state = data.address.state;
    var zip = data.address.zip;
    var phone = data.phone;
    var contactEmail = data.email;
    var contactMessage = data.contactmessage;
  }

  function cleanData() {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

  const [btnDisabled, setBtnDisabled] = useState(false);

  function submitForm(e) {
    debugger;
    e.preventDefault();  
    
    if(name === "" || email === "" || subject === "" || message === "") {
      toast.error("Please fill out all fields");
      return;
    }
    
    setBtnDisabled(true);

    send(process.env.REACT_APP_FORM_SERVICE_ID, process.env.REACT_APP_FORM_TEMPLATE_ID, 
      {
        name: name,
        email: email,
        subject: subject,
        message: message
       }, 
      process.env.REACT_APP_FORM_USER_ID
    )
    .then((response) => {
        toast.success(<FormSuccess />);
        setBtnDisabled(false);
        cleanData();
    }, (error) => {
        toast.error(<FormError />);
        setBtnDisabled(false);
    });     
  }

  // const submitForm = () => {
  //   window.open(
  //     `mailto:${contactEmail}?subject=${encodeURIComponent(
  //       subject
  //     )}&body=${encodeURIComponent(name)} (${encodeURIComponent(
  //       email
  //     )}): ${encodeURIComponent(message)}`
  //   );
  // };

  return (
    <section id="contact">
      <div className="row section-head">
        <div className="two columns header-col">
          <h1>
            <span>Get In Touch.</span>
          </h1>
        </div>

        <div className="ten columns">
          <p className="lead">{contactMessage}</p>
        </div>
      </div>

      <div className="row">
        <div className="eight columns">
          <form onSubmit={submitForm}>
            <fieldset>
              <div>
                <label htmlFor="contactName">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  defaultValue=""
                  value={name}
                  size="35"
                  id="contactName"
                  name="contactName"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contactEmail">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="text"
                  defaultValue=""
                  value={email}
                  size="35"
                  id="contactEmail"
                  name="contactEmail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contactSubject">Subject</label>
                <input
                  type="text"
                  defaultValue=""
                  value={subject}
                  size="35"
                  id="contactSubject"
                  name="contactSubject"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contactMessage">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  cols="50"
                  rows="15"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id="contactMessage"
                  name="contactMessage"
                ></textarea>
              </div>

              <div>
                <button onClick={submitForm} type="submit" className="submit" disabled={btnDisabled}>
                  Submit
                </button>
              </div>
            </fieldset>
          </form>

          <div id="message-warning"> Error boy</div>
          <div id="message-success">
            <i className="fa fa-check"></i>Your message was sent, thank you!
            <br />
          </div>
        </div>

        <aside className="four columns footer-widgets">
          <div className="widget widget_contact">
            <h4>Contact Information</h4>
            <p className="address">
              {contactName}
              <br />
              {contactEmail}
              <br />
              <br />
              {street} <br />
              {city}, {state} {zip}
              <br />
              <span>{phone}</span>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Contact;
