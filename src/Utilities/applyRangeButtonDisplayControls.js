export default function applyRangeButtonDisplayControls(applyButtonRef, setPriceErrorMessage) {
    applyButtonRef.current.disabled = false
    applyButtonRef.current.classList.remove("greyscaleapplybutton")
    setPriceErrorMessage(false)
}