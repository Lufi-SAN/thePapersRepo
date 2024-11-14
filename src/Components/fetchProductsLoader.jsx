import { defer } from "react-router-dom";
import fetchProductDataFunction from "../Utilities/fetchProductDataFunction";

export function fetchProductsLoader({ request }) {
    let requestURL = new URL(request.url);
    let productsData = fetchProductDataFunction();
    return defer({ productsData, requestURL });
}
