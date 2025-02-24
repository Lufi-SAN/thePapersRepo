import { useRef, useEffect } from "react"

export default function MobileMenu({ overlayClickHandler, bodyAffector }) {
    const menuRef = useRef(null)
    
    // if (isMenuOpen) {
    //     menuRef.current.parentElement.getAttribute("overflow", "hidden")
    // } else {
    //     menuRef.current.parentElement.setAttribute("overflow", null)
    // }
    
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
        <div className="bg-black/[.6] h-[100%] w-[100%] z-[1000] fixed top-0" onClick={() => { menuRef.current.classList.remove("menuIn"); menuRef.current.classList.add("menuOut"); setTimeout(overlayClickHandler, 300)}} >
            <div className={`bg-white w-[75%] h-[100%] fixed top-0 menuOut transition-[right] duration-[0.3s] ease-linear `} ref={menuRef}>HELLO</div>
        </div>
    </>
}