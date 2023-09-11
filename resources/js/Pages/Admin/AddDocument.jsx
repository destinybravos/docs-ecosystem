import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/CustomModal';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaSave, FaUserTag } from 'react-icons/fa';
import { FiLayers } from 'react-icons/fi';
import { HiDocumentAdd } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';

export default function AddDocument({ auth }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [departments, setDepartment] = useState([]);
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

    useEffect(() => {
        let url = new URL(location.href);
        let search = url.searchParams.get('search');
        if (search !== undefined && search !== null && search !== '') {
            setSearchParam(search)
        }
        fetchDepartments();
    }, [])

    

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

            </section>



            {/* Modals */}
            <Modal show={showAddModal} maxWidth="xl" onClose={() => setShowAddModal(false)}>
                <section className="px-4 py-3">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mt-4">
                                <InputLabel htmlFor="doc_name">
                                    <HiDocumentAdd className="inline" /> Document Name
                                </InputLabel>

                                <TextInput
                                    id="doc_name"
                                    type="text"
                                    name="doc_name"
                                    className="mt-1 block w-full"
                                    placeholder="Enter Document Name"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="doc_name">
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
                                <InputLabel htmlFor="doc_name">
                                    <FiLayers className="inline" /> Upload File
                                </InputLabel>

                                <TextInput
                                    id="access_by"
                                    name="access_by"
                                    type="file"
                                    className="mt-1 block w-full py-2 px-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="doc_name">
                                    <MdSchool className="inline" /> Department
                                </InputLabel>

                                <SelectInput
                                    id="access_by"
                                    name="access_by"
                                    className="mt-1 block w-full"
                                    defaultValue={``}
                                >
                                    <option value="">Select Department</option>
                                    {departments && departments.map(department => (<option key={department.id} value={department.id}>{department.name}</option>))}
                                </SelectInput>
                            </div>
                            
                            <div className="mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="department_only"
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Department Only</span>
                                </label>
                            </div>
                            
                            <div className="mt-4 md:col-span-2">
                                <PrimaryButton className="py-1 gap-x-2" disabled={processing}>
                                    <FaSave className="w-6 h-6" /> Save Document
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </section>
            </Modal>
        </AuthenticatedLayout>
    );
}
