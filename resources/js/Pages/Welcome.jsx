import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
        <Head title="Welcome" />
            <h1>
                Hello World
            </h1>
        </>
    );
}
