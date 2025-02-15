import { useOutletContext, Link } from "react-router-dom";
import Card from "./Card";

export default function MobileGrid() {
        const { componentProductsData } = useOutletContext();
        console.log(componentProductsData)
    
    return (
    <div className="mt-[16px] px-[16px] pt-[16px] pb-[128px] grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-x-[24px] gap-y-[48px] bg-white">
        {componentProductsData.map((product) => <Link to={`/product/${product.id}`} key={product.id}><Card category={product.category} title={product.title} price={product.price} image={product.image}
                                 classNames={{ blendDiv: "bg-gray-100 rounded rounded-[5%] hover:grayscale-[50%]", picture: 'w-[100%] aspect-[.67] object-contain mix-blend-multiply', 
                                 pictureDiv: 'rounded rounded-[5%] overflow-hidden', mainDiv: "flex flex-col text-center bg-white text-[18px] hover:cursor-pointer", 
                                 firstP: "hidden", secondP:"mt-[8px] font-semibold mb-[7px]  max-h-[80px] min-h-[80px] overflow-hidden text-ellipsis ", thirdP: "mb-[4px]", mobileText: "hidden" }} /></Link>)}
    </div>
    )
}