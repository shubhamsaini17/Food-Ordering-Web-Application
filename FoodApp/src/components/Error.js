import { useRouteError } from "react-router-dom";


const Error = () => {
    // useRouteError Hook
    const err = useRouteError();
    console.log(err);
    return (
        <div>
            <h1>Oops!!!</h1>
            <h2>{err.status} : {err.statusText} <br />Something went wrong!!</h2>
        </div>
    )
}

export default Error;