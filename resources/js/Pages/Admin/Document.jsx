import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import wordIcon from '@/Assets/Images/wordIcon.png';

const Document = ({auth, document}) => {
    useEffect(() => {
        console.log(document);
    }, [])
    

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

            <section>
                <div className="px-4 py-4 bg-white shadow-md rounded-md">

                    {/* ========= If Allowed to Access Document ========== */}
                    <section className="flex flex-col md:flex-row justify-center item-start gap-4">
                        {/* Thumbnail */}
                        <aside>
                            <img src={wordIcon} alt="doc" className="h-44 mx-auto" />
                        </aside>
                        {/* Document Description */}
                        <aside className='flex-grow px-2'>
                            <h1 className="font-bold text-2xl md:text-3xl">
                                { document?.doc_name }
                            </h1>
                        </aside>
                    </section>
                </div>
            </section>
        </AuthenticatedLayout>
    )
}

export default Document