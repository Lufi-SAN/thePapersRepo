import { useState, Suspense, useRef } from "react"
import { createPortal } from "react-dom";
import { Outlet, NavLink, Await, useLoaderData, useLocation } from "react-router-dom"
import MobileMenu from "./MobileMenu";
import { useMediaQuery } from 'react-responsive';
import LoadingPage from "./LoadingPage";

function Layout() {
    const componentProductsData = useLoaderData();
    const [cartCounter, setCartCounter] = useState([])
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false) 
    const bodyOverflowAffector = useRef(null)

    let colors = ["text-primary", "text-white"];
    let textcolor, textcolor2;
    if (location.pathname !== "/cart") {
        [textcolor, textcolor2] = colors
    } else {
        [textcolor2, textcolor] = colors
    }

    const isMobile = useMediaQuery({ maxWidth: 1023 });
    const isLaptop = useMediaQuery({ minWidth: 1024 });

    return (
        <>
            <div ref={bodyOverflowAffector}>
            <header className="sticky top-0 z-[555]" role="header">
                <nav className="flex w-full px-6 py-6 border-b border-b-slate-200 bg-white justify-between items-center lg:justify-normal">
                    <h1 className={`text-[30px] lg:text-[36px] font-extrabold text-primary font-azeret ${textcolor}`} aria-label="Company Logo">the<span className={`inline-block py-1 bg-primary ${textcolor2}`}>papers</span></h1>
                    { isMobile && <div className="mr-0"><button onClick={() => setMenuOpen(true)}><span className="material-symbols-outlined">menu</span></button></div>}
                    { menuOpen && createPortal(<MobileMenu overlayClickHandler={() => setMenuOpen(false)} bodyAffector={bodyOverflowAffector} />, document.body)}
                    { isLaptop && <ul className="me-0 ms-auto text-gray-500 navul flex" role="navigation">
                        <li className="flex items-center"><NavLink to="/">About</NavLink></li>
                        <li className="flex items-center"><NavLink to="/">Home</NavLink></li>
                        <li className="flex items-center"><NavLink to="/">GHub</NavLink></li>
                        <li className="flex items-center gap-x-1"><NavLink to="cart" className="flex items-center h-full"><svg className="h-8 aspect-square" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg><p>{cartCounter.length}</p>
                        </NavLink></li>
                    </ul>}
                </nav>
            </header>
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={componentProductsData.productsData}>
                    {(componentProductsData) => {
                        console.log(componentProductsData);
                        return (
                            <main>
                                <Outlet context={{ cartCounter, setCartCounter, componentProductsData, location }} />
                            </main>
                        )
                    }}
                </Await>
            </Suspense>
            <footer role="footer"></footer>
            </div>
        </>
    )
}

export default Layout
// filtering array goes here, it depends on the url params, the url params get changed in Home; Guess we use urlparams as context??
// Check for a change?? Then alter the array
// Cart is an array independent of products. Maybe we use them in tow? Product details will be a dynamic segment path; With links from Home?
