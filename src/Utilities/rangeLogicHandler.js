export default function rangeLogicHandler(id , sliderOneRef, sliderTwoRef, minNumberRef, maxNumberRef, sliderTrackRef, applyRangeButtonDisplayControls, applyButtonRef, setPriceErrorMessage) {
    applyRangeButtonDisplayControls(applyButtonRef, setPriceErrorMessage)
    const minGap = 0;
    const sliderOneValue = ((parseInt(sliderOneRef.current.value) / 1000) * 100)
    const sliderTwoValue = ((parseInt(sliderTwoRef.current.value) / 1000) * 100)

    if (sliderTwoRef.current.value === 0) {
        sliderTwoRef.current.style.zIndex = 1000;
    } else {
        sliderTwoRef.current.style.zIndex = 0;
    }

    if (id === sliderOneRef.current.name) {
        if (parseInt(sliderTwoRef.current.value) - parseInt(sliderOneRef.current.value) <= minGap) {
            sliderOneRef.current.value = parseInt(sliderTwoRef.current.value) - minGap;
        }
    } else {
        if (parseInt(sliderTwoRef.current.value) - parseInt(sliderOneRef.current.value) <= minGap) {
            sliderTwoRef.current.value = parseInt(sliderOneRef.current.value) + minGap;
        }
    }

    minNumberRef.current.value = sliderOneRef.current.value;
    maxNumberRef.current.value = sliderTwoRef.current.value;
    sliderTrackRef.current.style.background = `linear-gradient(to right, #e5e7eb ${sliderOneValue}%, #8b5cf6 ${sliderOneValue}% ${sliderTwoValue}%, #e5e7eb ${sliderTwoValue}%)`
}