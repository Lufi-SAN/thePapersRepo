import { useEffect, useRef, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom"

function Home() {
    const [componentProductsData] = useOutletContext();

    const [isFilterBoxExpanded, setisFilterBoxExpanded] = useState(false)
    const filterRef = useRef(null)

    const [zActive, setZActive] = useState({
        categoryZActive: false,
        priceZActive: false,
        ratingZActive: false,
        stockZActive: false
    })

    const [filterParameter, setFilterParameter] = useSearchParams();
    console.log(filterParameter)

    function showFilterDiv() {
        setisFilterBoxExpanded((prev) => !prev)
    }

    function toggleZActive(targetKey) {
        setisFilterBoxExpanded(true)
        setZActive((prev) => {
            const newZActive = {};
            for (let key in prev) {
                newZActive[key] = key === targetKey ? !prev[key] : false;
            }
            return newZActive;
        });
    }

    function showCategoryListHandler() {
        toggleZActive("categoryZActive");
    }

    function showPriceListHandler() {
        toggleZActive("priceZActive");
    }

    function showRatingListHandler() {
        toggleZActive("ratingZActive");
    }

    function showStockListHandler() {
        toggleZActive("stockZActive");
    }

    function mensClothingCheckClicked() { }
    function electronicsCheckClicked() { }
    function jewelryCheckClicked() { }
    function womensClothingCheckClicked() { }

    function filterFormInputHandler() {

    }

    return (
        <>
            <div>
                <section className="flex flex-col" aria-label="Store Offers">
                    <ul className="grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 order-last lg:order-first">
                        <li className="p-6 text-center border-b-[1px] border-b-gray-100 lg:border-r-2 lg:border-r-gray-100">
                            <p className="text-gray-400 mb-2">Download the app</p>
                            <p>Get an exclusive &#8358;1500 off code</p>
                        </li>
                        <li className="p-6 text-center border-b-[1px] border-b-gray-100 lg:border-r-2 lg:border-r-gray-100">
                            <p className="text-gray-400 text-center mb-2">Return when you&apos;re ready</p>
                            <p>60 days of free returns</p>
                        </li>
                        <li className="p-6 text-center border-b-[1px] border-b-gray-100">
                            <p className="text-gray-400 mb-2">Sign up for our newsletter</p>
                            <p>15% off your first order</p>
                        </li>
                    </ul>
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 ">
                        <div className="pt-[96px] p-[48px] w-auto lg:py-[256px] lg:pl-[32px] lg:pr-[48px] bg-gray-50">
                            <p className="font-bold text-[48px] mb-[32px]">It&apos;s shiny cause it&apos;s good for you</p>
                            <p className="leading-normal text-gray-600 mb-[32px] text-[20px]">If a ring is a piece of jewellery I&apos;ll be wearing for the rest of my life, a minimum 10k investment isn&apos;t insane in the grand scheme of things</p>
                            <button type="button" className="text-[18px] py-[16px] px-[48px] text-white bg-primaryLight hover:bg-primary focus:bg-primary font-bold rounded-lg">Shop Jewelry</button>
                        </div>
                        <div>
                            <img src="/TheOneRing_1280.jpg" alt="A ring of great power" srcSet="/TheOneRing_500.jpg 500w, /TheOneRing_768.jpg 768w, /TheOneRing_1280.jpg 1280w" className="h-[100%] object-cover" />
                        </div>
                    </div>
                </section>

                <section aria-labelledby="Product List" className="pt-[96px] lg:pl-[32px]">
                    <h2 id="Product List" className="text-[24px] font-bold">Our Products</h2>
                    <div className="flex pt-[8px] text-gray-500">
                        <button aria-controls="filterBoxDiv" onClick={showFilterDiv} className="text-primary text-[18px] font-bold">Filters <span className="align-text-top">&#8964;</span></button>

                        <ul className="me-0 ms-auto flex divide-x" role="Filter Options">

                            <li className="relative px-[16px]">
                                <button className="text-[18px] font-bold hover:text-black focus:text-black" onClick={showCategoryListHandler}>Category <span className="align-text-top">&#8964;</span></button>
                                <div className={`p-[16px] absolute top-[100%] bg-white ${zActive.categoryZActive ? "z-10" : "hidden"}`}>
                                    <form onInput={filterFormInputHandler}>
                                        <div className="flex item-center"><input type="checkbox" name="" id="mensClothing" className="h-[1rem] aspect-square" onChange={mensClothingCheckClicked} /><label htmlFor="mensClothing" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap">men&apos;s clothing</label></div>
                                        <div className="flex item-center mt-[16px]"><input type="checkbox" name="" id="electronics" className="h-[1rem] aspect-square" onChange={electronicsCheckClicked} /><label htmlFor="electronics" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap">electronics</label></div>
                                        <div className="flex item-center mt-[16px]"><input type="checkbox" name="" id="jewelry" className="h-[1rem] aspect-square" onChange={jewelryCheckClicked} /><label htmlFor="jewelry" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap">jewelry</label></div>
                                        <div className="flex item-center mt-[16px]"><input type="checkbox" name="" id="womensClothing" className="h-[1rem] aspect-square" onChange={womensClothingCheckClicked} /><label htmlFor="womensClothing" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap">women&apos;s clothing</label></div>
                                    </form>
                                </div>
                            </li>

                            <li className="relative px-[16px]">
                                <button className="text-[18px] font-bold hover:text-black focus:text-black" onClick={showPriceListHandler}>Price <span className="align-text-top">&#8964;</span></button>
                                <div className={`p-[16px] absolute top-[100%] -left-[16px] bg-white ${zActive.priceZActive ? "z-10" : "hidden"}`}>
                                    hi
                                </div>
                            </li>

                            <li className="relative px-[16px]">
                                <button className="text-[18px] font-bold hover:text-black focus:text-black" onClick={showRatingListHandler}>Rating <span className="align-text-top">&#8964;</span></button>
                                <div className={`p-[16px] absolute top-[100%] -left-[16px] bg-white ${zActive.ratingZActive ? "z-10" : "hidden"}`}>
                                    hello
                                </div>
                            </li>

                            <li className="relative px-[16px]">
                                <button className="text-[18px] font-bold hover:text-black focus:text-black" onClick={showStockListHandler}>Stock <span className="align-text-top">&#8964;</span></button>
                                <div className={`p-[16px] absolute top-[100%] -left-[16px] bg-white ${zActive.stockZActive ? "z-10" : "hidden"}`}>
                                    sup
                                </div>
                            </li>
                        </ul>
                    </div>

                    {
                        isFilterBoxExpanded && <div role="Product Filters" id="filterBoxDiv" aria-expanded={isFilterBoxExpanded} className="flex" ref={filterRef}>
                            <p>Filters</p>
                        </div>
                    }
                </section>
            </div>
        </>
    )
}
// Grid goes here, it depends on the product array which can be filtered or not, we have the newsletter form & Carousel* & aside for hiring, maybe testimonials
// and an extra banner; We change the url params here(function to change the url params)
// Won't be full width; Can do with auto margins + max-width, flex or grid entire thing
// We'll filter here i guess
//My tailwind JIT isn't responding, heaven knows why
export default Home

// function FilterDivBoxes(categoryName) {
//     return (
//         <div>
//             {categoryName}
//             <button type="button" onClick={ }>X</button>
//         </div>
//     )
// }

// ["men's clothing", "jewelry", "electronics", "women's clothing"] Price: 0 - 50.99, 51 - 249.99, 250 - 499.99, 500+; 
// rating.rate: 1 - 1.9; rating.count: 0 - 499, 500+ 