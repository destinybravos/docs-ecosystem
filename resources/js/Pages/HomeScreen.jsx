import PageBanner from '@/Components/PageBanner';
import BaseLayout from '@/Layouts/BaseLayout';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <BaseLayout auth={auth}>
            <Head title="Welcome" />
            <PageBanner />

        </BaseLayout>
    );
}
