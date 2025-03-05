export default function scrollIntoViewHandler(elementRef) {
    if(elementRef.current) {
        elementRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
}