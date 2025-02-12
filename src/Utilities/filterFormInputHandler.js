export default function filterFormInputHandler(event, location, setFilterParameter) {
        event.preventDefault();
        const URLFilterParameter = new URLSearchParams(location.search);
        console.log(`${URLFilterParameter}`);
        setFilterParameter((prevFilterParams) => {
            const typeOfInput = event.target.name;
            let returnObject = { ...prevFilterParams };

            switch (typeOfInput) {
                case "category":
                    if (URLFilterParameter.has(event.target.name, event.target.dataset.value)) {
                        URLFilterParameter.delete(event.target.name, event.target.dataset.value)
                    } else {
                        URLFilterParameter.append(event.target.name, event.target.dataset.value)
                    }
                    returnObject = Object.assign(URLFilterParameter, prevFilterParams)
                    break;
                case "rating":
                    URLFilterParameter.delete(event.target.name)
                    URLFilterParameter.append(event.target.name, `${event.target.dataset.value}-5`)
                    returnObject = Object.assign(URLFilterParameter, prevFilterParams)
                    break;
                case "stock":
                    URLFilterParameter.delete(event.target.name)
                    URLFilterParameter.append(event.target.name, `${event.target.dataset.downValue}-${event.target.dataset.upValue}`)
                    returnObject = Object.assign(URLFilterParameter, prevFilterParams)
                    break;

            }

            return returnObject
        })

    }
    