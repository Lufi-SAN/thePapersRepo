import { defer } from "react-router-dom";
import fetchProductDataFunction from "../Utilities/fetchProductDataFunction";

export function fetchProductsLoader({ request, params }) {
    let requestURL = new URL(request.url);
    console.log(`request:${request} & URL: ${requestURL} & params:${params}`)
    let productsData = fetchProductDataFunction();
    return defer({ productsData, requestURL });
}
