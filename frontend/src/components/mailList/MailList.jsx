import React from "react";
import './maillist.css'

const MailList = () => {
    return(
        <div className="mail">
           <h1 className="mailtitle">Save time, Save Money</h1> 
           <span className="description">Sign up and we'll send the best deals to you</span>
           <div className="mailinputcontainer">
            <input type="text" placeholder="Your Email"/>
            <button>Subscribe</button>
           </div>
        </div>
    )
}

export default MailList