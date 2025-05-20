export default async function fetchProductDataFunction() {
    let response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        // console.log("Network error");
        throw { error: "Network Error", message: "We couldn't reach the server. Please check your connection" }
    }
    let data = await response.json();
    return data
}