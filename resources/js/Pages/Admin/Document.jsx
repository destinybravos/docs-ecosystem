import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Document = ({auth}) => {
  return (
    <AuthenticatedLayout
        user={auth.user}
        header={<div className="flex items-center justify-between">
            <aside className="border-b-4 py-2 border-b-primary">
                <h1>Document</h1>
            </aside>
        </div>}
    >
        <Head title="Document" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default Document