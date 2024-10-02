export default function Card({ image, category, title, price }) {
    return (
        <div className="flex flex-col text-center w-card-width bg-white pb-[24px]">
            <div className="bg-gray-500 rounded-md"><img src={image} alt={title} className="w-[100%] object-cover" /></div>
            <p>{category}</p>
            <p>{title}</p>
            <p>{price}</p>
        </div>
    )
}
// category
// : 
// "men's clothing"
// description
// : 
// "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
// id
// : 
// 1
// image
// : 
// "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
// price
// : 
// 109.95
// rating
// : 
// {rate: 3.9, count: 120}
// title
// : 
// "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
//0)_-