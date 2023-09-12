import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex items-center justify-between">
                <aside className="border-b-4 py-2 border-b-primary">
                    <h1>Manage Department</h1>
                </aside>
            </div>}
        >
            <Head title="Dashboard" />

            <section>
                
            </section>
        </AuthenticatedLayout>
    );
}
