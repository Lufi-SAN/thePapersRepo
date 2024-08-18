import { useOutletContext, useSearchParams } from "react-router-dom"
import Carousel from "./Carousel.jsx"

function Home() {
    const [componentProductsData] = useOutletContext();
    const [filterParameter, setFilterParameter] = useSearchParams();
    console.log(filterParameter)

    return (
        <>

            <div>Sup</div>
            <div className="flex">
                <div className="flex ">

                </div>
                <div>
                    <Carousel />
                </div>
            </div>
        </>
    )
}
// Grid goes here, it depends on the product array which can be filtered or not, we have the newsletter form & Carousel* & aside for hiring, maybe testimonials
// and an extra banner; We change the url params here(function to change the url params)
// Won't be full width; Can do with auto margins + max-width, flex or grid entire thing
// We'll filter here i guess
export default Home