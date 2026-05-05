import React, { Fragment } from "react";

export default function Footer() {
    
    return(
        <footer className="row m-0" style={{backgroundColor:'teal'}}>
            <div className="col-md-4">
                <p>من نحن</p>
                <hr />
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum voluptas sit itaque corrupti id. Sit voluptates voluptatibus dolore unde autem. Officiis optio repudiandae quam ad aut inventore tempora cumque! Non.

            </div>
            <div className="col-md-4 mt-2">
                <ul style={{listStyleType:'none'}}>
                    <li><a href="" className="text-dark">Home</a></li>
                    <li><a href="" className="text-dark">Register</a></li>
                    <li><a href="" className="text-dark">Login</a></li>
                </ul>
            </div>
            <div className="col-md-4"> 
                <h4>تواصل معنا</h4>

            </div>
        </footer>
    )
}
