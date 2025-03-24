import { Link } from "react-router-dom"

export default function Page404() {
    return (
    <>
        <div className="flex flex-col">
        <p>404</p>
        <p>Page not found</p>
        <p>Sorry, we couldn't find the page you're looking for</p>
        <Link><span class="material-symbols-outlined">arrow_back</span><p>Back to home</p></Link>
        </div>
    </>)
}