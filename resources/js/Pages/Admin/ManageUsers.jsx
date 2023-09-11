import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ManageUsers({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex items-center justify-between">
                <aside className="border-b-4 py-2 border-b-primary">
                    <h1>Manage Users</h1>
                </aside>
            </div>}
        >
            <Head title="Manage Users" />

            <section>
                {/* Your Codes goes here */}
            </section>
        </AuthenticatedLayout>
    );
}
