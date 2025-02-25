import { useEffect } from "react"
import cartButtonHandler from "../Utilities/cartButtonHandler"
import { useOutletContext, useParams } from "react-router-dom"

export default function ProductPage() {
    const {bodyOverflowAffector, componentProductsData, cartCounter, setCartCounter} = useOutletContext();
    const {productID} = useParams()
    const index = productID - 1
    const checkProductExistence = cartCounter.find((item) => item?.ID === productID);
    const productQuantity = checkProductExistence ? checkProductExistence.quantity : 0;
    // console.log(`cart:${cartCounter[productID]?.ID},${cartCounter[productID]?.quantity} &&& quantity: ${checkProductExistence?.quantity}`)
    
    useEffect(
        () => {
            bodyOverflowAffector.current.parentElement.parentElement.style.overflow = 'hidden';
            return () => { bodyOverflowAffector.current.parentElement.parentElement.style.overflow = 'visible' }
        }, []
    )
    
    return(
    <div className="flex w-[100%]">
        <div>
            <div className="flex flex-col m-[30px]">
                <div data-title>{componentProductsData[index].title}</div>
                <div data-pricerating className="flex"><div>{componentProductsData[index].price}</div><div>{componentProductsData[index].rating.rate}</div></div>
                <div data-description>{componentProductsData[index].description}</div>
                <div data-stock>{componentProductsData[index].rating.count}</div>
                <div data-addtobag>{checkProductExistence ? 
                    <PerpetualAddToCartButton productQuantity={productQuantity} productID={productID} setCartCounter={setCartCounter}/> : 
                    <AddToCartButton productID={productID} setCartCounter={setCartCounter}/>}</div>
            </div>
        </div>
        <div data-image>
            <img src={componentProductsData[index].image} alt="Product Image`" className="m-[30px]"/>
        </div>
    </div>
    )
}

function AddToCartButton({productID, setCartCounter}) {
    return (
        <button onClick={() => cartButtonHandler(productID,'add',setCartCounter)}>Add to Cart</button>
    )

}

function PerpetualAddToCartButton({productQuantity, productID, setCartCounter}) {
    return (
        <div className="flex">
            <button onClick={() => cartButtonHandler(productID,'add',setCartCounter)}>+</button>
            <div>{productQuantity}</div>
            <button onClick={() => cartButtonHandler(productID,'subtract',setCartCounter)}>-</button>
        </div>
    )
}