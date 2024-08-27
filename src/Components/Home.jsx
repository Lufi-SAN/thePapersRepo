import { useEffect, useRef, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom"

function Home() {
    const [componentProductsData] = useOutletContext();

    const [isFilterExpanded, setisFilterExpanded] = useState(false)
    const filterRef = useRef(null)

    const [filterParameter, setFilterParameter] = useSearchParams();
    console.log(filterParameter)

    function showFilterDiv() {
        setisFilterExpanded((prev) => !prev)
    }

    return (
        <>
            <div className="lg:mx-6">
                <section className="flex flex-col" aria-label="Store Offers">
                    <ul className="grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 order-last lg:order-first">
                        <li className="p-6 text-center border-b-[1px] border-b-gray-100 lg:border-r-2 lg:border-r-gray-100">
                            <p className="text-gray-400 mb-2">Download the app</p>
                            <p className="">Get an exclusive &#8358;1500 off code</p>
                        </li>
                        <li className="p-6 text-center border-b-[1px] border-b-gray-100 lg:border-r-2 lg:border-r-gray-100">
                            <p className="text-gray-400 text-center mb-2">Return when you&apos;re ready</p>
                            <p className="text-center">60 days of free returns</p>
                        </li>
                        <li className="p-6 text-center border-b-[1px] border-b-gray-100">
                            <p className="text-gray-400 mb-2">Sign up for our newsletter</p>
                            <p>15% off your first order</p>
                        </li>
                    </ul>
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 ">
                        <div className="pt-[96px] p-[48px] w-auto lg:py-[256px] lg:pl-[32px] lg:pr-[48px] bg-gray-50">
                            <p className="font-bold text-[36px] lg:text-[48px] mb-[32px]">It&apos;s shiny cause it&apos;s good for you</p>
                            <p className="leading-normal text-gray-600 mb-[32px] text-[18px] lg:text-[20px]">If a ring is a piece of jewellery I&apos;ll be wearing for the rest of my life, a minimum 10k investment isn&apos;t insane in the grand scheme of things</p>
                            <button type="button" className="text-[18px] py-[16px] px-[48px] text-white bg-primaryLight hover:bg-primary focus:bg-primary font-bold rounded-lg">Shop Jewelry</button>
                        </div>
                        <div>
                            <img src="/TheOneRing_1280.jpg" alt="A ring of great power" srcSet="/TheOneRing_500.jpg 500w, /TheOneRing_768.jpg 768w, /TheOneRing_1280.jpg 1280w" className="h-[100%] object-cover" />
                        </div>
                    </div>
                </section>

                <section aria-labelledby="Product List" className="mt-[64px]">
                    <h2 id="Product List" className="text-[30px]">Our Products</h2>
                    <div className="w-full bg-gray-50 mt-[8px] py-[8px] pl-[8px]"><button aria-controls="filterDiv" onClick={showFilterDiv} className="text-primary px-[16px] py-[4px] border border-primary rounded-lg">Sort</button></div>
                    <div role="Product Filter" id="filterDiv" aria-expanded={isFilterExpanded} className={`${isFilterExpanded ? "hidden" : ""} flex`} ref={filterRef}>
                        Hello
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