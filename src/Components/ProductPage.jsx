import { createContext, useContext, useEffect } from "react"
import cartButtonHandler from "../Utilities/cartButtonHandler"
import { useOutletContext, useParams, Link } from "react-router-dom"
import { useMediaQuery } from 'react-responsive';

const ProductPageContext = createContext({})

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
    
    const isMobile = useMediaQuery({ maxWidth: 1023 });
    const isLaptop = useMediaQuery({ minWidth: 1024 });

    if (isLaptop) return (
    <ProductPageContext.Provider value={{componentProductsData, index, checkProductExistence, productQuantity, productID, setCartCounter}}>
        <div className="w-[100%] px-[3vw] text-[16px]">
        <div className="flex pt-[2em]">
            <div className="max-w-[55%]">
                <div className="flex flex-col">
                    <Title />
                    <div data-pricerating className="flex items-center pb-[16px]">
                        <Price />
                        <Rating />
                    </div>
                    <Description />
                    <Stock />
                    <ActionButton />
                    <GoToCartLink />
                </div>
            </div>
            <ProductImage></ProductImage>
        </div>
        </div>
    </ProductPageContext.Provider>
    )

    if (isMobile) return (
    <ProductPageContext.Provider value={{componentProductsData, index, checkProductExistence, productQuantity, productID, setCartCounter}}>
        <div className="w-[100%] px-[3vw] text-[16px]">
            <div className="flex flex-col pt-[2em]">
                <div className="flex flex-col">
                    <Title />
                    <div className="flex">
                        <Price />
                        <Rating />
                    </div>
                    <Description />
                    <Stock />
                </div>
                <ProductImage>
                    <img src={componentProductsData[index].image} alt="Product Image`" className="w-[100%] h-[100%] object-contain"/>
                </ProductImage>
                <ActionButton />
                <GoToCartLink />
            </div>
        </div>
    </ProductPageContext.Provider>
    )
}

function Title () {
    const { componentProductsData, index } = useContext(ProductPageContext)

    return (
        <div data-title className="font-bold lg:text-[36px] pb-[16px]">{componentProductsData[index].title}</div>
    )
}

function Price () {
    const { componentProductsData, index } = useContext(ProductPageContext)

    return (
        <div className="lg:text-[24px] mr-[8px]">{componentProductsData[index].price}</div>
    )
}

function Rating () {
    const { componentProductsData, index } = useContext(ProductPageContext)

    return (
        <div className="flex items-center lg:text-[18px] text-gray-400 border-l border-l-gray-700 pl-[8px]">
            {componentProductsData[index].rating.rate}<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }} >grade</span>
        </div>
    )
}

function Description () {
    const { componentProductsData, index } = useContext(ProductPageContext)

    return (
        <div data-description className="lg:text-[24px] text-gray-400 pb-[16px] lg:leading-[1.05]"><p>{componentProductsData[index].description}</p></div>
    )
}

function Stock () {
    const { componentProductsData, index } = useContext(ProductPageContext)

    return (
        <div data-stock className="flex pb-[128px]"><p className="text-gray-400 lg:text-[18px]"><span className="text-green-500 lg:text-[24px]">
            {componentProductsData[index].rating.count}</span> in stock and ready to ship</p>
        </div>
    )
}

function ActionButton () {
    const {checkProductExistence, productQuantity, productID, setCartCounter} = useContext(ProductPageContext)

    return (
        <div data-addtobag className="w-[100%]">{checkProductExistence ? 
            <PerpetualAddToCartButton productQuantity={productQuantity} productID={productID} setCartCounter={setCartCounter} /> : 
            <AddToCartButton productID={productID} setCartCounter={setCartCounter}/>}
        </div>
    )
}

function GoToCartLink () {
    return (
        <Link to={"/cart"} className="lg:text-[20px] mt-[16px] text-center text-primaryLight underline hover:text-primary">Go to Cart?</Link>
    )
}

function ProductImage ({children = null}) {
    const { componentProductsData, index } = useContext(ProductPageContext)
    const isLaptop = useMediaQuery({ minWidth: 1024 });

    return (
        <div data-image className='lg:min-w-[45%] lg:bg-no-repeat lg:bg-contain lg:bg-center' style={isLaptop ? { backgroundImage: `url(${componentProductsData[index].image})`} : {}}>
            {children}
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