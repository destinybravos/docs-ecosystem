import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import wordIcon from '@/Assets/Images/wordIcon.png';
import pdfIcon from '@/Assets/Images/pdfIcon.png';
import excelIcon from '@/Assets/Images/excelIcon.png';
import pPointIcon from '@/Assets/Images/ppoint.png';
import { BiArrowBack, BiBookOpen, BiTrashAlt } from 'react-icons/bi';
import { BsDownload, BsEye, BsShieldExclamation } from 'react-icons/bs';
import Modal from '@/Components/CustomModal';
import avatar from '@/Assets/avatar.svg';
import FilePreviewer from '@/Components/FilePreviewer';
import Loader from '@/Components/Loader';

const Document = ({auth, document, document_list, permision}) => {
    const [previewMode, setPreviewMode] = useState(false);
    const [requestingAccess, setRequestAccess] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [deleting, setDeleting] = useState(false);
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

    const renderDocumentIcon = (document)=>{
        if(document.type =='image'){
            return document.path + document.name;
        }

        if(document.ext == 'docx'){
                return wordIcon;
        }

        if(document.ext == 'pdf'){
            return pdfIcon
        }

        if(document.ext == 'xlsx'){
            return excelIcon
        }

        if(document.ext == 'pptx'){
            return pPointIcon
        }
    }
    
    const requestAccess = async () => {
        setRequestAccess(true); 
        await axios.post(route('api.request_access'), {document_id: document.id})
        .then((res) => {
            console.log(res.data);
            alert(res.data.message);
            router.reload();
        })
        .catch((err) => {
            alert('Error: ' + err?.response.data?.message);
        });
    }

    const deleteDocument = async () => {
        setDeleting(true); 
        await axios.post(route('api.document.delete'), {document_id: document.id})
        .then((res) => {
            alert(res.data.body.message);
            console.log(res.data);
            router.visit(route('document_ecosystem'));
        })
        .catch((err) => {
            setDeleting(false); 
            alert('Error: ' + err?.response.data?.message);
        });
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
                        { permision.status == 'granted' ? <section className="flex flex-col md:flex-row justify-center item-start gap-4">
                            {/* Thumbnail */}
                            <aside className="flex-shrink-0">
                                <img src={renderDocumentIcon(document.files[0])} alt="doc" className="w-48 mx-auto" />
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
                                    <h4 className="text-sm text-red-500 mb-2">
                                        { (document.request_access && document.access_granted == 'no_permission') ? 
                                            <span>You require permission to download this document</span> : 
                                            (document.request_access && document.access_granted != 'granted' && auth.user.role != 'admin') && 
                                                <span>
                                                    Your request status is <strong>"{auth.user.role == 'admin' ? 'no permission needed' : document.access_granted}".</strong> Kindly contact the department administrator or the relevant 
                                                    authority if request is not granted.
                                                </span> 
                                        }
                                    </h4>
                                    
                                    {/* Download Button */}
                                    <aside className="flex-shrink-0 flex gap-2">
                                        { ((document.request_access == false) || (document.request_access && document.access_granted == 'granted') || auth.user.role == 'admin') ? (<button className="btn-primary text-sm flex gap-3 items-center" onClick={() => downloadFiles()}>
                                            <BsDownload className="w-5 h-5 inline-block" />  Download
                                        </button>) : (<button className="bg-red-500 text-white rounded-full px-2 md:px-4 py-2 dark:text-white shadow-md text-sm flex gap-3 items-center" onClick={() => requestAccess()}>
                                            <BsShieldExclamation className="w-5 h-5 inline-block" />  Request for Access
                                        </button>) }
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
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-x-3">
                                            <img src={document.user?.avatar ? document.user?.avatar : avatar} alt=' ' className="rounded-full h-9 w-9 bg-slate-300" />
                                            <aside className="block text-left leading-4">
                                                <strong>{document.user.firstname} {document.user?.lastname}</strong> <br />
                                                <small className="text-slate-500 capitalize">{document.user.role}</small>
                                            </aside>
                                        </div>
                                        { (auth.user.role == 'admin' || auth.user.id == document.user.id) && <button className="text-red-500 py-1 px-2" onClick={() => setDeleteMode(true)}>
                                            <BiTrashAlt className="h-7 w-7" />
                                        </button> }
                                    </div>
                                </section>
                            </aside>
                        </section> : 
                        <section>
                            {/* If Permission is not granted */}
                            <div className="flex min-h-[350px] items-center">
                                <aside className="mx-auto">
                                    <BsShieldExclamation className="mx-auto h-28 w-28 mb-7 text-red-500" />
                                    <h2 className="text-3xl mb-4 text-center">
                                        Access Denied
                                    </h2>
                                    <ul className="max-w-xl mx-auto px-4 divide-y">
                                        {permision && permision?.messages.map((perm, index) => (<li key={perm.id} className="text-red-500 py-6">
                                        { perm }
                                        </li>))}
                                    </ul>
                                </aside>
                            </div>
                        </section>}
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
                                          
                                            <img src={renderDocumentIcon(doc.files[0])} alt="doc" className="w-10 mx-auto" />
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

            
            {/* Modals Preview Document */}
            <Modal show={previewMode} maxWidth="xl" onClose={() => setPreviewMode(false)}>
                <FilePreviewer files={document.files} />
            </Modal>

            {/* Modal Delete Document */}

            <Modal maxWidth="md" show={deleteMode} onClose={() => setDeleteMode(false)}>
                <div className="py-4 px-5">
                    <h2 className="font-extrabold border-b mb-4">Delete Docment</h2>
                    <p className="text-base text-center">Are you sure you want to delete this docuument?</p>

                    <div className="mt-10 flex">
                        <button  className="px-4 py-2 mr-2 bg-gray-300 rounded-sm" onClick={() => setDeleteMode(false)}>Cancel</button>
                        <button className="px-4 py-2  bg-red-600 rounded-sm text-white" onClick={deleteDocument}>
                            { deleting ? <Loader message="Deleting..." /> : <span>Delete</span>}
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    )
}

export default Document