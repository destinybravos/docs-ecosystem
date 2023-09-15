import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/CustomModal';
import InputLabel from '@/Components/InputLabel';
import Loader from '@/Components/Loader';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useDebounce } from '@/hooks/Search';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { BsDownload, BsEye } from 'react-icons/bs';
import { FaSave, FaUserTag } from 'react-icons/fa';
import { FiLayers } from 'react-icons/fi';
import { HiDocumentAdd } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';

export default function ManageDocument({ auth }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [departments, setDepartment] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [searchParam, setSearchParam] = useState(null);

    let fetchDepartments = async () => {
        await axios.get(route('api.admin.fetch_departments'))
        .then((response) => {
            setDepartment(response.data.body.departments);
        })
        .catch((err) => {
            console.log("Error::=>", err?.response?.data);   
        })
    }
    let fetchDocuments = async (search = null) => {
        await axios.post(route('api.fetch_documents'), {search_param: search})
        .then((response) => {
            setDocuments(response.data.body.documents);
        })
        .catch((err) => {
            console.log("Error::=>", err?.response?.data);   
        })
    }

    useEffect(() => {
        let url = new URL(location.href);
        let search = url.searchParams.get('search');
        fetchDepartments();
        fetchDocuments(search);
    }, [])

    

    let submit = async (e)=> {
        e.preventDefault();
        setProcessing(true);
        let form = new FormData(e.target);
        await axios.post(route('api.save_document'), form)
        .then((response)=> {
            setProcessing(false);
            if (response.data.success) {
                setDocuments(response.data.body.documents)
                e.target.reset();
                setShowAddModal(false);
                alert(response.data.message);
            }
        })
        .catch((error)=> {
            setProcessing(false);
            alert(error.response.data.message);
            console.log(error.response.data.message);
        });
    }

    const searchDocuments = useDebounce(async (query)=>{
        await axios.post(route('api.fetch_documents'), {search_param: query})
        .then((response) => {
            setDocuments(response.data.body.documents);
        })
        .catch((err) => {
            console.log("Error::=>", err?.response?.data);   
        })
     }, 500)

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex items-center justify-between">
                <aside className="border-b-4 py-2 border-b-primary">
                    <h1>Documents Ecosystem</h1>
                </aside>
            </div>}
        >
            <Head title="Manage Documents" />

            <section>
                <div className="flex items-center gap-3 justify-between md:px-4">
                    <aside className="flex-grow max-w-[400px]">
                        <div className="">
                            <TextInput
                                id="search-input"
                                type="search"
                                name="search_input"
                                defaultValue={searchParam}
                                placeholder="Search for a specific document"
                                className="mt-1 block w-full"
                                onKeyUp={(e) => searchDocuments(e.target.value) }
                            />
                        </div>
                    </aside>
                    <aside>
                        <button className="btn-primary text-xs sm:text-sm" onClick={() => setShowAddModal(true)}>
                            Add Document
                        </button>
                    </aside>
                </div>
            </section>

            <section>
                {/* Your Codes goes here */}
                {documents && <div className="my-6 flex justify-end">
                    <Pagination pageLimit={documents.per_page} totalRecords={documents.total} links={documents.links} onPageResponse={(data) => setDocuments(data.documents)} />
                </div>}

                {/* Documents Table */}
                <div className="px-4 py-3">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {documents?.data && documents?.data.map((document) => (<li key={document.id} className="bg-white dark:bg-slate-800 dark:text-slate-300 shadow-md rounded-lg">
                            <div className="px-3 py-2">
                                <div className="mb-2 capitalize">
                                    <span className="inline-block py-1 px-2 bg-primary text-white rounded-md text-xs">
                                        { document.access_level }
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold mb-2 line-clamp-2">
                                    { document.doc_name }
                                </h2>
                                <p className="text-sm line-clamp-3 mb-3">
                                    { document?.description }
                                </p>
                                <footer className="flex items-center gap-3 text-sm">
                                    <aside>
                                        <BsEye className='inline' /> {document.no_views ? document.no_views : 0}
                                    </aside>
                                    <aside>
                                        <BsDownload className='inline' /> {document.no_downloads ? document.no_downloads : 0}
                                    </aside>
                                    <div className="flex-grow flex justify-end">
                                        <Link href={route('document.view', [document.id])} className={`btn-primary text-xs py-1 px-2`}>
                                            <BsEye className='inline mr-1' size={16} /> View
                                        </Link>
                                    </div>
                                </footer>
                            </div>
                        </li>)
                    )}
                    </ul>
                </div>
            </section>



            {/* Modals Add Document */}
            <Modal show={showAddModal} maxWidth="xl" onClose={() => setShowAddModal(false)}>
                <section className="px-4 py-3">
                    <form onSubmit={submit} encType='multipart/form-data'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mt-4">
                                <InputLabel htmlFor="doc_name">
                                    <HiDocumentAdd className="inline" /> Document Name
                                </InputLabel>

                                <TextInput
                                    id="doc_name"
                                    type="text"
                                    required
                                    name="doc_name"
                                    className="mt-1 block w-full"
                                    placeholder="Enter Document Name"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="access_by">
                                    <FaUserTag className="inline" /> To Be Accessed By
                                </InputLabel>

                                <SelectInput
                                    id="access_by"
                                    name="access_by"
                                    className="mt-1 block w-full"
                                >
                                    <option value="">Select Access Type</option>
                                    <option value="all">All</option>
                                    <option value="admin">Admin Only</option>
                                    <option value="non_ac_staff">Non Acedemic Staff</option>
                                    <option value="ac_staff">Academic Staff</option>
                                    <option value="all_staff">All Staff</option>
                                </SelectInput>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="doc_file">
                                    <FiLayers className="inline" /> Upload File
                                </InputLabel>

                                <TextInput
                                    id="doc_file"
                                    name="doc_file[]"
                                    type="file" 
                                    required
                                    multiple
                                    className="mt-1 block w-full py-2 px-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="department_id">
                                    <MdSchool className="inline" /> Department
                                </InputLabel>

                                <SelectInput
                                    id="department_id"
                                    name="department_id"
                                    className="mt-1 block w-full"
                                    defaultValue={``}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments && departments.map(department => (<option key={department.id} value={department.id}>{department.name}</option>))}
                                </SelectInput>
                            </div>

                            <div className="mt-4 md:col-span-2">
                                <InputLabel htmlFor="doc_file">
                                    <FiLayers className="inline" /> Brief Description
                                </InputLabel>

                                <TextArea
                                    id="description"
                                    name="description"
                                    className="mt-1 block w-full py-2 px-2"
                                />
                            </div>
                            
                            <div className="mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="department_only"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Department Only</span>
                                </label>
                            </div>
                            
                            <div className="mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="request_access"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Require Access Approval</span>
                                </label>
                            </div>
                            
                            
                            <div className="mt-4 md:col-span-2">
                                <PrimaryButton className="py-1 gap-x-2" disabled={processing}>
                                    { processing ? <Loader className="w-6 h-6" /> : <><FaSave className="w-6 h-6" /> Save Document</> }
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </section>
            </Modal>
        </AuthenticatedLayout>
    );
}
