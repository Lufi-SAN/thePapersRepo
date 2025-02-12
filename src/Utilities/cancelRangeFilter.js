export default function cancelRangeFilter(location, setFilterParameter, minNumberRef, maxNumberRef, sliderOneRef, sliderTwoRef, sliderTrackRef) {
    const newParams = new URLSearchParams(location.search)
    newParams.delete("price");
    setFilterParameter(newParams)//I ended up with ?price = undefined in URL so I like it better this way
    minNumberRef.current.value = 0
    maxNumberRef.current.value = 1000
    sliderOneRef.current.value = 0
    sliderTwoRef.current.value = 1000
    sliderTrackRef.current.style.background = '#8b5cf6';
}