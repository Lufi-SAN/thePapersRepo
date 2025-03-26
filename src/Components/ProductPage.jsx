import { useEffect } from "react"
import cartButtonHandler from "../Utilities/cartButtonHandler"
import { useOutletContext, useParams, Link } from "react-router-dom"

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
    <div className="w-[100%] px-[3vw] text-[16px]">
    <div className="flex pt-[2em]">
        <div className="max-w-[55%]">
            <div className="flex flex-col">
                <div data-title className="font-bold text-[36px] lg:text-[36px] pb-[16px]">{componentProductsData[index].title}</div>
                <div data-pricerating className="flex items-center pb-[16px]">
                    <div className="text-[24px] mr-[8px]">{componentProductsData[index].price}</div>
                    <div className="flex items-center text-[18px] text-gray-400 border-l border-l-gray-700 pl-[8px]">{componentProductsData[index].rating.rate}<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }} >grade</span></div>
                </div>
                <div data-description className="text-[24px] text-gray-400 pb-[16px] leading-[1.05]"><p>{componentProductsData[index].description}</p></div>
                <div data-stock className="flex pb-[128px]"><p className="text-gray-400 text-[18px]"><span className="text-green-500 text-[24px]">{componentProductsData[index].rating.count}</span> in stock and ready to ship</p></div>
                <div data-addtobag className="w-[100%]">{checkProductExistence ? 
                    <PerpetualAddToCartButton productQuantity={productQuantity} productID={productID} setCartCounter={setCartCounter} /> : 
                    <AddToCartButton productID={productID} setCartCounter={setCartCounter}/>}</div>
                <Link to={"/cart"} className="text-[20px] mt-[16px] text-center text-primaryLight underline hover:text-primary">Go to Cart?</Link>
            </div>
        </div>
        <div data-image className='min-w-[45%] bg-no-repeat bg-contain bg-center' style={{ backgroundImage: `url(${componentProductsData[index].image})`}}>
            {/* <img src={componentProductsData[index].image} alt="Product Image`" className="w-[100%] h-[100%] object-contain"/> */}
        </div>
    </div>
    </div>
    )
}

function AddToCartButton({productID, setCartCounter}) {
    return (
        <button onClick={() => cartButtonHandler({id:productID, action:'add', setCartCounter})} className="w-[100%] bg-primary py-[1em] rounded-md text-white text-center font-medium text-[20px]">Add to Cart</button>
    )

}

function PerpetualAddToCartButton({productQuantity, productID, setCartCounter}) {
    return (
        <div className="w-[100%] flex justify-between">
            <button onClick={() => cartButtonHandler({id:productID, action:'add', setCartCounter})} className="bg-primaryLight p-[1em] text-[20px] text-[white] rounded rounded-md">+</button>
            <div className="text-[20px] p-[1em] text-primary">{productQuantity}</div>
            <button onClick={() => cartButtonHandler({id:productID, action:'subtract', setCartCounter})} className="bg-primaryLight p-[1em] text-[20px] text-[white] rounded rounded-md">-</button>
        </div>
    )
}