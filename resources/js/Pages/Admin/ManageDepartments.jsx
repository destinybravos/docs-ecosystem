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
    const [faculties, setFaculties] = useState(null);
    const [departments, setDepartments] = useState(null);

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
      
        const data = new FormData(e.target);
    
        axios.post(route('api.admin.save_faculty'), data)
        .then(res=>{    
            alert(res.data.message);
            setProcessing(false);
            const faculties = res.data.body.faculties;
            setFaculties(faculties);
            setShowFacultyModal(false);
           
        })
        .catch(err=>{
            setProcessing(false);
            alert("Could not process your request at this time. Please try again!")
            console.log(err)
        })
    }

    const submitDepartment = async (e) =>{
        e.preventDefault();
        setProcessing(true);
        let data = new FormData(e.target);

        axios.post(route('api.admin.save_department'), data)
        .then(res=>{    
            alert(res.data.message);
            setProcessing(false);
            const depts = res.data.body.departments;
            setDepartments(depts);
            setShowDepartmentModal(false);
           
        })
        .catch(err=>{
            setProcessing(false);
            alert("Could not process your request at this time. Please try again!")
            console.log(err)
        })

       
    }

    const fetchFaculties = async (e) =>{
     
        try{
           const res = await axios.get(route('api.admin.fetch_faculties'));
           const faculties = res.data.body.faculties;
           setFaculties(faculties);
        }catch(error){
            console.log(error)
        }
    }

    const fetchDepartments = async (e) =>{
     
        try{
           const res = await axios.get(route('api.admin.fetch_departments'));
           const faculties = res.data.body.departments;
           setDepartments(faculties);
        }catch(error){
            console.log(error)
        }
    }

    const deleteFaculties = async (id) =>{
        await axios.post(route('api.admin.delete_faculty'), {id})
        .then((res) => {
            fetchFaculties();
            fetchDepartments();
        })
    }

    const deleteDepartments = async (id) =>{
     
        try{
           const res = await axios.post(route('api.admin.delete_departments'), {id});
           fetchDepartments();
        }catch(error){
            console.log(error)
        }
    }

    React.useEffect(()=>{
        fetchFaculties();
        fetchDepartments();
    },[]);
    
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

            <div className=' px-4 mt-6'>
                <div className='flex gap-x-5'>

                    <div className="w-2/4">
                        <h1 className="font-bold uppercase">Departments</h1>
                        <div className='rounded-md shadow bg-white h-[350px] overflow-y-auto p-4'>

                            
                             {
                                departments && departments.map((department,i)=>(
                                <div key={i} className="bg-slate-100 flex items-center relative cursor-pointer group mb-2">
                                    <div className='h-7 w-7  bg-primary  rounded-full text-white font-semibold flex-shrink-0 flex justify-center items-center'>
                                        {i +1}
                                    </div>
                                    <h1 className="ml-2 font-semibold">{department.name}</h1>
                                    <button className="rounded-full text-red-500 absolute right-1 hidden group-hover:block" onClick={() => deleteDepartments(department.id)}>
                                    <FaTimesCircle className="h-4 w-4 inline-block" />
                                    </button>
                                </div>  
                            ))
                            }
                        </div>
                    </div>

                    <div className=" w-2/4">
                        <h1 className="font-bold uppercase">Faculties</h1>
                        <div className='rounded-md shadow bg-white  p-4 max-h-[350px] overflow-y-auto'>

                        {
                            faculties && faculties.map((faculties,i)=>(
                            <div key={i} className="bg-slate-100 flex items-center relative cursor-pointer group mb-2">
                                <div className='h-7 w-7  bg-primary  rounded-full text-white font-semibold flex-shrink-0 flex justify-center items-center'>
                                    {i +1}
                                </div>
                                <h1 className="ml-2 font-semibold">{faculties.name}</h1>
                                <button className="rounded-full text-red-500 absolute right-1 hidden group-hover:block" onClick={() => deleteFaculties(faculties.id)}>
                                 <FaTimesCircle className="h-4 w-4 inline-block" />
                                </button>
                            </div>  
                            ))
                        }
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
                                    name="faculty_id"
                                    className="mt-1 block w-full"
                                >
                                    <option value="" selected="selected">- Select Faculty-</option>
                                        {faculties && faculties.map(faculty => (
                                            <option value={faculty.id} key={faculty.id}> { faculty.name }</option>
                                    ))}
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

                            <div className=''>
                                <InputLabel htmlFor="type">
                                   Select Type
                                </InputLabel>


                                <SelectInput
                                    required
                                    id="type"
                                    name="type"
                                    className="mt-1 block w-full"
                                >
                                    <option value="">Select Type</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Administrative">administrative</option>
                                </SelectInput>
                            </div>

                            <div className=''>
                                <InputLabel >
                                  &nbsp;
                                </InputLabel>
                                <PrimaryButton className="py-1 gap-x-2 mt-1" disabled={processing}>
                                    { processing ? <Loader className="w-6 h-6" /> : <><FaSave className="w-6 h-6" /> Save Department</> }
                                </PrimaryButton>
                            </div>
                        </div>
                       
                    </form>
                </section>
            </Modal>
        </AuthenticatedLayout>
    );
}
