import React from "react";

export default function DeleteModal({open}){

    if(open){
        return (
            <div style={{width:'100%', height:'100%', backgroundColor:'black'}}>
                <div className="delete-content">
                    <p>Are sure to delete this product?</p>
                    <hr />
                    <div>
                        <button>Delete</button>
                        <button>Back</button>
                    </div>
                </div>
            </div>
        )
    }

}