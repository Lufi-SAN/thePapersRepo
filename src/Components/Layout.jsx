import { useState } from "react"
import { Outlet, Link, NavLink } from "react-router-dom"
import shoppingBasket from '../../public/shoppingBasket.svg'

function Layout() {
    const [cartCounter, setCartCounter] = useState(0)

    return (
        <>
            <div className="flex w-full px-6 py-6 border-b border-b-slate-200 bg-gray-100">
                <h1 className="text-[32px] font-bold">THE PAPERS</h1>
                <ul className="me-0 ms-auto flex">
                    <li className="flex items-center"><NavLink to="/">About</NavLink></li>
                    <li className="flex items-center gap-x-1"><NavLink to="cart" className="flex items-center h-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg><p className="p-1 rounded-lg">{cartCounter}</p>
                    </NavLink></li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}

export default Layout

