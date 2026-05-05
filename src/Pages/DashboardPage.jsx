import React from "react";
import { useSelector } from "react-redux";

export default function DashboardPage(){

    const {user, loading, isAuthenticated} = useSelector((state)=> state.auth)


    return(
        <div>
            <main>

            </main>
            <aside>
                <h2>{user.name}</h2>
                {/* Links */}
                <div>
                    <ul>
                        <li><a href="">Products</a></li>
                        <li><a href=""></a></li>
                        <li><a href=""></a></li>
                    </ul>
                </div>

            </aside>
        </div>
    )
}