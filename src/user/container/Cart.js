import React from 'react';
import TitleBox from '../UI/titlePart/TitleBox';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../UI/button/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { decrementQuantity, incrementQuantity, removeItemFromCart } from '../redux/action/cart.action';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function Cart() {
    const dispatch = useDispatch();
    const medicineState = useSelector((state) => state.medicines);
    const cartState = useSelector((state) => state.cart);

    let mediToCartData = cartState.items.map((cartItem) => {
        let filterData = medicineState.medicines.find((medicine) => medicine.id === cartItem.pid);

        return { ...filterData, ...cartItem }
    })

    let totleAmount = mediToCartData.reduce((acc, val) => acc + parseInt(val.mediprice) * val.quantity, 0);

    const quantityDecrement = (id) => {
        dispatch(decrementQuantity(id))
    }
    const quantityIncrement = (id) => {
        dispatch(incrementQuantity(id))
    }

    const removeFromCart = (id) => {
        dispatch(removeItemFromCart(id));
    }
    return (
        <section id="cart" className="cart">
            <div className="container">
                <TitleBox
                    titleText='Cart'
                    subTitleText={[
                        'Welcome to cart. You can see here your added product. Thank you !!!'
                    ]} />
                <div className="row justify-content-center">
                    {
                        mediToCartData.map((item) => {
                            return (
                                <div key={item.pid} className="card mb-3 shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex g-5 justify-content-between">
                                            <div className='w-50'>
                                                <h5 style={{
                                                    fontWeight: '700',
                                                    fontSize: '20px',
                                                    color: '#2c4964'
                                                }}>{item.mediname}</h5>
                                                <p className="small mb-0">{item.medidesc}</p>
                                            </div>
                                            <div className="d-flex gap-3 flex-row align-items-center">
                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <Button classes='p-2 rounded-0' onClick={() => quantityDecrement(item.pid)}><RemoveIcon sx={{ fontSize: '20px' }} /></Button>
                                                    <h5 style={{ borderTop: '1px solid #FF6337', borderBottom: '1px solid #FF6337', lineHeight: '1.05', minWidth: '50px' }}
                                                        className="fw-normal text-center mb-0  p-2">{item.quantity}</h5>
                                                    <Button classes='p-2 rounded-0' onClick={() => quantityIncrement(item.pid)}><AddIcon sx={{ fontSize: '20px' }} /></Button>
                                                </div>
                                                <div style={{ minWidth: 85 }}>
                                                    <h5 className="mb-0 text-center"><CurrencyRupeeIcon sx={{fontSize: '20px'}}/>{item.quantity * item.mediprice}</h5>
                                                </div>
                                                <Button onClick={() => removeFromCart(item.pid)} classes='p-0 bg-transparent'><CloseIcon sx={{ color: '#cecece' }} /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    cartState.items.length > 0 ?
                        <h5 className='text-end my-4'><b>Totle Amount: </b><span className='d-inline-block text-start ps-4' style={{ minWidth: '163px' }}><CurrencyRupeeIcon sx={{fontSize: '20px'}}/>{totleAmount}</span></h5>
                        : null
                }
            </div>
        </section>
    );
}

export default Cart;