import { useOutletContext } from "react-router-dom"
import cartButtonHandler from "../Utilities/cartButtonHandler"

function Cart() {
    let {cartCounter, setCartCounter, componentProductsData} = useOutletContext()
    console.log(cartCounter)
    return <>
        <div>
            {cartCounter.length}
        </div>
    </>
    
}

export default Cart