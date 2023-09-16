import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {FiSearch} from 'react-icons/fi'
import AllUsersTable from '@/Components/AllUsersTable';
import Modal from '@/Components/CustomModal';
import AddUserForm from '@/Components/AddUserForm';
import DeleteUserDialog from '@/Components/DeleteUserDialog';
import EditUserForm from '@/Components/EditUserForm';
import { useDebounce } from '@/hooks/Search';
import avatar from '@/Assets/avatar.svg';

import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { FaTimesCircle } from 'react-icons/fa';
export default function ManageUsers({ auth }) {
    const[selectedRequest, setSelectedRequest] = React.useState(false);
    const [pagination, setPagination] = React.useState([]);
    const[accesses, setAccesses] = React.useState(null);

    const getFetchAccess = async ()=>{
        try {
            const res = await axios.get(route(`api.admin.fetch_access_request`));
            const accesses = res.data.body.accesses;
            setAccesses(accesses);
         } catch (error) {
            console.log(error);
        }
     }

     React.useEffect(()=>{
        getFetchAccess();
    },[]);
 

    const searchRequests = useDebounce(async (query)=>{
        try {
            //  const res = await axios.post(route(`api.admin.search_users`), {searchValue : query});
            //  console.log(res);
            // const users = res.data.body.users.data;
            // setUsers(users);
 
         } catch (error) {
             console.log(error);
         }
     }, 1000)

    const updateStatus = async (permission) => {
        await axios.post(route(`api.admin.update_access_request`), {access_id : selectedRequest.id, permission : permission})
        .then((response) => {
            setAccesses(response.data.body.accesses);
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex items-center justify-between">
                <aside className="border-b-4 py-2 border-b-primary">
                    <h1>Document Access</h1>
                </aside>
            </div>}
        >
            <Head title="Manage Users" />

            <section className="mb-5">
                {/* Your Codes goes here */}
                <div className="w-auto">
                    <div className="flex justify-between">
                     <div className="flex items-center bg-white rounded-lg pr-3 ">
                         <input 
                             onKeyUp={(e) => searchUsers(e.target.value)}
                             type="text" 
                             placeholder='Search Requests'
                             className="rounded-lg focus:ring-0 border border-transparent transition-all duration-75"
                         />
                         <FiSearch className="text-base ml-2"/>
                       
                     </div>
                    </div>
                </div>
            </section>

            {/* Taable */}
            <section>
            <table className="w-full">
                <thead className="bg-primary text-sm font-extrabold text-white">
                    <tr className="text-left border-b border-b-[#eef0f3] p-14">
                        <th className="p-2">User</th>
                        <th className="p-2">Docuument </th>
                        <th className="p-2">status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    { accesses && accesses.map(access =>(
                        <tr className='border-b border-b-[#eef0f3]' key={access.id}>
                            <td className="flex items-center sm:p-2 pr-12 pl-4 py-4">
                                <img src={access.user.avatar ? access.user.avatar : avatar} className="w-[45px] h-[45px] object-cover rounded-full mr-4"/>
                                <div>
                                    <h5 className="text-sm font-semibold text-black">{access.user.firstname + " "+ access.user.lastname}</h5>
                                    <p className="font-normal text-[13px] text-slate-500">{access.user.email}</p>
                                </div>
                            </td>

                            <td className="p-2">
                                {access.document.doc_name}
                            </td>

                            <td className="p-2">
                                <div className="flex gap-3">
                                    <p className={`${access.permission == 'granted' ? 'bg-primary' : (access.permission == 'denied' ? 'bg-[#f33636]' : 'bg-orange-500')} transition-all duration-300 py-1 px-2 text-xs rounded-full text-white cursor-pointer text-center`}>{access.permission}</p>
                                </div>
                            </td>

                            
                            <td className="p-2">
                                <div className="flex gap-2 text-slate-500">
                                    <div role='button' onClick={()=>{updateStatus('granted'); setSelectedRequest(access);}} className="flex items-center cursor-pointer hover:text-slate-800">
                                        <BiCheck className="text-base mr-1"/>
                                        <small className="pr-1 inline-block">Grant Access</small>
                                    </div>
                                    <div role='button' onClick={()=>{updateStatus('denied'); setSelectedRequest(access);}} className="flex items-center cursor-pointer text-red-500 hover:text-slate-800">
                                        <FaTimesCircle className="text-base mr-1"/>
                                        <small className="pr-1 inline-block">Deny Access</small>
                                    </div>
                                </div>
                            </td>

                        </tr>    
                        ))
                    }
                    
                    
                    
                </tbody>
            </table>
            </section>
        </AuthenticatedLayout>
    );
}
