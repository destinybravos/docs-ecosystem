import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import wordIcon from '@/Assets/Images/wordIcon.png';
import pdfIcon from '@/Assets/Images/pdfIcon.png';
import excelIcon from '@/Assets/Images/excelIcon.png';
import pPointIcon from '@/Assets/Images/ppoint.png';
import { BsDownload, BsEye } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { HiDocument, HiUsers } from 'react-icons/hi';

export default function Dashboard({ auth, statistics }) {
    const [faculties, setFaculties] = useState(null);
    const fetchStatistics = async () => {
        await axios.get(route('api.fetch_statistics'))
        .then((res) => {
            console.log(res.data);
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

    useEffect(() => {
        console.log(statistics);
        fetchFaculties();
    }, [])

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
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex items-center justify-between">
                <aside className="border-b-4 py-2 border-b-primary">
                    <h1>Dashboard</h1>
                </aside>
            </div>}
        >
            <Head title="Dashboard" />

            <section className="mb-8 px-4">
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {/* Dashboard Cards */}
                    <aside className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 rounded-lg py-5 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <FaUsers className={`md:h-10 md:w-10 h-8 w-8`} />
                        <aside className="md:space-y-1">
                            <p className={`text-sm text-primary`}>
                                No of Students
                            </p>
                            <h1 className={`font-black text-5xl mb-1 ml-4`}>
                                {statistics.no_students}
                            </h1>
                        </aside>
                    </aside>
                    {/* Dashboard Cards */}
                    <aside className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 rounded-lg py-5 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <HiUsers className={`md:h-10 md:w-10 h-8 w-8`} />
                        <aside className="md:space-y-1">
                            <p className={`text-sm text-primary`}>
                                No of Staff
                            </p>
                            <h1 className={`font-black text-5xl mb-1 ml-4`}>
                                {statistics.no_staff}
                            </h1>
                        </aside>
                    </aside>
                    {/* Dashboard Cards */}
                    <aside className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 rounded-lg py-5 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <HiDocument className={`md:h-10 md:w-10 h-8 w-8`} />
                        <aside className="md:space-y-1">
                            <p className={`text-sm text-primary`}>
                                Total Documents
                            </p>
                            <h1 className={`font-black text-5xl mb-1 ml-4`}>
                                {statistics.no_documents}
                            </h1>
                        </aside>
                    </aside>
                    {/* Dashboard Cards */}
                    <aside className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-800 rounded-lg py-5 px-3 shadow md:px-4 h-full lg:col-span-1">
                        <BsDownload className={`md:h-10 md:w-10 h-8 w-8`} />
                        <aside className="md:space-y-1">
                            <p className={`text-sm text-primary`}>
                                Downloads
                            </p>
                            <h1 className={`font-black text-5xl mb-1 ml-4`}>
                                {statistics.no_downloads}
                            </h1>
                        </aside>
                    </aside>
                </div>
            </section>

            <section className="mb-8 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
                    {/* Most Viewed docuuments */}
                    <aside className="bg-white rounded-t-md">
                        <div>
                            <header className="bg-primary text-white px-4 py-2 rounded-t-md">
                                Frequently View Documents
                            </header>
                            <ul className="px-4 divide-y">
                                {statistics?.documents && statistics?.documents.map((doc) => (<li key={doc.id} className="py-2">
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

                    <div className="">
                        <h1 className="font-bold uppercase">Faculties</h1>
                        <div className='rounded-md shadow bg-white  p-4 max-h-[350px] overflow-y-auto'>

                        {
                            faculties && faculties.map((faculties,i)=>(
                            <div key={i} className="bg-slate-100 flex items-center relative cursor-pointer group mb-2">
                                <div className='h-7 w-7  bg-primary  rounded-full text-white font-semibold flex-shrink-0 flex justify-center items-center'>
                                    {i +1}
                                </div>
                                <h1 className="ml-2 font-semibold">{faculties.name}</h1>
                               
                            </div>  
                            ))
                        }
                        </div>

                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
