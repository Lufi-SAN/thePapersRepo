import { useState, Suspense, useRef } from "react"
import { createPortal } from "react-dom";
import { Outlet, NavLink, Await, useLoaderData, useLocation, Link, ScrollRestoration } from "react-router-dom"
import MobileMenu from "./MobileMenu";
import { useMediaQuery } from 'react-responsive';
import LoadingPage from "./LoadingPage";

function Layout() {
    const componentProductsData = useLoaderData()
    const [cartCounter, setCartCounter] = useState([])
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false) 
    const bodyOverflowAffector = useRef(null)
    const [filterPortal, setFilterPortal] = useState(false)

    let colors = ["text-primary", "text-white"];
    let textcolor, textcolor2, reducedNav, fullNav = true;
    if (location.pathname !== "/cart") {
        [textcolor, textcolor2] = colors
    } else {
        [textcolor2, textcolor] = colors
    }

    if (location.pathname.startsWith("/product")) {
        fullNav = false; reducedNav = true;
    } else {
        fullNav = true; reducedNav = false;
    }


    const isMobile = useMediaQuery({ maxWidth: 1023 });
    const isLaptop = useMediaQuery({ minWidth: 1024 });

    return (
        <>
            <div ref={bodyOverflowAffector}>
            <header className="sticky top-0 z-[555]" role="header">
                {fullNav && <FullNav textcolor={textcolor} textcolor2={textcolor2} isMobile={isMobile} setMenuOpen={setMenuOpen} menuOpen={menuOpen} isLaptop={isLaptop}  
                bodyOverflowAffector={bodyOverflowAffector} cartCounter={cartCounter}/> }
            {reducedNav && <ReducedNav location={location} filterPortalSetter={setFilterPortal}/>}
            </header>
            <Suspense fallback={<LoadingPage />}>
                <Await resolve={componentProductsData.productsData}>
                    {(componentProductsData) => {
                        return (
                            <main>
                                <Outlet context={{ cartCounter, setCartCounter, componentProductsData, location, bodyOverflowAffector, filterPortal, setFilterPortal }} />
                            </main>
                        )
                    }}
                </Await>
            </Suspense>
            <footer role="footer"></footer>
            <ScrollRestoration getKey={(location, matches) => { return location.pathname }} />
            </div>
        </>
    )
}

function FullNav ({textcolor, textcolor2, isMobile, setMenuOpen, menuOpen, isLaptop, cartCounter, bodyOverflowAffector}) {
    const ulclass = "me-0 ms-auto text-gray-500 navul flex";
    const liobject = {
        lione: {
            clazz: "flex items-center",
            link: "/",
            span: "hidden",
            spanName: null
        },
        litwo: {
            clazz: "flex items-center",
            link: "/",
            span: "hidden",
            spanName: null
        },
        lithree: {
            clazz: "flex items-center",
            link: "/",
            span: "hidden",
            spanName: null
        },
        lifour: {
            clazz: "flex items-center",
            link: "cart"
        },
        lifive: {
            clazz: "hidden",
            link: ""
        }
    }
    const carticonclass = "flex items-center h-full";
    const svgclass = "h-8 aspect-square"

    
    return( 
    <>
        <nav className="flex w-full px-6 py-6 border-b border-b-slate-200 bg-white justify-between items-center lg:justify-normal">
            <h1 className={`text-[30px] lg:text-[36px] font-extrabold text-primary font-azeret ${textcolor}`} aria-label="Company Logo">the<span className={`inline-block py-1 bg-primary ${textcolor2}`}>papers</span></h1>
            { isMobile && <div className="mr-0"><button onClick={() => setMenuOpen(true)}><span className="material-symbols-outlined">menu</span></button></div>}
            { menuOpen && createPortal(<MobileMenu overlayClickHandler={() => setMenuOpen(false)} bodyAffector={bodyOverflowAffector} />, document.body)}
            { isLaptop &&  <NavbarList ulclass={ulclass} liobject={liobject} cartCounter={cartCounter} carticonclass={carticonclass} svgclass={svgclass}/>}
        </nav>
    </>
    )
}

function ReducedNav({ location, filterPortalSetter }) {
    const prevParams = location.state?.prevParams || ""
    const where = location.pathname === "/products" ? true : false    
    console.log(where)
    
    return(
    <>
    <nav className="flex w-full px-6 py-6 border-b border-b-slate-200 bg-white justify-between items-center">
                    <Link to={`..${prevParams}`} relative="path"><span className="material-symbols-outlined">arrow_back_ios</span></Link>
                    <button onClick={() => filterPortalSetter((prev) => !prev)} className={`${ location.pathname.startsWith("/products") ? 'block' : 'hidden'}`}><span className="material-symbols-outlined">filter_alt</span></button>
    </nav>
    </>
    )
}

export function NavbarList({ulclass, liobject, cartCounter="null", carticonclass="null", svgclass="null"}) {
    return (
        <>
            <ul className={ulclass} role="navigation">
            <li className={liobject.lione.clazz}><span className={liobject.lione.span}>{liobject.lione.spanName}</span><NavLink to={liobject.lione.link} className={liobject.lione.navlinkClass}>About</NavLink></li>
            <li className={liobject.litwo.clazz}><div><span className={liobject.litwo.span}>{liobject.litwo.spanName}</span></div><NavLink to={liobject.litwo.link} className={liobject.litwo.navlinkClass}>Home</NavLink></li>
            <li className={liobject.lithree.clazz}><div><span className={liobject.lithree.span}>{liobject.lithree.spanName}</span></div><NavLink to={liobject.lithree.link} className={liobject.lithree.navlinkClass}>GHub</NavLink></li>
            <li className={liobject.lifour.clazz}><NavLink to={liobject.lifour.link} className={carticonclass}><svg className={svgclass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg><p>{cartCounter.length}</p>
            </NavLink></li>
            <li className={liobject.lifive.clazz}><span className={liobject.lifive.span}>{liobject.lifive.spanName}</span><NavLink to={liobject.lifive.link} className={liobject.lifive.navlinkClass}>About</NavLink></li>
            </ul>
        </>
    )
}


export default Layout
// filtering array goes here, it depends on the url params, the url params get changed in Home; Guess we use urlparams as context??
// Check for a change?? Then alter the array
// Cart is an array independent of products. Maybe we use them in tow? Product details will be a dynamic segment path; With links from Home?
