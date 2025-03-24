import { useOutletContext, Link } from "react-router-dom"
import cartButtonHandler from "../Utilities/cartButtonHandler"
import { useEffect, useState } from "react"

function Cart() {
    let {cartCounter, setCartCounter, componentProductsData, bodyOverflowAffector} = useOutletContext()
    console.log(cartCounter)
    console.log(componentProductsData)

    let [priceTotal, setPriceTotal] = useState(0)
    function ad() {
        let accumulator = 0;
        cartCounter.forEach((item) => {
            let result = componentProductsData[Number(item.ID - 1)].price * item.quantity
            accumulator += result
        })
        return accumulator
    }

    useEffect(
        () => {
            if(cartCounter) {
                let total = ad()
                setPriceTotal(total)
                }
        }, [cartCounter]
    )

    // useEffect(
    //     () => {
    //         if(cartCounter.length === 0) {
    //             bodyOverflowAffector.current.parentElement.parentElement.style.overflow = 'hidden';
    //         }    
    //         return () => { bodyOverflowAffector.current.parentElement.parentElement.style.overflow = 'visible' }
    //     }, []
    // )

    return <>

        {cartCounter.length === 0 ? <div>No cart item</div> : <div className="px-[16px]">
            <h2 className="pt-[32px] pb-[16px] font-bold text-[30px]">Shopping Cart</h2>
            {cartCounter.map((item) => 
            <CartComponent 
            image={componentProductsData[Number(item.ID - 1)].image}
            title={componentProductsData[Number(item.ID - 1)].title}
            price={componentProductsData[Number(item.ID - 1)].price * item.quantity }
            setCartCounter={setCartCounter}
            productID={item.ID}
            quantity={item.quantity}
            key={item.ID}
            />)}
            <AddEmUp subtotal={priceTotal}/>
        </div>}
    </>
    
}

function CartComponent({ image, title, price, setCartCounter, productID, quantity }) {

    return (
        <>
            <div className="border-t border-t-gray-300 text-[16px] py-[24px]">
                <div className="flex h-[128px]">
                    <img className="aspect-[1] h-[100%] object-contain" src={image} alt="A product" width={128} height={128}/>{/* flex item */}
                    
                    <div className="grid max-h-[100%]">{/* flex item */} {/* grid container */}
                        <div className="flex gap-[18ch]"> {/* grid item */} {/* flex container */}
                            <p className="max-w-[18ch] min-w-[18ch] font-medium text-[18px] text-gray-800">{title}</p>
                            <div className="flex flex-col">
                            <div className="flex items-start h-min bg-primary rounded-md text-white py-[0.5em] font-semibold">
                                <button onClick={() => cartButtonHandler({id:productID, action:'add', setCartCounter})} className="pl-[0.75em] pr-[0.75em] font-medium text-[18px]"><span>+</span></button> {/* add button */}
                                <p className="pl-[0.25em] pr-[0.25em] font-medium text-[18px]">{quantity}</p>
                                <button onClick={() => cartButtonHandler({id:productID, action:'subtract', setCartCounter})} className="pl-[0.75em] pr-[0.75em] font-medium text-[18px]"><span>-</span></button> {/* minus button */}
                            </div>
                            <button onClick={() => cartButtonHandler({id:productID, setCartCounter, remove: true})}>Remove</button>
                            </div>
                            <p className="font-semibold text-[18px]">{price}</p>
                        </div>
                        <div className="flex items-end"> {/* grid item */}
                            <p className="flex items-center font-medium text-gray-700 text-[18px]"><span className="material-symbols-outlined !text-green-500">check</span>In stock</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function AddEmUp({subtotal}) {
    return (
        <>
            <div className="border-t border-t-gray-300 flex justify-end text-[16px] pt-[24px] font-medium">
                <div className="flex flex-col w-[75%] text-[20px]">
                    <div className="flex mb-[24px] w-[100&]">
                        <ul className="w-[100%] bg-gray-100 pt-[1em] pb-[2em] px-[1.5em] rounded-md">
                            <li className="flex justify-between py-[1em] border-b border-b-gray-300">
                                <p className="text-gray-600">Subtotal</p>
                                <p>{subtotal}</p>
                            </li>
                            <li className="flex justify-between py-[1em] border-b border-b-gray-300">
                                <p className="text-gray-600">Shipping</p>
                                <p>5.00</p>
                            </li>
                            <li className="flex justify-between py-[1em] border-b border-b-gray-300">
                                <p className="text-gray-600">Tax</p>
                                <p>14.67</p>
                            </li>
                            <li className="flex justify-between pt-[1em] pt-[1.25em]">
                                <p>Order total</p>
                                <p>{subtotal + 5 + 14.67}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col w-[100%]">
                        <button className="bg-primary py-[1em] rounded-md text-white">Checkout</button>
                        <p className="text-gray-600 font-normal text-center pt-[1em]">or <Link className="text-primary font-medium">Continue Shopping</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

function NoCartItem() {
    return (
        <>
            
        </>
    )
}

export default Cart