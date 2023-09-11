import Modal from '@/Components/CustomModal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function AddDocument({ auth }) {
    const [showAddModal, setShowAddModal] = useState(false);

    let submit = async ()=> {

    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex items-center justify-between">
                <aside className="border-b-4 py-2 border-b-primary">
                    <h1>Add Documents</h1>
                </aside>
            </div>}
        >
            <Head title="Manage Users" />

            <section>
                <div className="flex justify-between px-4">
                    <aside></aside>
                    <aside>
                        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                            Add Document
                        </button>
                    </aside>
                </div>
            </section>

            <section>
                {/* Your Codes goes here */}

            </section>



            {/* Modals */}
            <Modal show={showAddModal} maxWidth="xl" onClose={() => setShowAddModal(false)}>
                <section className="px-4 py-3">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mt-4">
                                <InputLabel htmlFor="doc_name" value="Document Name" />

                                <TextInput
                                    id="doc_name"
                                    type="text"
                                    name="doc_name"
                                    className="mt-1 block w-full"
                                />
                            </div>
                        </div>
                    </form>
                </section>
            </Modal>
        </AuthenticatedLayout>
    );
}
