import { useRef, useEffect } from "react"
import { NavbarList } from "./Layout";

export default function MobileMenu({ overlayClickHandler, bodyAffector }) {
    const menuRef = useRef(null)
    const ulclass = "flex flex-col text-gray-500 "
    const liobject = {
        lione: {
            clazz: "text-[24px] pt-[16px] pb-[16px] flex border-b border-b-gray-300",
            link: "/about",
            span: "material-symbols-outlined text-[30px] pl-[0.75em] pr-[1em]",
            spanName: "info",
            navlinkClass: "leading-[30px] w-[100%]"
        },
        litwo: {
            clazz: "text-[24px] pt-[16px] pb-[16px] flex border-b border-b-gray-300",
            link: "/",
            span: "material-symbols-outlined text-[30px] pl-[0.75em] pr-[1em]",
            spanName: "home",
            navlinkClass: "leading-[30px] w-[100%]"
        },
        lithree: {
            clazz: "text-[24px] pt-[16px] pb-[16px] flex lithreemargin",
            link: "/",
            span: "fab fa-github text-primary text-[30px] pl-[0.75em] pr-[1em]",
            spanName: null,
            navlinkClass: "leading-[30px] w-[100%]"
        },
        lifour: {
            clazz: "hidden",
            link: ""
        },
        lifive: {
            clazz: "text-[24px] pt-[16px] pb-[16px] flex mb-[16px] border-t border-t-gray-300",
            link: "/cart",
            span: "material-symbols-outlined text-[30px] pl-[0.75em] pr-[1em]",
            spanName: "shopping_cart",
            navlinkClass: "leading-[30px] w-[100%]"
        }
    }
    

    useEffect(
        () => {
            bodyAffector.current.parentElement.parentElement.style.overflow = 'hidden';
        
            let menuSetter = setTimeout(
                () => {
                    menuRef.current.classList.remove("menuOut"),
                    menuRef.current.classList.add("menuIn")
                }, 0 
            )
            
            return () => {
                bodyAffector.current.parentElement.parentElement.style.overflow = 'visible';
                clearTimeout(menuSetter)
            }
        }, []
    )

    return <>
        <div className="text-[16px] bg-black/[.6] h-[100%] w-[100%] z-[1000] fixed top-0" onClick={() => { menuRef.current.classList.remove("menuIn"); menuRef.current.classList.add("menuOut"); setTimeout(overlayClickHandler, 300)}} >
            <div className={`bg-white w-[75%] h-[100%] fixed top-0 menuOut transition-[right] duration-[0.3s] ease-linear flex flex-col`} ref={menuRef} onClick={(event) => event.stopPropagation}>
                <div className="mx-[30%] bg-primary h-[2em] mt-[0.5em] mb-[1em]">

                </div>
                <div className="border-t border-t-gray-300">
                    <NavbarList ulclass={ulclass} liobject={liobject} />
                </div>
            </div>
        </div>
    </>
}