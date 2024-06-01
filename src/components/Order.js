import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { json } from "react-router-dom";

const Order = () => {
    const cartItems =JSON.parse(localStorage.getItem("carts"))
if(!cartItems){
    <p style="font-weight: bold; text-align: center;">You have not ordered anything yet! Please order.</p>

}
 

    return (
      <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#333', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>Your Order</h2>
            {!cartItems ? (
                <p style={{ textAlign: 'center' }}>You have not ordered anything yet! Please order.</p>
            ) : (
                cartItems?.map((item) => (
                    <div key={item.id} className="cart-item" style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px', margin: '10px 0', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                        <h3 style={{ color: '#555' }}>{item.title}</h3>
                        <p style={{ color: '#777', fontSize: '14px', lineHeight: '1.5' }}>{item.description}</p>
                        <p style={{ fontWeight: 'bold', color: '#333' }}>Category: <span style={{ fontWeight: 'normal', color: '#666' }}>{item.category}</span></p>
                        <p style={{ fontWeight: 'bold', color: '#333' }}>Price: <span style={{ fontWeight: 'normal', color: '#666' }}>${item.price}</span></p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Order;
