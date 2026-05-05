import React from 'react';
import { useCart } from '../context/CartContext';
import {useTranslation} from 'react-i18next';
export default function Payment(){

    const {cartItems, getTotalPrice, getTotalItems} = useCart();
    const {t, i18n} = useTranslation();

    const itemsRows = cartItems.map((item)=>{
        return(
            <tr>
                <td><img src={item.image} alt={item.title}  style={{width:'100px', height:'150px'}}/></td>
                <td><h3>{i18n.language ==='ar'? item.ar_name : item.en_name}</h3></td>
                <td> {item.quantity}</td>
                <td>{item.price * item.quantity}</td>
            </tr>
        )
    })
    return(
        <div className='row m-0 justify-content-around'>

            {/* Cart items info */}
            <table className='col-md-6 items-container table-bordered'>
                <thead>
                    <tr style={{ backgroundColor: '#DDD'}}>
                        <th></th>
                        <th>{t('product_name')}</th>
                        <th>{t('quantity')}</th>
                        <th>{t('total_price')}</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsRows}
                </tbody>
                <tfoot>
                    <tr style={{backgroundColor: '#AAA'}}>
                        <td></td>
                        <td></td>
                        
                        <td>
                            <b> {t('items')}: {getTotalItems()}</b>
                        </td>

                        <td>
                            <b style={{color:'green'}}>{t('total_price')}: {getTotalPrice().toFixed(2)} $</b> <br />
                        </td>
                    </tr>
                </tfoot>
            </table>
            {/* End of cart items info */}

            {/* Address info */}
            <div className='col-md-5' style={{background:'#cec8c896', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div >
                    <h3>ادخل معلوماتك او قم بتسجيل الدخول</h3>
                    <hr />
                    
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input id="name" className="form-control" />
                    </div>

                    {/* Address */}
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input id="address" className="form-control" />
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone number:</label>
                        <input id="phone" className="form-control" />
                    </div>

                    <hr />

                    {/* Payment method */}
                    <select name="payment_method" id="" className="form-control">
                        <option value="paypal">Paypal</option>
                        <option value="">Card</option>
                    </select>


                    <div>
                        <button className='btn btn-success m-2'>Confirm</button>
                    </div>
                </div>
            </div>
            {/* Address info */}
        </div>
    )
}