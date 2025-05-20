import { useOutletContext, Link } from "react-router-dom"
import cartButtonHandler from "../Utilities/cartButtonHandler"
import { useEffect, useState } from "react"

function Cart() {
    let {cartCounter, setCartCounter, componentProductsData, bodyOverflowAffector, isMobile} = useOutletContext()
    // console.log(cartCounter)
    // console.log(componentProductsData)

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

        {cartCounter.length === 0 ? <NoCartItem isMobile={isMobile}/> : <div className="px-[16px]">
            <h2 className="pt-[32px] pb-[16px] font-bold text-[30px]">Shopping Cart</h2>
            {cartCounter.map((item) => 
            <CartComponent 
            image={componentProductsData[Number(item.ID - 1)].image}
            title={componentProductsData[Number(item.ID - 1)].title}
            price={(componentProductsData[Number(item.ID - 1)].price * item.quantity).toFixed(2)}
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
                <div className="flex h-[192px] lg:h-[128px] w-[100%] ">
                    <img className="aspect-[1] h-[100%] object-contain" src={image} alt="A product" width={128} height={128}/>{/* flex item */}
                    
                    <div className="grid max-h-[100%] ml-[16px] w-[100%]">{/* flex item */} {/* grid container */}
                        <div className="flex flex-col gap-[18px] lg:flex-row lg:gap-[18ch]"> {/* grid item */} {/* flex container */}
                            <p className="max-w-[18ch] min-w-[18ch] font-medium text-[18px] text-gray-800">{title}</p>
                            <div className="flex flex-col w-min lg:w-auto lg:gap-[4px] lg:mx-auto">
                                <div className="flex items-start h-min bg-primary rounded-md text-white py-[0.5em] font-semibold ">
                                    <button onClick={() => cartButtonHandler({id:productID, action:'add', setCartCounter})} className="pl-[0.75em] pr-[0.75em] font-medium text-[18px]"><span>+</span></button> {/* add button */}
                                    <p className="pl-[0.25em] pr-[0.25em] font-medium text-[18px]">{quantity}</p>
                                    <button onClick={() => cartButtonHandler({id:productID, action:'subtract', setCartCounter})} className="pl-[0.75em] pr-[0.75em] font-medium text-[18px]"><span>-</span></button> {/* minus button */}
                                </div>
                                <button onClick={() => cartButtonHandler({id:productID, setCartCounter, remove: true})} className="text-[18px] justify-start lg:justify-center flex mt-[2px]">
                                    <p className="text-gray-500 hover:text-[black]">Remove</p>
                                    <span className="material-symbols-outlined !text-[red] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>delete</span>
                                </button>
                            </div>
                            <p className="font-semibold text-[18px] mt-auto lg:mt-0 lg:ml-auto">{price}</p>
                        </div>
                        <div className="flex items-end hidden lg:flex"> {/* grid item */}
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
                                <p>{subtotal.toFixed(2)}</p>
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
                                <p>{(subtotal + 5 + 14.67).toFixed(2)}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col w-[100%]">
                        <button className="bg-primary py-[1em] rounded-md text-white">Checkout</button>
                        <p className="text-gray-600 font-normal text-center pt-[1em]">or <Link className="text-primary font-medium" to={'..'} relative="path">Continue Shopping</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

function NoCartItem({isMobile}) {
    return (
        <>
          <div className="h-[100svh] flex justify-center items-center">
            <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[192px] pb-[16px]" >shopping_cart</span>
            <p className="text-[24px] font-bold pb-[4px] lg:text-[36px]">Your Cart is Empty</p>
            <p className="text-gray-400 font-medium text-center pb-[24px] text-[18px] lg:text-[24px] lg:pb-[32px]">Looks like you have not added anything to your cart. Go ahead & explore top categories</p>
            <Link to={`${isMobile ? '/products' : '/'}`} className="px-[16px] py-[16px] bg-primary text-white font-medium text-[18px] lg:text-[24px] rounded-md">Start Shopping</Link>
            </div>
          </div>
        </>
    )
}

export default Cart