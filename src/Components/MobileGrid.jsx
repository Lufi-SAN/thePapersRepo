import { useOutletContext, Link, useSearchParams } from "react-router-dom";
import Card from "./Card";
import { createPortal } from "react-dom";
import filterFormInputHandler from "../Utilities/filterFormInputHandler";
import rangeLogicHandler from "../Utilities/rangeLogicHandler";
import applyRangeButtonDisplayControls from "../Utilities/applyRangeButtonDisplayControls";
import applyRangeFilter from "../Utilities/applyRangeFilter";
import cancelRangeFilter from "../Utilities/cancelRangeFilter";
import numberInputHandler from "../Utilities/numberInputHandler";
import resetButtonHandler from "../Utilities/resetButtonHandler";
import { useRef, useEffect, useState } from "react";
import scrollIntoViewHandler from "../Utilities/scrollIntoViewHandler";

export default function MobileGrid() {
    const { componentProductsData, filterPortal, bodyOverflowAffector, setFilterPortal, location } = useOutletContext();
    const [filterParameter, setFilterParameter] = useSearchParams();

    const filters = {
        category: filterParameter.getAll("category"),
        price: filterParameter.get("price")?.split('-') || [],
        rating: filterParameter.get("rating")?.split('-') || [],
        stock: filterParameter.get("stock") ? filterParameter.get("stock").split("-").map((item) => Number(item)) : []
    }

    const filterProducts = (products, filters) => {
        return products.filter(product => {
            const matchesCategory = filters.category.length !== 0 ? filters.category.includes(product.category) : true;
            const matchesPrice = filters.price.length !== 0 ? filters.price[0] <= product.price && product.price <= filters.price[1] : true;
            const matchesRating = filters.rating.length !== 0 ? filters.rating[0] <= product.rating.rate && product.rating.rate <= filters.rating[filters.rating.length - 1] : true;
            const matchesStock = filters.stock.length !== 0 ? filters.stock[0] <= product.rating.count && product.rating.count <= filters.stock[1] : true;
            return matchesCategory && matchesPrice && matchesRating && matchesStock;
        })
    }

    const filteredComponentProductsData = filterParameter ? filterProducts(componentProductsData, filters) : componentProductsData

    return (
    <>
    <div className="mt-[16px] px-[16px] pt-[16px] pb-[128px] grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-x-[24px] gap-y-[48px] bg-white">
        {filteredComponentProductsData.map((product) => <Link to={`/product/${product.id}`} key={product.id}><Card category={product.category} title={product.title} price={product.price} image={product.image}
                                 classNames={{ blendDiv: "bg-gray-100 rounded rounded-[5%] hover:grayscale-[50%]", picture: 'w-[100%] aspect-[.67] object-contain mix-blend-multiply', 
                                 pictureDiv: 'rounded rounded-[5%] overflow-hidden', mainDiv: "flex flex-col text-center bg-white text-[18px] hover:cursor-pointer", 
                                 firstP: "hidden", secondP:"mt-[8px] font-semibold mb-[7px]  max-h-[3em] min-h-[3em] overflow-hidden text-ellipsis ", thirdP: "mb-[4px]", mobileText: "hidden" }} /></Link>)}
    </div>
    { filterPortal && 
    createPortal(<MGFilterCompnt bodyOverflowAffector={bodyOverflowAffector} 
    overlayClickHandler={() => setFilterPortal(false)} location={location} filterParameter={filterParameter} setFilterParameter={setFilterParameter} />,document.body)}
    </>
    )
}

