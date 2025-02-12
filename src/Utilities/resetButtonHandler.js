export default function resetButtonHandler(type, location, setFilterParameter) {
    const URLFilterParameter = new URLSearchParams(location.search)
    setFilterParameter((prevFilterParams) => {
        let returnObject;
        URLFilterParameter.delete(type)
        returnObject = Object.assign(URLFilterParameter, prevFilterParams)
        return returnObject
    })
}