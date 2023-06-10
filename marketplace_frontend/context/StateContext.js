import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (newProduct, quantity) => {
        const productInCart = cartItems.find(cartItem => cartItem._id === newProduct._id);
        newProduct.quantity = quantity;
        if (!productInCart) {
            setCartItems([...cartItems, newProduct]);
            setTotalPrice(prev => prev + quantity * newProduct.price);
            setTotalQuantities(prev => prev + quantity);
        } else {
            var cartSum = 0;
            var cartQuant = 0;
            const updatedCartItems = cartItems.map(cartItem => {
                if (cartItem._id === newProduct._id) {
                    cartSum += newProduct.price * newProduct.quantity;
                    cartQuant += newProduct.quantity
                    return newProduct;
                } else {
                    cartSum += cartItem.quantity * cartItem.price;
                    cartQuant += cartItem.quantity;
                    return cartItem;
                }
            })
            setCartItems(updatedCartItems);
            setTotalPrice(cartSum);
            setTotalQuantities(cartQuant);
        }


        // setTotalPrice(prev => prev + quantity * newProduct.price);
        // setTotalQuantities(prev => prev + quantity);
        // const checkProductInCart = cartItems.find(cartProduct => cartProduct._id === newProduct._id);
        // if (checkProductInCart) {
        //     const updatedCartItems = cartItems.map(cartItem => {
        //         if (cartItem._id === newProduct._id)
        //             return {
        //                 ...cartItem,
        //                 quantity: cartItem.quantity + quantity
        //             }
        //     })
        //     setCartItems(updatedCartItems);
        // } else {
        //     newProduct.quantity = quantity;
        //     setCartItems([...cartItems, { ...newProduct }]);
        // }
        // toast.success(`${qty} ${newProduct.name} added to cart.`);
        // const checkProductInCart = cartItems.find((item) => item._id === product._id);

        // setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        // setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        // if (checkProductInCart) {
        //     const updatedCartItems = cartItems.map((cartProduct) => {
        //         if (cartProduct._id === product._id) return {
        //             ...cartProduct,
        //             quantity: cartProduct.quantity + quantity
        //         }
        //     })
        //     setCartItems(updatedCartItems);
        // } else {
        //     product.quantity = quantity;
        //     setCartItems([...cartItems, { ...product }]);
        // }
        toast.success("Added to the cart.");
    }

    const onRemove = (product) => {

        foundProduct = cartItems.find(item => item._id === product._id);
        const newCartItems = cartItems.filter(item => item._id !== foundProduct._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuanitity = (id, value) => {

        if (value === "inc") {
            var amt;
            const updatedCartItems = cartItems.map(cartItem => {
                if (cartItem._id === id) {
                    cartItem.quantity += 1;
                    amt = cartItem.price;
                }
                return cartItem;
            })
            console.log(updatedCartItems);
            setCartItems(updatedCartItems);
            setTotalQuantities(prev => prev + 1);
            setTotalPrice(prev => prev + amt);
        } else {
            var amt;
            const updatedCartItems = cartItems.map(cartItem => {
                if (cartItem._id === id) {
                    cartItem.quantity -= 1;
                    amt = cartItem.price;
                } return cartItem;
            })
            const integralCartItems = updatedCartItems.filter(cartItem => cartItem.quantity !== 0);
            setCartItems(integralCartItems);
            setTotalQuantities(prev => prev - 1);
            setTotalPrice(prev => prev - amt);
        }
    }

    const incQty = () => {
        setQty(prev => prev + 1);
    }

    const decQty = () => {
        setQty(prev => {
            if (prev == 1)
                return 1;
            return prev - 1;
        })
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                setQty,
                onAdd,
                toggleCartItemQuanitity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);