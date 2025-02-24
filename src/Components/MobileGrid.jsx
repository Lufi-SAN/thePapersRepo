import { useOutletContext, Link } from "react-router-dom";
import Card from "./Card";
import { createPortal } from "react-dom";
import filterFormInputHandler from "../Utilities/filterFormInputHandler";
import { useRef, useEffect } from "react";

export default function MobileGrid() {
    const { componentProductsData, filterPortal, bodyOverflowAffector, setFilterPortal } = useOutletContext();
    console.log(componentProductsData)

    return (
    <>
    <div className="mt-[16px] px-[16px] pt-[16px] pb-[128px] grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-x-[24px] gap-y-[48px] bg-white">
        {componentProductsData.map((product) => <Link to={`/product/${product.id}`} key={product.id}><Card category={product.category} title={product.title} price={product.price} image={product.image}
                                 classNames={{ blendDiv: "bg-gray-100 rounded rounded-[5%] hover:grayscale-[50%]", picture: 'w-[100%] aspect-[.67] object-contain mix-blend-multiply', 
                                 pictureDiv: 'rounded rounded-[5%] overflow-hidden', mainDiv: "flex flex-col text-center bg-white text-[18px] hover:cursor-pointer", 
                                 firstP: "hidden", secondP:"mt-[8px] font-semibold mb-[7px]  max-h-[80px] min-h-[80px] overflow-hidden text-ellipsis ", thirdP: "mb-[4px]", mobileText: "hidden" }} /></Link>)}
    </div>
    { filterPortal && createPortal(<MGFilterCompnt bodyOverflowAffector={bodyOverflowAffector} overlayClickHandler={() => setFilterPortal(false)} />,document.body)}
    </>
    )
}

function MGFilterCompnt({ bodyOverflowAffector, overlayClickHandler }) {
    const menuGridRef = useRef(null)

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

    return (
        <div className="bg-black/[.6] h-[100%] w-[100%] z-[1000] fixed top-0" onClick={() => { menuGridRef.current.classList.remove("menuGridIn"); menuGridRef.current.classList.add("menuGridOut"); setTimeout(overlayClickHandler, 300)}} >
            <div className={`bg-white mx-[30px] fixed bottom-0 menuGridOut transition-[right] duration-[0.3s] ease-linear `} ref={menuGridRef}>
                <ul className="flex justify-between">
                    <li><button>Category</button></li>
                    <li><button>Price</button></li>
                    <li><button>Rating</button></li>
                    <li><button>Stock</button></li>
                </ul>
                <div className="flex">

                </div>
            
            </div>
        </div>
    )
}