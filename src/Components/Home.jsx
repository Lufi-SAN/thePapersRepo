import { useState, useRef } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom"
import Card from "./Card"
import FilterForm from "./FilterForm"
import fewerProducts from "../Utilities/fewerProducts"
import { Link } from "react-router-dom";

function Home() {
    console.log("Outlet Context:", useOutletContext());
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
                    URLFilterParameter.delete(event.target.name)
                    URLFilterParameter.append(event.target.name, `${event.target.dataset.value}-5`)
                    returnObject = Object.assign(URLFilterParameter, prevFilterParams)
                    break;
                case "stock":
                    URLFilterParameter.delete(event.target.name)
                    URLFilterParameter.append(event.target.name, `${event.target.dataset.downValue}-${event.target.dataset.upValue}`)
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
    const applyButtonRef = useRef(null)
    const [priceErrorMessage, setPriceErrorMessage] = useState(false)

    function rangeLogicHandler(id) {
        applyRangeButtonDisplayControls()
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
        applyRangeButtonDisplayControls()
        if (!minNumberRef.current.value || !maxNumberRef.current.value) {
            applyButtonRef.current.disabled = true
            applyButtonRef.current.classList.add("greyscaleapplybutton")
            setPriceErrorMessage(true)
        }
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

    function applyRangeButtonDisplayControls() {
        applyButtonRef.current.disabled = false
        applyButtonRef.current.classList.remove("greyscaleapplybutton")
        setPriceErrorMessage(false)
    }

    function resetButtonHandler(type) {
        setFilterParameter((prevFilterParams) => {
            let returnObject;
            URLFilterParameter.delete(type)
            returnObject = Object.assign(URLFilterParameter, prevFilterParams)
            return returnObject
        })
    }

    //Filter config 
    const filters = {
        category: filterParameter.getAll("category"),
        price: filterParameter.get("price")?.split('-') || [],
        rating: filterParameter.get("rating")?.split('-') || [],
        stock: filterParameter.get("stock") ? filterParameter.get("stock").split("-").map((item) => Number(item)) : []

    }
    // rating: filterParameter.getAll("rating").length !== 0 ? Array.from(new Set(Array.from(filterParameter.getAll("rating")).join().split("-").join(",").split(","))) : []
    // Above was my method for chnaging the 4-5/2-3/etc. to a sorted array with no repeated numbers. I'm keeping it in here cause its cool 
    // This was the filter config: const matchesRating = filters.rating.length !== 0 ? filters.rating[0] <= product.rating.rate <= filters.rating[filters.rating.length - 1] : true;


    //Function to filter the products array according to filter config 
    const filterProducts = (products, filters) => {
        return products.filter(product => {
            const matchesCategory = filters.category.length !== 0 ? filters.category.includes(product.category) : true;
            const matchesPrice = filters.price.length !== 0 ? filters.price[0] <= product.price && product.price <= filters.price[1] : true;
            const matchesRating = filters.rating.length !== 0 ? filters.rating[0] <= product.rating.rate && product.rating.rate <= filters.rating[filters.rating.length - 1] : true;
            const matchesStock = filters.stock.length !== 0 ? filters.stock[0] <= product.rating.stock && product.rating.stock <= filters.stock[1] : true;

            return matchesCategory && matchesPrice && matchesRating && matchesStock;
        })
    }

    //End array for use in UI
    const filteredComponentProductsData = filterParameter ? filterProducts(componentProductsData, filters) : componentProductsData

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
                        
                        <div className="bg-gray-50 flex flex-col justify-center">
                            <div className="p-[30px]">
                                <p className="font-bold text-[36px] lg:text-[60px] mb-[24px]">It&apos;s shiny cause it&apos;s good for you</p>
                                <p className="leading-normal text-gray-600 mb-[24px] text-[18px] md:text-[20px]">If a ring is a piece of jewellery I&apos;ll be wearing for the rest of my life, a minimum 10k investment isn&apos;t insane in the grand scheme of things</p>
                                <button type="button" className="text-[18px] py-[16px] px-[48px] text-white bg-primaryLight font-bold rounded-lg hover:bg-primary">Shop Jewelry</button>
                            </div>
                        </div>

                        <div>
                            <img src="/TheOneRing_1280.jpg" alt="A ring of great power" srcSet="/TheOneRing_500.jpg 500w, /TheOneRing_768.jpg 768w, /TheOneRing_1280.jpg 1280w" className="w-[100%] aspect-[0.67] object-cover " />
                        </div>
                    </div>
                </section>

                <section aria-labelledby="Product List" className="pt-[96px]">
                    <div className="pl-[16px] pr-[16px] flex items-baseline justify-between"><h2 id="Product List" className="text-[24px] md:text-[30px] font-bold">Our Products</h2><div className="text-blue-400 lg:hidden hover:underline"><Link to='/cart'>See All</Link><span class="material-symbols-outlined">
arrow_forward
</span></div>
                    </div>
                    <div className="hidden lg:flex pt-[8px] text-gray-500 pl-[16px]">
                        <button aria-controls="filterBoxDiv" onClick={showFilterDiv} className="text-primary text-[18px] font-bold">Filters <span className="align-text-top material-symbols-outlined"> { isFilterBoxExpanded ? 'arrow_drop_up' : 'arrow_drop_down'} </span></button>

                        <ul className="me-0 ms-auto flex divide-x accent-primary" role="Filter Options">

                            <li className="relative px-[16px]">
                                <FilterForm buttonClasses={"text-[18px] font-bold hover:text-black "} 
                                buttonOnClick={showCategoryListHandler} buttonText={"Category"} 
                                spanClasses={"align-text-top material-symbols-outlined"} spanText={`${ zActive.categoryZActive ? 'arrow_drop_up' : 'arrow_drop_down'}`} 
                                divClasses={`p-[16px] absolute top-[150%] bg-white ${zActive.categoryZActive ? "z-10" : "hidden"} border rounded-md`} 
                                formOnInput={(event) => filterFormInputHandler(event)} formClasses={null}>
                                <div className="flex item-center mt-[8px]">
                                            <input type="checkbox" name="category" id="mensClothing" 
                                            data-value="men's clothing" className="h-[1rem] aspect-square" />
                                            <label htmlFor="mensClothing" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">
                                            men&apos;s clothing</label></div>
                                        <div className="flex item-center mt-[24px]"><input type="checkbox" name="category" id="electronics" data-value="electronics" className="h-[1rem] aspect-square" /><label htmlFor="electronics" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">electronics</label></div>
                                        <div className="flex item-center mt-[24px]"><input type="checkbox" name="category" id="jewelry" data-value="jewelery" className="h-[1rem] aspect-square" /><label htmlFor="jewelry" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">jewelery</label></div>
                                        <div className="flex item-center mt-[24px] mb-[8px]"><input type="checkbox" name="category" id="womensClothing" data-value="women's clothing" className="h-[1rem] aspect-square" /><label htmlFor="womensClothing" className="ml-[12px] pr-[24px] align-text-top whitespace-nowrap font-semibold">women&apos;s clothing</label></div>
                                </FilterForm>
                            </li>

                            <li className="relative px-[16px]">    
                                <FilterForm buttonClasses={"text-[18px] font-bold hover:text-black"} 
                                buttonOnClick={showPriceListHandler} buttonText={"Price"} 
                                spanClasses={"align-text-top material-symbols-outlined"} spanText={`${ zActive.priceZActive ? 'arrow_drop_up' : 'arrow_drop_down'}`} 
                                divClasses={`p-[16px] absolute top-[150%] -left-[16px] bg-white ${zActive.priceZActive ? "z-10" : "hidden"} border rounded-md`} 
                                formOnInput={null} formClasses={"whitespace-nowrap"}>
                                        <div data-slider-container className="relative pb-[32px]">
                                            <div data-slider-track className="w-full h-[5px] absolute m-auto top-0 bottom-0 rounded-[5px] bg-primary" ref={sliderTrackRef}></div>
                                            <input type="range" min="0" max="1000" defaultValue={0} name="priceMinSlider" ref={sliderOneRef} onChange={() => { rangeLogicHandler("priceMinSlider") }} className={`range-custom w-full outline-none absolute m-auto top-0 bottom-0 bg-transparent pointer-events-none z-10`} />
                                            <input type="range" min="0" max="1000" defaultValue={1000} name="priceMaxSlider" ref={sliderTwoRef} onChange={() => { rangeLogicHandler("priceMaxSlider") }} className={`range-custom w-full outline-none absolute m-auto top-0 bottom-0 bg-transparent pointer-events-none`} />
                                        </div>

                                        <div data-numberinputforslider className="flex mt-[16px] ">
                                            <input type="number" defaultValue={0} min={0} max={1000} placeholder="Min" ref={minNumberRef} onChange={(event) => numberInputHandler(Number(event.target.value), "Min")} className="border border-gray-300 rounded p-[8px]" />
                                            <div className="px-[8px] flex justify-center items-center">&ndash;</div>
                                            <input type="number" defaultValue={1000} min={0} max={1000} placeholder="Max" ref={maxNumberRef} onChange={(event) => numberInputHandler(Number(event.target.value), "Max")} className="border border-gray-300 rounded p-[8px]" />
                                        </div>
                                        <div className="mt-[24px]">
                                            <button type="button" onClick={applyRangeFilter} className="mr-[32px] px-[24px] py-[16px] rounded-lg text-primary bg-violet-200 font-semibold" ref={applyButtonRef}>Apply</button>
                                            <button type="button" onClick={cancelRangeFilter} className="font-semibold">Cancel</button>
                                            {priceErrorMessage && <p className="text-red-500 font-semibold mt-[8px] whitespace-normal leading-[1.5]">PLease input a numeric value between the range of 0 to 1000</p>}
                                        </div>
                                </FilterForm>
                            </li>

                            <li className="relative px-[16px]">
                                <FilterForm buttonClasses={"text-[18px] font-bold hover:text-black"} buttonOnClick={showRatingListHandler}
                                buttonText={"Rating"} spanClasses={"align-text-top material-symbols-outlined"} spanText={`${ zActive.ratingZActive ? 'arrow_drop_up' : 'arrow_drop_down'}`}
                                divClasses={`p-[16px] absolute top-[150%] -left-[16px] bg-white ${zActive.ratingZActive ? "z-10" : "hidden"} border rounded-md`}
                                formOnInput={(event) => filterFormInputHandler(event)} formClasses={"whitespace-nowrap"}>
                                        <div className="flex item-center"><input type="radio" name="rating" className="h-[1rem] aspect-square self-center" id="value4" data-value="4" /><label htmlFor="value4" className="font-semibold ml-[12px] text-[1rem] mr-[16px]"><span className="material-symbols-outlined align-text-bottom">grade</span><span className="material-symbols-outlined align-text-bottom">grade</span><span className="material-symbols-outlined align-text-bottom">grade</span><span className="material-symbols-outlined align-text-bottom">grade</span><span> & above</span></label></div>
                                        <div className="mt-[16px] flex item-center"><input type="radio" name="rating" className="h-[1rem] aspect-square self-center" id="value3" data-value="3" /><label htmlFor="value3" className="font-semibold ml-[12px] text-[1rem]"><span className="material-symbols-outlined align-text-bottom">grade</span><span className="material-symbols-outlined align-text-bottom">grade</span><span className="material-symbols-outlined align-text-bottom">grade</span><span> & above</span></label></div>
                                        <div className="mt-[16px] flex item-center"><input type="radio" name="rating" className="h-[1rem] aspect-square self-center" id="value2" data-value="2" /><label htmlFor="value2" className="font-semibold ml-[12px] text-[1rem]"><span className="material-symbols-outlined align-text-bottom">grade</span><span className="material-symbols-outlined align-text-bottom">grade</span><span> & above</span></label></div>
                                        <div className="mt-[16px] flex item-center"><input type="radio" name="rating" className="h-[1rem] aspect-square self-center" id="value1" data-value="1" /><label htmlFor="value1" className="font-semibold ml-[12px] text-[1rem]"><span className="material-symbols-outlined align-text-bottom">grade</span><span> & above</span></label></div>
                                        <button type="reset" className="mt-[16px] px-[24px] py-[16px] rounded-lg text-primary bg-violet-200 font-semibold" onClick={() => resetButtonHandler("rating")}>Reset</button>
                                </FilterForm>
                            </li>

                            <li className="relative px-[16px]">
                                <FilterForm buttonClasses={"text-[18px] font-bold hover:text-black"} buttonOnClick={showStockListHandler}
                                buttonText={"Stock"} spanClasses={"align-text-top material-symbols-outlined"} spanText={`${ zActive.stockZActive ? 'arrow_drop_up' : 'arrow_drop_down'}`}
                                divClasses={`p-[16px] absolute top-[150%] -left-[16px] bg-white ${zActive.stockZActive ? "z-10" : "hidden"} border rounded-md`}
                                formOnInput={(event) => filterFormInputHandler(event)} formClasses={"whitespace-nowrap"}>
                                        <div className="flex item-center"><input type="radio" name="stock" id="under250" data-down-value={0} data-up-value={249} /><label htmlFor="under250">0-249</label></div>
                                        <div className="mt-[16px] flex item-center"><input type="radio" name="stock" id="under500" data-down-value={250} data-up-value={499} /><label htmlFor="under500">250-499</label></div>
                                        <div className="mt-[16px] flex item-center"><input type="radio" name="stock" id="toInfinity" data-down-value={500} data-up-value="Infinity" /><label htmlFor="toInfinity">500+</label></div>
                                        <button type="reset" className="mt-[16px] px-[24px] py-[16px] rounded-lg text-primary bg-violet-200 font-semibold" onClick={() => resetButtonHandler("stock")}>Reset</button>
                                </FilterForm>
                            </li>
                        </ul>
                    </div>

                    {
                        isFilterBoxExpanded && <div role="Product Filters" id="filterBoxDiv" aria-expanded={isFilterBoxExpanded} className="hidden lg:flex" >
                            <p>Filters</p>
                        </div>
                    }

                    <div className="mt-[16px] px-[16px] pt-[16px] pb-[128px] hidden lg:grid lg:grid-cols-[repeat(4,_minmax(0,_1fr))] lg:gap-x-[24px] lg:gap-y-[48px] bg-white">
                        {filteredComponentProductsData.map((product) => <Card category={product.category} title={product.title} price={product.price} image={product.image}
                         key={product.id} 
                         classNames={{ blendDiv: "bg-gray-100 rounded rounded-[5%] hover:grayscale-[50%]", picture: 'w-[100%] aspect-[.67] object-contain mix-blend-multiply', 
                         pictureDiv: 'rounded rounded-[5%] overflow-hidden', mainDiv: "flex flex-col text-center bg-white text-[18px] hover:cursor-pointer", 
                         firstP: "text-gray-400 mt-[24px] mb-[4px] capitalize", secondP:"font-semibold mb-[7px]", thirdP: "mb-[4px]" }} />)}
                    </div>

                    <div className="mt-[16px] px-[16px] pt-[16px] pb-[128px] flex lg:hidden overflow-x-scroll">
                        {
                            fewerProducts(filteredComponentProductsData).map((product) => <Card title={product.title} image={product.image}
                            key={product.id}
                            classNames={{mainDiv: "group h-[200px] w-[175px] mr-[24px] relative hover:w-[400px] transition-all duration-300", 
                            mobileText: "whitespace-nowrap overflow-hidden text-ellipsis absolute top-[75%] w-[175px]",
                            blendDiv: "bg-gray-100 h-[100%] overflow-hidden rounded-[5%]", pictureDiv: "overflow-hidden h-[100%] group-hover:overflow-visible",
                            picture: "w-[100%] object-contain mix-blend-multiply h-[100%] group-hover:backdrop-blur-xs"
                            }}
                            
                            />)
                            // style={{ backgroundImage: `url(${product.image})` }} bg-contain bg-no-repeat bg-center
                        }
                    </div>
                </section>

                <section aria-label="About page link">
                    <div className="shordy">
                            <div className="mx-auto">
                                <p className="font-bold text-[36px] lg:text-[60px] text-center mb-[32px] pt-[256px]">Want to connect with us further?</p>
                                <p className="text-center mb-[32px]">Get to know about us. We are a blah blah blah blah blah</p>
                                <div className="pb-[128px]"><button className="block mx-auto text-[18px] py-[16px] px-[48px] text-white bg-primaryLight font-bold rounded-lg hover:bg-primary ">About us</button></div>
                            </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Home