import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, {useState} from 'react';
import { Head } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import { useDebounce } from '@/hooks/Search';
import Modal from '@/Components/CustomModal';
import PrimaryButton from '@/Components/PrimaryButton';
import Loader from '@/Components/Loader';
import { FaSave, FaUserTag, FaTimesCircle } from 'react-icons/fa';

export default function Dashboard({ auth }) {
    const [showFacultyModal, setShowFacultyModal] = useState(false);
    const [showDepartmentModal, setShowDepartmentModal] = useState(false);
    const [searchParam, setSearchParam] = useState(null);
    const [processing, setProcessing] = useState(false);

    const searchDocuments = useDebounce(async (query)=>{
        await axios.post(route('api.fetch_documents'), {search_param: query})
        .then((response) => {
            setDocuments(response.data.body.documents);
        })
        .catch((err) => {
            console.log("Error::=>", err?.response?.data);   
        })
     }, 500)

    const submitFaculty = async (e) =>{
        e.preventDefault();
        setProcessing(true);
        let data = new FormData(e.target);

        try{
            setProcessing(false);
        }catch{
             setProcessing(false);
        }

        console.log(data);
    }

    const submitDepartment = async (e) =>{
        e.preventDefault();
        setProcessing(true);
        let data = new FormData(e.target);

        try{
            setProcessing(false);
        }catch{
             setProcessing(false);
        }

        console.log(data);
    }
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
                <div className="flex items-center gap-3 justify-between md:px-4">
                    <aside className="flex-grow max-w-[400px]">
                        <div className="">
                            <TextInput
                                id="search-input"
                                type="search"
                                name="search_input"
                                defaultValue={searchParam}
                                placeholder="Search for a specific department"
                                className="mt-1 block w-full"
                                onKeyUp={(e) => searchDocuments(e.target.value) }
                            />
                        </div>
                    </aside>
                    <aside className='flex items-center gap-x-5'>
                        <button className="btn-primary text-xs sm:text-sm" onClick={() => setShowFacultyModal(true)}>
                            Add Faculty
                        </button>

                        <button className="btn-primary text-xs sm:text-sm" onClick={() => setShowDepartmentModal(true)}>
                            Add Department
                        </button>
                    </aside>
                </div>
            </section>

            {/* <section className='rounded-lg bg-white overflow-auto mt-8 shadow-sm shadow-white'>
                <table className="w-full">
                    <thead className="bg-primary text-sm font-extrabold text-white">
                        <tr className="text-left border-b border-b-[#eef0f3] p-14">
                            <th className="p-2"> Sn</th>
                            <th className="p-2">Faculties</th>
                            <th className="p-2">Departments</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>    
                </table>
            </section> */}

            <div className=' px-4 mt-6'>
                <div className='flex gap-x-5'>


                    <div className=" w-2/4">
                        <h1 className="font-bold uppercase">Faculties</h1>
                        <div className='rounded-md shadow bg-white grid grid-cols-2 p-4 gap-4'>

                            <div className="bg-slate-100 flex items-center relative cursor-pointer group">
                                <div className='h-7 w-7  bg-primary  rounded-full text-white font-semibold flex-shrink-0 flex justify-center items-center'>
                                    1
                                </div>
                                <h1 className="ml-2 font-semibold">Engineering</h1>
                                <button className="rounded-full text-red-500 absolute right-1 hidden group-hover:block">
                                 <FaTimesCircle className="h-4 w-4 inline-block" />
                                </button>
                            </div>

                            <div className="bg-slate-100 flex items-center relative cursor-pointer group">
                                <div className='h-7 w-7  bg-primary  rounded-full text-white font-semibold flex-shrink-0 flex justify-center items-center'>
                                    2
                                </div>
                                <h1 className="ml-2 font-semibold">Environmental Design</h1>
                                <button className="rounded-full text-red-500 absolute right-1 hidden group-hover:block">
                                 <FaTimesCircle className="h-4 w-4 inline-block" />
                                </button>
                            </div>

                            <div className="bg-slate-100 flex items-center relative cursor-pointer group">
                                <div className='h-7 w-7  bg-primary  rounded-full text-white font-semibold flex-shrink-0 flex justify-center items-center'>
                                    3
                                </div>
                                <h1 className="ml-2 font-semibold">Engineering</h1>
                                <button className="rounded-full text-red-500 absolute right-1 hidden group-hover:block">
                                 <FaTimesCircle className="h-4 w-4 inline-block" />
                                </button>
                            </div>

                            <div className="bg-slate-100 flex items-center relative cursor-pointer group">
                                <div className='h-7 w-7  bg-primary  rounded-full text-white font-semibold flex-shrink-0 flex justify-center items-center'>
                                    4
                                </div>
                                <h1 className="ml-2 font-semibold">Engineering</h1>
                                <button className="rounded-full text-red-500 absolute right-1 hidden group-hover:block">
                                 <FaTimesCircle className="h-4 w-4 inline-block" />
                                </button>
                            </div>
                        </div>

                    </div>



                    <div className="w-2/4">
                        <h1 className="font-bold uppercase">Departments</h1>
                         <div className='rounded-md shadow bg-white grid grid-cols-2 p-4 gap-4'>

                            <div className="bg-slate-100 flex items-center relative cursor-pointer group ">
                                <div className='h-7 w-7  bg-primary  rounded-full text-white font-semibold flex-shrink-0 flex justify-center items-center'>
                                    1
                                </div>
                                <h1 className="ml-2 font-semibold">Mechatronics Engineering</h1>
                                <button className="rounded-full text-red-500 absolute right-1 hidden group-hover:block">
                                 <FaTimesCircle className="h-4 w-4 inline-block" />
                                </button>
                            </div>

                            <div className="bg-slate-100 flex items-center relative cursor-pointer group">
                                <div className='h-7 w-7  bg-primary  rounded-full text-white font-semibold flex-shrink-0 flex justify-center items-center'>
                                    2
                                </div>
                                <h1 className="ml-2 font-semibold">Agricultural Science</h1>
                                <button className="rounded-full text-red-500 absolute right-1 hidden group-hover:block">
                                 <FaTimesCircle className="h-4 w-4 inline-block" />
                                </button>
                            </div>

                            <div className="bg-slate-100 flex items-center relative cursor-pointer group">
                                <div className='h-7 w-7  bg-primary  rounded-full text-white font-semibold flex-shrink-0 flex justify-center items-center'>
                                    3
                                </div>
                                <h1 className="ml-2 font-semibold">Computer Science</h1>
                                <button className="rounded-full text-red-500 absolute right-1 hidden group-hover:block">
                                 <FaTimesCircle className="h-4 w-4 inline-block" />
                                </button>
                            </div>

                            <div className="bg-slate-100 flex items-center relative cursor-pointer group">
                                <div className='h-7 w-7  bg-primary  rounded-full text-white font-semibold flex-shrink-0 flex justify-center items-center'>
                                    4
                                </div>
                                <h1 className="ml-2 font-semibold">Medicine & Surgery</h1>
                                <button className="rounded-full text-red-500 absolute right-1 hidden group-hover:block">
                                 <FaTimesCircle className="h-4 w-4 inline-block" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showFacultyModal} maxWidth="xl" onClose={() => setShowFacultyModal(false)}>
                <section className="px-4 py-3">
                    <form onSubmit={submitFaculty} method="POST">
                       
                            <div className="mt-4">
                                <InputLabel htmlFor="faculty_name">
                                   Faculty Name
                                </InputLabel>

                                <TextInput
                                    id="faculty_name"
                                    type="text"
                                    required
                                    name="faculty_name"
                                    className="mt-1 block w-full"
                                    placeholder="Enter Faculty name"
                                />
                            </div>
                            <div className="mt-4">
                            <PrimaryButton className="py-1 gap-x-2" disabled={processing}>
                                    { processing ? <Loader className="w-6 h-6" /> : <><FaSave className="w-6 h-6" /> Save Faculty</> }
                                </PrimaryButton>
                            </div>
                       
                    </form>
                </section>
            </Modal>


            <Modal show={showDepartmentModal} maxWidth="xl" onClose={() => setShowDepartmentModal(false)}>
                <section className="px-4 py-3">
                    <form onSubmit={submitDepartment} method="POST">
                       
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              
                            <div className="mt-4">
                                <InputLabel htmlFor="faculty">
                                   Select Faculty
                                </InputLabel>


                                <SelectInput
                                    id="faculty"
                                    name="faculty"
                                    className="mt-1 block w-full"
                                >
                                    <option value="">Select Faculty</option>
                                    <option value="all">All</option>
                                    <option value="admin">Admin Only</option>
                                    <option value="non_ac_staff">Non Acedemic Staff</option>
                                    <option value="ac_staff">Academic Staff</option>
                                    <option value="all_staff">All Staff</option>
                                </SelectInput>

                               
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="department">
                                  Department Name
                                </InputLabel>

                                <TextInput
                                    id="department"
                                    type="text"
                                    required
                                    name="department"
                                    className="mt-1 block w-full"
                                    placeholder="Enter Department Name"
                                />

                               
                            </div>
                        </div>

                        <div className="mt-4">
                            <PrimaryButton className="py-1 gap-x-2" disabled={processing}>
                                { processing ? <Loader className="w-6 h-6" /> : <><FaSave className="w-6 h-6" /> Save Department</> }
                            </PrimaryButton>
                        </div>
                       
                    </form>
                </section>
            </Modal>
        </AuthenticatedLayout>
    );
}
