import { useState, useRef } from "react";
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
            let returnObject = { ...prevFilterParams };

            switch (typeOfInput) {
                case "category":
                    if (URLFilterParameter.has(event.target.name, event.target.dataset.value)) {
                        URLFilterParameter.delete(event.target.name, event.target.dataset.value)
                    } else {
                        URLFilterParameter.append(event.target.name, event.target.dataset.value)
                    }
                    returnObject = Object.assign(URLFilterParameter, prevFilterParams)
                    break;
                case "rating":
                    if (URLFilterParameter.has(event.target.name, `${event.target.dataset.bottomValue}-${event.target.dataset.topValue}`)) {
                        URLFilterParameter.delete(event.target.name, `${event.target.dataset.bottomValue}-${event.target.dataset.topValue}`)
                    } else {
                        URLFilterParameter.append(event.target.name, `${event.target.dataset.bottomValue}-${event.target.dataset.topValue}`)
                    }
                    returnObject = Object.assign(URLFilterParameter, prevFilterParams)
                    break;

            }

            return returnObject
        })

    }

    const sliderOneRef = useRef(null)
    const sliderTwoRef = useRef(null)
    const sliderTrackRef = useRef(null)
    const minNumberRef = useRef(null)
    const maxNumberRef = useRef(null)

    function rangeLogicHandler(id) {
        const minGap = 0;
        const sliderOneValue = ((parseInt(sliderOneRef.current.value) / 1000) * 100)
        const sliderTwoValue = ((parseInt(sliderTwoRef.current.value) / 1000) * 100)

        if (sliderTwoRef.current.value === 0) {
            sliderTwoRef.current.style.zIndex = 1000;
        } else {
            sliderTwoRef.current.style.zIndex = 0;
        }

        if (id === sliderOneRef.current.name) {
            if (parseInt(sliderTwoRef.current.value) - parseInt(sliderOneRef.current.value) <= minGap) {
                sliderOneRef.current.value = parseInt(sliderTwoRef.current.value) - minGap;
            }
        } else {
            if (parseInt(sliderTwoRef.current.value) - parseInt(sliderOneRef.current.value) <= minGap) {
                sliderTwoRef.current.value = parseInt(sliderOneRef.current.value) + minGap;
            }
        }

        minNumberRef.current.value = sliderOneRef.current.value;
        maxNumberRef.current.value = sliderTwoRef.current.value;
        sliderTrackRef.current.style.background = `linear-gradient(to right, #e5e7eb ${sliderOneValue}%, #8b5cf6 ${sliderOneValue}% ${sliderTwoValue}%, #e5e7eb ${sliderTwoValue}%)`
    }

    function numberInputHandler(value, inputID) {
        const min = 0;

        if (inputID === "Min") {
            if (value >= maxNumberRef.current.value) {
                minNumberRef.current.value = Number(maxNumberRef.current.value) - min
            }
        } else if (inputID === "Max") {
            if (value <= minNumberRef.current.value) {
                maxNumberRef.current.value = Number(minNumberRef.current.value) + min
            }
        }
    }

    function applyRangeFilter() {
        const newParams = new URLSearchParams(location.search)
        newParams.set('price', `${minNumberRef.current.value}-${maxNumberRef.current.value}`)
        setFilterParameter(newParams);
    }

    function cancelRangeFilter() {
        const newParams = new URLSearchParams(location.search)
        newParams.delete("price");
        setFilterParameter(newParams)//I ended up with ?price = undefined in URL so I like it better this way
        minNumberRef.current.value = 0
        maxNumberRef.current.value = 1000
        sliderOneRef.current.value = 0
        sliderTwoRef.current.value = 1000
        sliderTrackRef.current.style.background = '#8b5cf6';
    }

    //Filter config 
    const filters = {
        category: filterParameter.getAll("category"),
        price: filterParameter.get("price")?.split('-') || [],
        rating: filterParameter.getAll("rating").length !== 0 ? Array.from(new Set(Array.from(filterParameter.getAll("rating")).join().split("-").join(",").split(","))) : [],

    }
    console.log(filters)

    //Function to filter the products array according to filter config 
    const filterProducts = (products, filters) => {
        return products.filter(product => {
            const matchesCategory = filters.category.length !== 0 ? filters.category.includes(product.category) : true;
            const matchesPrice = filters.price.length !== 0 ? filters.price[0] <= product.price <= filters.price[1] : true;
            const matchesRating = filters.rating.length !== 0 ? filters.rating[0] <= product.rating.rate <= filters.rating[filters.rating.length - 1] : true;
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

                        <ul className="me-0 ms-auto flex divide-x accent-primary" role="Filter Options">

                            <li className="relative px-[16px]">
                                <button className="text-[18px] font-bold hover:text-black focus:text-black" onClick={showCategoryListHandler}>Category <span className="align-text-top">&#8964;</span></button>
                                <div className={`p-[16px] absolute top-[150%] bg-white ${zActive.categoryZActive ? "z-10" : "hidden"} border rounded-md`}>
                                    <form onInput={(event) => filterFormInputHandler(event)}>
                                        <div className="flex item-center"><input type="checkbox" name="category" id="mensClothing" data-value="mensClothing" className="h-[1rem] aspect-square" /><label htmlFor="mensClothing" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">men&apos;s clothing</label></div>
                                        <div className="flex item-center mt-[16px]"><input type="checkbox" name="category" id="electronics" data-value="electronics" className="h-[1rem] aspect-square" /><label htmlFor="electronics" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">electronics</label></div>
                                        <div className="flex item-center mt-[16px]"><input type="checkbox" name="category" id="jewelry" data-value="jewelry" className="h-[1rem] aspect-square" /><label htmlFor="jewelry" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">jewelry</label></div>
                                        <div className="flex item-center mt-[16px]"><input type="checkbox" name="category" id="womensClothing" data-value="womensClothing" className="h-[1rem] aspect-square" /><label htmlFor="womensClothing" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">women&apos;s clothing</label></div>
                                    </form>
                                </div>
                            </li>

                            <li className="relative px-[16px]">
                                <button className="text-[18px] font-bold hover:text-black focus:text-black" onClick={showPriceListHandler}>Price <span className="align-text-top">&#8964;</span></button>
                                <div className={`p-[16px] absolute top-[150%] -left-[16px] bg-white ${zActive.priceZActive ? "z-10" : "hidden"} border rounded-md`}>
                                    <form className="whitespace-nowrap">
                                        <div data-slider-container className="relative pb-[32px]">
                                            <div data-slider-track className="w-full h-[5px] absolute m-auto top-0 bottom-0 rounded-[5px] bg-primary" ref={sliderTrackRef}></div>
                                            <input type="range" min="0" max="1000" defaultValue={0} name="priceMinSlider" ref={sliderOneRef} onChange={() => { rangeLogicHandler("priceMinSlider") }} className={`range-custom w-full outline-none absolute m-auto top-0 bottom-0 bg-transparent pointer-events-none z-10`} />
                                            <input type="range" min="0" max="1000" defaultValue={1000} name="priceMaxSlider" ref={sliderTwoRef} onChange={() => { rangeLogicHandler("priceMaxSlider") }} className={`range-custom w-full outline-none absolute m-auto top-0 bottom-0 bg-transparent pointer-events-none`} />
                                        </div>

                                        <div data-numberinputforslider className="flex mt-[16px] ">
                                            <input type="number" defaultValue={0} min={0} max={1000} placeholder="Min" ref={minNumberRef} onChange={(event) => numberInputHandler(Number(event.target.value), "Min")} />
                                            <div className="outline-pink-500 outline">&mdash;</div>
                                            <input type="number" defaultValue={1000} min={0} max={1000} placeholder="Max" ref={maxNumberRef} onChange={(event) => numberInputHandler(Number(event.target.value), "Max")} />
                                        </div>
                                        <div className="mt-[32px]">
                                            <button type="button" onClick={applyRangeFilter} className="mr-[32px] px-[24px] py-[16px] rounded-lg text-primary bg-violet-200 font-semibold">Apply</button>
                                            <button type="button" onClick={cancelRangeFilter} className="font-semibold">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </li>

                            <li className="relative px-[16px]">
                                <button className="text-[18px] font-bold hover:text-black focus:text-black" onClick={showRatingListHandler}>Rating <span className="align-text-top">&#8964;</span></button>
                                <div className={`p-[16px] absolute top-[150%] -left-[16px] bg-white ${zActive.ratingZActive ? "z-10" : "hidden"} border rounded-md`}>
                                    <form onInput={(event) => filterFormInputHandler(event)}>
                                        <div className="flex item-center"><input type="checkbox" name="rating" className="h-[1rem] aspect-square self-center" data-bottom-value="1" data-top-value="2" /><label htmlFor="twoTop" className="font-semibold ml-[12px] text-[1rem] mr-[16px]">1-2<span className="material-symbols-outlined align-text-bottom">grade</span></label></div>
                                        <div className="mt-[16px] flex item-center"><input type="checkbox" name="rating" className="h-[1rem] aspect-square self-center" data-bottom-value="2" data-top-value="3" /><label htmlFor="threeTop" className="font-semibold ml-[12px] text-[1rem]">2-3<span className="material-symbols-outlined align-text-bottom">grade</span></label></div>
                                        <div className="mt-[16px] flex item-center"><input type="checkbox" name="rating" className="h-[1rem] aspect-square self-center" data-bottom-value="3" data-top-value="4" /><label htmlFor="fourTop" className="font-semibold ml-[12px] text-[1rem]">3-4<span className="material-symbols-outlined align-text-bottom">grade</span></label></div>
                                        <div className="mt-[16px] flex item-center"><input type="checkbox" name="rating" className="h-[1rem] aspect-square self-center" data-bottom-value="4" data-top-value="5" /><label htmlFor="fiveTop" className="font-semibold ml-[12px] text-[1rem]">4-5<span className="material-symbols-outlined align-text-bottom">grade</span></label></div>
                                    </form>
                                </div>
                            </li>

                            <li className="relative px-[16px]">
                                <button className="text-[18px] font-bold hover:text-black focus:text-black" onClick={showStockListHandler}>Stock <span className="align-text-top">&#8964;</span></button>
                                <div className={`p-[16px] absolute top-[150%] -left-[16px] bg-white ${zActive.stockZActive ? "z-10" : "hidden"} border rounded-md`}>
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