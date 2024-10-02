import { useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom"

function Home() {
    const { componentProductsData, location } = useOutletContext();

    //State to keep filter bar status
    const [isFilterBoxExpanded, setisFilterBoxExpanded] = useState(false)
    //Function to change filter bar status(bool)
    function showFilterDiv() {
        setisFilterBoxExpanded((prev) => !prev)
    }
    //Config for current filter option form display
    const [zActive, setZActive] = useState({
        categoryZActive: false,
        priceZActive: false,
        ratingZActive: false,
        stockZActive: false
    })
    //General function to change fofd-config & toggle their display
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

    //Apply general function as handler to each fofd-button
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

    //Create SP object
    const [filterParameter, setFilterParameter] = useSearchParams();
    //Create new URLSP object with every location change
    const URLFilterParameter = new URLSearchParams(location.search);

    //General form input handler with input type dependent logic
    function filterFormInputHandler(event) {
        event.preventDefault();
        setFilterParameter((prevFilterParams) => {
            const typeOfInput = event.target.name;
            let returnObject;

            switch (typeOfInput) {
                case "category":
                    if (URLFilterParameter.has(event.target.name, event.target.dataset.value)) {
                        console.log("yes")
                        URLFilterParameter.delete(event.target.name, event.target.dataset.value)
                    } else {
                        URLFilterParameter.append(event.target.name, event.target.dataset.value)
                    }
                    returnObject = Object.assign(URLFilterParameter, prevFilterParams)
                    break;

                case "priceMin" || "priceMax":
                    typeOfInput === "priceMin" ? sliderLogic("priceMin") : sliderLogic("priceMax");
                    break;

            }

            return returnObject
        })

    }


    //State to know slider value status
    const [sliderOneValue, setSliderOneValue] = useState(0);
    const [sliderTwoValue, setSliderTwoValue] = useState(1000)

    function sliderLogic(whichSlider) {
        const minGap = 0;
        switch (whichSlider) {
            case "priceMin":
                if (sliderTwoValue - sliderOneValue <= minGap) {
                    setSliderOneValue(sliderTwoValue - minGap);
                }
                break
            case "priceMax":
                if (sliderTwoValue - sliderOneValue <= minGap) {
                    setSliderTwoValue(sliderOneValue + minGap);
                }
                break
        }
    }

    function applyRangeFilter() {
        let returnObject;
        URLFilterParameter.set("price", `${sliderOneValue}-${sliderTwoValue}`)
        setFilterParameter((prevFilterParams) => {
            returnObject = Object.assign(URLFilterParameter, prevFilterParams)
            return returnObject
        })
    }

    function cancelRangeFilter() {
        let returnObject;
        URLFilterParameter.delete("price");
        setFilterParameter((prevFilterParams) => {
            returnObject = Object.assign(URLFilterParameter, prevFilterParams)
            return returnObject
        })
        setSliderOneValue(0)
        setSliderTwoValue(1000)
    }

    //Filter config 
    const filters = {
        category: filterParameter.getAll("category"),
        price: filterParameter.get("price")?.split('-') || [],

    }

    //Function to filter the products array according to filter config 
    const filterProducts = (products, filters) => {
        return products.filter(product => {
            const matchesCategory = filters.category.length !== 0 ? filters.category.includes(product.category) : true;
            const matchesPrice = filters.price.length !== 0 ? filters.price[0] <= product.price <= filters.price[1] : true;
            const matchesRating = product.rating.rate >= (filters.ratingMin || 0);
            const matchesStock = product.rating.stock >= (filters.stockMin || 0);

            return matchesCategory && matchesPrice && matchesRating && matchesStock;
        })
    }

    //End array for use in UI
    const filteredComponentProductsData = filterParameter ? ["a"] : componentProductsData

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
                                <div className={`p-[16px] absolute top-[100%] bg-white ${zActive.categoryZActive ? "z-10" : "hidden"} border rounded-md`}>
                                    <form onInput={(Event) => filterFormInputHandler(Event)}>
                                        <div className="flex item-center"><input type="checkbox" name="category" id="mensClothing" data-value="mensClothing" className="h-[1rem] aspect-square" /><label htmlFor="mensClothing" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap">men&apos;s clothing</label></div>
                                        <div className="flex item-center mt-[16px]"><input type="checkbox" name="category" id="electronics" data-value="electronics" className="h-[1rem] aspect-square" /><label htmlFor="electronics" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap">electronics</label></div>
                                        <div className="flex item-center mt-[16px]"><input type="checkbox" name="category" id="jewelry" data-value="jewelry" className="h-[1rem] aspect-square" /><label htmlFor="jewelry" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap">jewelry</label></div>
                                        <div className="flex item-center mt-[16px]"><input type="checkbox" name="category" id="womensClothing" data-value="womensClothing" className="h-[1rem] aspect-square" /><label htmlFor="womensClothing" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap">women&apos;s clothing</label></div>
                                    </form>
                                </div>
                            </li>

                            <li className="relative px-[16px]">
                                <button className="text-[18px] font-bold hover:text-black focus:text-black" onClick={showPriceListHandler}>Price <span className="align-text-top">&#8964;</span></button>
                                <div className={`p-[16px] absolute top-[100%] -left-[16px] bg-white ${zActive.priceZActive ? "z-10" : "hidden"} border rounded-md`}>
                                    <form onInput={(Event) => filterFormInputHandler(Event)}>
                                        <div className="sliderWrapper">
                                            <div className="sliderContainer">
                                                <div className="slider-track"></div>
                                                <input type="range" min="0" max="1000" value={sliderOneValue} id="slider-1" name="priceMin" data-value={sliderOneValue} onChange={(event) => setSliderOneValue(parseInt(event.target.value))} />
                                                <input type="range" min="0" max="1000" value={sliderTwoValue} id="slider-2" name="priceMax" data-value={sliderTwoValue} onChange={(event) => setSliderTwoValue(parseInt(event.target.value))} />
                                            </div>
                                            <button type="button" onClick={applyRangeFilter}>Apply</button>
                                            <button type="button" onClick={cancelRangeFilter}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </li>

                            <li className="relative px-[16px]">
                                <button className="text-[18px] font-bold hover:text-black focus:text-black" onClick={showRatingListHandler}>Rating <span className="align-text-top">&#8964;</span></button>
                                <div className={`p-[16px] absolute top-[100%] -left-[16px] bg-white ${zActive.ratingZActive ? "z-10" : "hidden"} border rounded-md`}>
                                    hello
                                </div>
                            </li>

                            <li className="relative px-[16px]">
                                <button className="text-[18px] font-bold hover:text-black focus:text-black" onClick={showStockListHandler}>Stock <span className="align-text-top">&#8964;</span></button>
                                <div className={`p-[16px] absolute top-[100%] -left-[16px] bg-white ${zActive.stockZActive ? "z-10" : "hidden"} border rounded-md`}>
                                    sup
                                </div>
                            </li>
                        </ul>
                    </div>

                    {
                        isFilterBoxExpanded && <div role="Product Filters" id="filterBoxDiv" aria-expanded={isFilterBoxExpanded} className="flex" >
                            <p>Filters</p>
                        </div>
                    }

                    <div>
                        {filteredComponentProductsData}
                    </div>
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