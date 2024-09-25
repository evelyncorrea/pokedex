import { useRouteError } from 'react-router-dom';
import './Error.css';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
    <div className='error-page-wrapper'>
        <h1>Error!</h1>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
    </div>)
}