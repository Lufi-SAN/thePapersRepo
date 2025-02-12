export default function numberInputHandler(value, inputID, applyRangeButtonDisplayControls, minNumberRef, maxNumberRef, applyButtonRef, setPriceErrorMessage) {
        applyRangeButtonDisplayControls(applyButtonRef, setPriceErrorMessage)
        if (!minNumberRef.current.value || !maxNumberRef.current.value) {
            applyButtonRef.current.disabled = true
            applyButtonRef.current.classList.add("greyscaleapplybutton")
            setPriceErrorMessage(true)
        }
        const min = 0;

        if (inputID === "Min") {
            if (value >= maxNumberRef.current.value) {
                minNumberRef.current.value = Number(maxNumberRef.current.value) - min
            }
        } else if (inputID === "Max") {
            if (value <= minNumberRef.current.value) {
                maxNumberRef.current.value = Number(minNumberRef.current.value) + min
            }
        }
    }