import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import wordIcon from '@/Assets/Images/wordIcon.png';
import { BiArrowBack, BiBookOpen } from 'react-icons/bi';
import { BsDownload, BsEye } from 'react-icons/bs';
import Modal from '@/Components/CustomModal';
import avatar from '@/Assets/avatar.svg';
import FilePreviewer from '@/Components/FilePreviewer';

const Document = ({auth, document, document_list}) => {
    const [previewMode, setPreviewMode] = useState(false);
    useEffect(() => {
        // console.log(document);
    }, [])

    const downloadFiles =  () => {
        document.files.forEach(async (file) => {
            try {
                let url = file.path + file.name;
                await fetch(url, { mode : 'no-cors'})
                    .then(response => response.blob())
                    .then(blob => {
                    let blobUrl = window.URL.createObjectURL(blob);
                    let a = window.document.createElement('a');
                    a.download = url.replace(/^.*[\\\/]/, '');
                    a.href = blobUrl;
                    window.document.body.appendChild(a);
                    a.click();
                    a.remove();
                    updateDownloadCounts();
                })
            } catch (error) {
                console.log(error);
            }
        });
    }

    const updateDownloadCounts = () => {
        document.no_downloads += 1;
        axios.post(route('api.increament.download'), {document_id: document.id});
    }
    

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

            <section className="py-4 px-4 mb-2">
                <Link href={route('document_ecosystem')} className="inline-flex items-center gap-2 btn-primary">
                    <BiArrowBack className="w-5 h-5 inline-block" /> Back
                </Link>
            </section>

            <section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <aside className="px-4 py-4 bg-white shadow-md rounded-md lg:col-span-2">
                        {/* ========= If Allowed to Access Document ========== */}
                        <section className="flex flex-col md:flex-row justify-center item-start gap-4">
                            {/* Thumbnail */}
                            <aside className="flex-shrink-0">
                                <img src={wordIcon} alt="doc" className="h-44 mx-auto" />
                            </aside>
                            {/* Document Description */}
                            <aside className='flex-grow px-2'>
                                <h1 className="font-bold text-2xl flex mb-33 items-start mb-4">
                                    <aside className="flex-grow">
                                        { document?.doc_name }
                                    </aside>
                                </h1>
                                <div className="mb-2 capitalize flex gap-2 items-center">
                                    <span className="inline-block py-1 px-2 bg-primary text-white rounded-md text-xs">
                                        { document.access_level }
                                    </span>
                                    <span className="inline-block py-1 px-2 bg-purple-600 text-white rounded-md text-xs">
                                        { document.department.name }
                                    </span>
                                </div>
                                <section className="flex items-center gap-3 text-sm mb-4">
                                    <aside>
                                        <BsEye className='inline' /> {document.no_views ? document.no_views : 0} Views
                                    </aside>
                                    <aside>
                                        <BsDownload className='inline' /> {document.no_downloads ? document.no_downloads : 0} Downloads
                                    </aside>
                                </section>

                                <section>
                                    
                                    {/* Download Button */}
                                    <aside className="flex-shrink-0 flex gap-2">
                                        <button className="btn-primary text-sm flex gap-3 items-center" onClick={() => downloadFiles()}>
                                            <BsDownload className="w-5 h-5 inline-block" />  Download
                                        </button>
                                        <button className="btn-secondary text-sm flex gap-1 items-center" onClick={() => setPreviewMode(true)}>
                                            <BiBookOpen className="w-5 h-5 inline-block" /> Preview
                                        </button>
                                    </aside>
                                </section>


                                <h3 className="py-2 my-4 px-3 border-y font-bold">
                                    Decription
                                </h3>
                                <div>
                                    { document.description }
                                </div>

                                {/* User Details */}
                                <section className="mt-5">
                                    <h2 className="text-based font-bold text-primary mb-2">Uploaded By:</h2>
                                    <div>
                                        <div className="flex gap-x-3">
                                            <img src={document.user?.avatar ? document.user?.avatar : avatar} alt=' ' className="rounded-full h-9 w-9 bg-slate-300" />
                                            <aside className="hidden md:block text-left leading-4">
                                                <strong>{document.user.firstname} {document.user?.lastname}</strong> <br />
                                                <small className="text-slate-500 capitalize">{document.user.role}</small>
                                            </aside>
                                        </div>
                                    </div>
                                </section>
                            </aside>
                        </section>
                    </aside>

                    {/* Other related / Most Viewed docuuments */}
                    <aside className="bg-white rounded-t-md">
                        <div>
                            <header className="bg-primary text-white px-4 py-2 rounded-t-md">
                                Other Related Documents
                            </header>
                            <ul className="px-4 divide-y">
                                {document_list && document_list.map((doc) => (<li key={doc.id} className="py-2">
                                    <div className="flex gap-2 items-start">
                                        {/* Icon */}
                                        <aside>
                                            <img src={wordIcon} alt="doc" className="h-10 mx-auto" />
                                        </aside>
                                        {/* Details */}
                                        <aside className="flex-grow">
                                            <h2 className="text-lg font-bold">
                                                { doc.doc_name }
                                            </h2>
                                            <section className="flex items-center gap-3 text-sm mb-">
                                                <aside>
                                                    <BsEye className='inline' /> {doc.no_views ? doc.no_views : 0} Views
                                                </aside>
                                                <aside>
                                                    <BsDownload className='inline' /> {doc.no_downloads ? doc.no_downloads : 0} Downloads
                                                </aside>
                                            </section>
                                            <div className="flex justify-end">
                                                <Link href={route('document.view', [doc.id])} className={`bg-primary text-xs py-1 px-2 rounded-md text-white`}>
                                                    <BsEye className='inline mr-1' size={16} /> View
                                                </Link>
                                            </div>
                                        </aside>
                                    </div>
                                </li>))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>

            
            {/* Modals Add Document */}
            <Modal show={previewMode} maxWidth="xl" onClose={() => setPreviewMode(false)}>
                <FilePreviewer files={document.files} />
            </Modal>
        </AuthenticatedLayout>
    )
}

export default Document