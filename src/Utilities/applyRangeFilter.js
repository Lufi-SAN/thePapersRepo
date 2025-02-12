export default function applyRangeFilter(location, minNumberRef, maxNumberRef, setFilterParameter) {
    const newParams = new URLSearchParams(location.search)
    newParams.set('price', `${minNumberRef.current.value}-${maxNumberRef.current.value}`)
    setFilterParameter(newParams);
}