function MGFilterCompnt({ bodyOverflowAffector, overlayClickHandler, location, filterParameter, setFilterParameter }) {
    const menuGridRef = useRef(null)
    const MCRef = useRef(null)
    const ERef = useRef(null)
    const JRef = useRef(null)
    const WCRef = useRef(null)
    const sliderOneRef = useRef(null)
    const sliderTwoRef = useRef(null)
    const sliderTrackRef = useRef(null)
    const minNumberRef = useRef(null)
    const maxNumberRef = useRef(null)
    const applyButtonRef = useRef(null)
    const rating4Ref = useRef(null)
    const rating3Ref = useRef(null)
    const rating2Ref = useRef(null)
    const rating1Ref = useRef(null)
    const stock3Ref = useRef(null)
    const stock2Ref = useRef(null)
    const stock1Ref = useRef(null)
    const firstDiv = useRef(null)
    const secondDiv = useRef(null)
    const thirdDiv = useRef(null)
    const fourthDiv = useRef(null)
    const [priceErrorMessage, setPriceErrorMessage] = useState(false)

    useEffect(
        () => {
            bodyOverflowAffector.current.parentElement.parentElement.style.overflow = 'hidden';
        
            let menuSetter = setTimeout(
                () => {
                    menuGridRef.current.classList.remove("menuGridOut"),
                    menuGridRef.current.classList.add("menuGridIn")
                }, 0 
            )
            
            return () => {
                bodyOverflowAffector.current.parentElement.parentElement.style.overflow = 'visible';
                clearTimeout(menuSetter)
            }
        }, []
    )

    useEffect(
        () => {
            if (MCRef.current) {
                MCRef.current.checked  = filterParameter.getAll("category").includes("men's clothing");
                ERef.current.checked  = filterParameter.getAll("category").includes("electronics");
                JRef.current.checked  = filterParameter.getAll("category").includes("jewelery");
                WCRef.current.checked  = filterParameter.getAll("category").includes("women's clothing");
                sliderOneRef.current.value = minNumberRef.current.value = filterParameter.get("price") == null ? '0' : filterParameter.get("price").split("-")[0]
                sliderTwoRef.current.value =  maxNumberRef.current.value = filterParameter.get("price") == null ? '1000' : filterParameter.get("price").split("-")[1]
                sliderTrackRef.current.style.background = 
                `linear-gradient(to right, #e5e7eb ${(sliderOneRef.current.value/1000) * 100}%, 
              #8b5cf6 ${(sliderOneRef.current.value/1000) * 100}% ${(sliderTwoRef.current.value/1000) * 100}%, #e5e7eb ${(sliderTwoRef.current.value/1000) * 100}%)`
                switch(filterParameter.get("rating")) { 
                    case "4-5":
                        rating4Ref.current.checked = true
                        break;
                    case "3-5":
                        rating3Ref.current.checked = true
                        break;
                    case "2-5":
                        rating2Ref.current.checked = true
                        break;
                    case "1-5":
                        rating1Ref.current.checked = true
                        break;
                    default:
                        break;
                }
                 
            }
        }, [filterParameter]
    )

    return (
        <div className="bg-black/[.6] h-[100%] w-[100%] z-[1000] fixed top-0" onClick={() => { menuGridRef.current.classList.remove("menuGridIn"); menuGridRef.current.classList.add("menuGridOut"); setTimeout(overlayClickHandler, 300)}} >
            <div onClick={(event) => event.stopPropagation()} className={`bg-white fixed bottom-0 menuGridOut transition-[bottom] duration-[0.3s] ease-linear w-[100vw] rounded-2xl`} ref={menuGridRef}>
                <ul className="flex max-w-[100%] min-w-[100%] justify-around pb-[1em] pt-[0.5em]">
                    <li className="underline"><button onClick={() => scrollIntoViewHandler(firstDiv)}>Category</button></li>
                    <li><button onClick={() => scrollIntoViewHandler(secondDiv)}>Price</button></li>
                    <li><button onClick={() => scrollIntoViewHandler(thirdDiv)}>Rating</button></li>
                    <li><button onClick={() => scrollIntoViewHandler(fourthDiv)}>Stock</button></li>
                </ul>
                
                <div className="flex overflow-scroll bg-[green] snap-x snap-mandatory pt-[1em] bg-[inherit]" >
                    <div className="min-w-[100%] snap-start snap-always" ref={firstDiv}>
                        <form onInput={(event) => filterFormInputHandler(event, location, setFilterParameter)}>
                        <div className="flex item-center mt-[8px]">
                            <input type="checkbox" name="category" id="mensClothing" data-value="men's clothing" className="h-[1rem] aspect-square" ref={MCRef}/>
                            <label htmlFor="mensClothing" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">men&apos;s clothing</label>
                        </div>
                        <div className="flex item-center mt-[24px]">
                            <input type="checkbox" name="category" id="electronics" data-value="electronics" className="h-[1rem] aspect-square" ref={ERef}/>
                            <label htmlFor="electronics" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">electronics</label>
                        </div>
                        <div className="flex item-center mt-[24px]">
                            <input type="checkbox" name="category" id="jewelry" data-value="jewelery" className="h-[1rem] aspect-square" ref={JRef}/>
                            <label htmlFor="jewelry" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">jewelery</label>
                        </div>
                        <div className="flex item-center mt-[24px] mb-[8px]">
                            <input type="checkbox" name="category" id="womensClothing" data-value="women's clothing" className="h-[1rem] aspect-square" ref={WCRef}/>
                            <label htmlFor="womensClothing" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">women&apos;s clothing</label>
                        </div>
                        </form>
                    </div>
                    {/* price */}
                    <div className="min-w-[100%] snap-start snap-always bg-[purple]" ref={secondDiv}>
                        <form className="whitespace-nowrap">
                            <div data-slider-container className="relative pb-[52px] bg-[red] touch-none" style={{ touchAction: "none" }} > 
                                <div data-slider-track className="w-full h-[5px] absolute m-auto top-0 bottom-0 rounded-[5px] bg-primary" ref={sliderTrackRef} 
                                ></div>
                                
                                <input type="range" min="0" max="1000" defaultValue={0} name="priceMinSlider" ref={sliderOneRef} 
                                onChange={(event) => { event.stopPropagation(); rangeLogicHandler("priceMinSlider" , sliderOneRef, sliderTwoRef, minNumberRef, maxNumberRef, 
                                sliderTrackRef, applyRangeButtonDisplayControls, applyButtonRef, setPriceErrorMessage)} }
                                className={`range-custom w-full outline-none absolute m-auto top-0 bottom-0 bg-transparent pointer-events-none z-10`} 
                                />
                                
                                <input type="range" min="0" max="1000" defaultValue={1000} name="priceMaxSlider" ref={sliderTwoRef} 
                                onChange={(event) => { event.stopPropagation(); rangeLogicHandler("priceMaxSlider", sliderOneRef, sliderTwoRef, minNumberRef, maxNumberRef, 
                                sliderTrackRef, applyRangeButtonDisplayControls, applyButtonRef, setPriceErrorMessage)} }  className={`range-custom 
                                w-full outline-none absolute m-auto top-0 bottom-0 bg-transparent pointer-events-none`} 
                                />
                            </div>
                            
                            <div data-numberinputforslider className="flex mt-[16px] ">
                                <input type="number" defaultValue={0} min={0} max={1000} placeholder="Min" ref={minNumberRef} 
                                onChange={(event) => numberInputHandler(Number(event.target.value), "Min", 
                                applyRangeButtonDisplayControls, minNumberRef, maxNumberRef, applyButtonRef, setPriceErrorMessage)} 
                                className="border border-gray-300 rounded p-[8px]" />
                                
                                <div className="px-[8px] flex justify-center items-center">&ndash;</div>
                                
                                <input type="number" defaultValue={1000} min={0} max={1000} placeholder="Max" ref={maxNumberRef} 
                                onChange={(event) => numberInputHandler(Number(event.target.value), "Max", 
                                applyRangeButtonDisplayControls, minNumberRef, maxNumberRef, applyButtonRef, setPriceErrorMessage)} 
                                className="border border-gray-300 rounded p-[8px]" />
                            </div>
                            <div className="mt-[24px]">
                                <button type="button" onClick={() => applyRangeFilter(location, minNumberRef, maxNumberRef, setFilterParameter)} 
                                className="mr-[32px] px-[24px] py-[16px] rounded-lg text-primary bg-violet-200 font-semibold" ref={applyButtonRef}>Apply</button>
                                <button type="button" onClick={() => cancelRangeFilter(location, setFilterParameter, minNumberRef, 
                                    maxNumberRef, sliderOneRef, sliderTwoRef, sliderTrackRef)} className="font-semibold">Cancel</button>
                                {priceErrorMessage && <p className="text-red-500 font-semibold mt-[8px] 
                                whitespace-normal leading-[1.5]">PLease input a numeric value between the range of 0 to 1000</p>}
                            </div>
                        </form>
                    </div>
                    {/* rating */}
                    <div className="min-w-[100%] snap-start snap-always bg-[yellow]" ref={thirdDiv}>
                        <form onInput={(event) => filterFormInputHandler(event, location, setFilterParameter)}>
                            <div className="flex item-center"><input type="radio" name="rating" className="h-[1rem] aspect-square self-center" 
                            id="value4" data-value="4" ref={rating4Ref}/><label htmlFor="value4" className="font-semibold ml-[12px] text-[1rem] mr-[16px]">
                            <span className="material-symbols-outlined align-text-bottom">grade</span><span className="material-symbols-outlined align-text-bottom">
                            grade</span><span className="material-symbols-outlined align-text-bottom">grade</span><span className="material-symbols-outlined align-text-bottom">
                            grade</span><span> & above</span></label></div>
                            
                            <div className="mt-[16px] flex item-center"><input type="radio" name="rating" className="h-[1rem] aspect-square self-center" 
                            id="value3" data-value="3" ref={rating3Ref}/><label htmlFor="value3" className="font-semibold ml-[12px] text-[1rem]">
                            <span className="material-symbols-outlined align-text-bottom">grade</span><span className="material-symbols-outlined align-text-bottom">
                            grade</span><span className="material-symbols-outlined align-text-bottom">grade</span><span> & above</span></label></div>
                            
                            <div className="mt-[16px] flex item-center"><input type="radio" name="rating" className="h-[1rem] aspect-square self-center" 
                            id="value2" data-value="2" ref={rating2Ref}/><label htmlFor="value2" className="font-semibold ml-[12px] text-[1rem]">
                            <span className="material-symbols-outlined align-text-bottom">grade</span><span className="material-symbols-outlined align-text-bottom">
                            grade</span><span> & above</span></label></div>
                            
                            <div className="mt-[16px] flex item-center"><input type="radio" name="rating" className="h-[1rem] aspect-square self-center" 
                            id="value1" data-value="1" ref={rating1Ref}/><label htmlFor="value1" className="font-semibold ml-[12px] text-[1rem]">
                            <span className="material-symbols-outlined align-text-bottom">grade</span><span> & above</span></label></div>
                            
                            <button type="reset" className="mt-[16px] px-[24px] py-[16px] rounded-lg text-primary bg-violet-200 font-semibold" 
                            onClick={() => resetButtonHandler("rating", location, setFilterParameter)}>Reset</button>
                        </form>
                    </div>
                    {/* stock */}
                    <div className="min-w-[100%] snap-start snap-always bg-[blue]" ref={fourthDiv}>
                        <form onInput={(event) => filterFormInputHandler(event, location, setFilterParameter)}>
                            <div className="flex item-center"><input type="radio" name="stock" id="under250" data-down-value={0} data-up-value={249} 
                            ref={stock3Ref}/><label htmlFor="under250">0-249</label></div>
                            <div className="mt-[16px] flex item-center"><input type="radio" name="stock" id="under500" data-down-value={250} data-up-value={499} 
                            ref={stock2Ref}/><label htmlFor="under500">250-499</label></div>
                            <div className="mt-[16px] flex item-center"><input type="radio" name="stock" id="toInfinity" data-down-value={500} data-up-value="Infinity" 
                            ref={stock1Ref}/><label htmlFor="toInfinity">500+</label></div>
                            <button type="reset" className="mt-[16px] px-[24px] py-[16px] rounded-lg text-primary bg-violet-200 font-semibold" onClick={() => 
                            resetButtonHandler("stock", location, setFilterParameter)}>Reset</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}