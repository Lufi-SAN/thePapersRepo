import { useRouteError } from "react-router-dom";

function ErrorPage() {
    let errorObject = useRouteError();

    return <div>Uh oh, we had a {errorObject.message} here</div>
}

export default ErrorPage