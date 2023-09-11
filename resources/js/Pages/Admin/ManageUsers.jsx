import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {FiSearch} from 'react-icons/fi'
import AllUsersTable from '@/Components/AllUsersTable';
import CustomModal from '@/Components/CustomModal';
import AddUserForm from '@/Components/AddUserForm';
import DeleteUserDialog from '@/Components/DeleteUserDialog';
import EditUserForm from '@/Components/EditUserForm';

import React from 'react';
export default function ManageUsers({ auth }) {
    const[isOpenAddUser, setIsOpenAddUser] = React.useState(false);
    const[isEditUser, setIsEditUser] = React.useState(false);
    const[isDeleteUser, setIsDeleteUser] = React.useState(false)
    const [pagination, setPagination] = React.useState([]);

    const openAddUser = ()=>{
        setIsOpenAddUser(true);
    }
    const openDeleteUser = ()=>{
        setIsDeleteUser(true);
    }

    const openEditUserForm = () =>{
        setIsEditUser(true);
    }
    
    const closeModal = ()=>{
        setIsOpenAddUser(false);
        setIsEditUser(false);
        setIsDeleteUser(false);
        // getUsers();
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex items-center justify-between">
                <aside className="border-b-4 py-2 border-b-primary">
                    <h1>Manage Users</h1>
                </aside>
            </div>}
        >
            <Head title="Manage Users" />

            <section>
                {/* Your Codes goes here */}

                <div className="w-auto">
                    <div className="flex justify-between">
                     
                        
                     <div className="flex items-center bg-white rounded-lg pr-3 ">
                         <input 
                            
                             type="text" 
                             placeholder='Search User'
                             className="rounded-lg focus:ring-0 border border-transparent transition-all duration-75"
                         />
                         <FiSearch className="text-base ml-2"/>
                       
                     </div>

                     <button className="rounded-md bg-primary hover:bg-[#f33636] text-sm self-start transition-all duration-300 px-6 py-2 ml-3 font-semibold text-white" onClick={openAddUser}>
                         Add User
                     </button>
                     
                    </div>

                    <div className='rounded-lg bg-white h-screen overflow-auto mt-8 shadow-sm shadow-white'>
                        <AllUsersTable 
                            openDeleteUser = {openDeleteUser}
                            openEditUserForm = {openEditUserForm }
                        />
                    </div>

                        {/* {pagination && <div className="mt-3 flex justify-end">
                            <Pagination pageLimit={pagination.per_page} totalRecords={pagination.total} links={pagination.links} onPageResponse={(data) => paginateResult(data)} />
                        </div>} */}

                    {isOpenAddUser && 
                        <CustomModal 
                            childern={<AddUserForm closeModal={closeModal}/>}
                            closeModal ={closeModal}
                        />
                    
                    }
                    
                    {isEditUser && 
                        <CustomModal 
                            childern={<EditUserForm user={{name:"Godwin"}}  closeModal ={closeModal}/>}
                            closeModal ={closeModal}
                        />
                    } 
                    {isDeleteUser &&
                        <CustomModal 
                            closeModal={closeModal}
                            childern={<DeleteUserDialog userID ={0} closeModal={closeModal}/>}
                        
                        />
                    }  
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
