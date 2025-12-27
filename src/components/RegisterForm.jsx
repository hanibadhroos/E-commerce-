import React from "react";

export default function RegisterForm(){


    return(
        <div>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name"/>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email"/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password"/>

                <button>Register</button>
            </form>
        </div>
    )
}