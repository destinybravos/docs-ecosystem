import React from 'react';
import avatar from '../Assets/avatar.svg';
import { FaTimesCircle } from 'react-icons/fa';
import {VscGear} from 'react-icons/vsc';

const AllUsersTable = ({openEditUserForm, openDeleteUser,getUserID,getUser,users, pagination }) => {


  return (
    <table className="w-full">
        <thead className="bg-primary text-sm font-extrabold text-white">
            <tr className="text-left border-b border-b-[#eef0f3] p-14">
                <th className="p-2">
                    <input type="checkbox" />
                </th>
                <th className="p-2">Name</th>
                <th className="p-2">User Role </th>
                <th className="p-2">Actions</th>
            </tr>
        </thead>

        <tbody>

            {pagination && <tr className="bg-gray-50">
                <td colSpan={4} className="p-4 dark:text-black">Showing {pagination.data?.length} of {pagination.total} total Users</td>
            </tr>}

           
                    <tr className='border-b border-b-[#eef0f3]' key={1}>
                        <td className="p-2">
                            <input type="checkbox" />
                        </td>

                        <td className="flex items-center sm:p-2 pr-12 pl-4 py-4">
                            <img src={ avatar} className="w-[45px] h-[45px] object-cover rounded-full mr-4"/>
                            <div>
                                <h5 className="text-sm font-semibold text-black">Moses Yusuf</h5>
                                <p className="font-normal text-[13px] text-slate-500">moses@gmail.com</p>
                            </div>
                        </td>

                      

                        <td className="p-2">
                            <div className="flex gap-3">
                                <p className="bg-primary hover:bg-[#f33636] transition-all duration-300 py-1 px-2 text-xs rounded-full text-white cursor-pointer text-center">Student</p>
                            </div>
                        </td>

                        
                        <td className="p-2">

                            <div className="flex gap-2 text-slate-500">
                                <div id={1} className="flex items-center cursor-pointer hover:text-slate-800" onClick={openEditUserForm }>
                                    <VscGear className="text-base mr-1"/>

                                    <small  className="pr-1 inline-block">Modify</small> <small>Roles</small>
                                </div>


                                <div id={20} className="flex items-center cursor-pointer hover:text-slate-800" onClick={openDeleteUser}>
                                    <FaTimesCircle className="text-base mr-1"/>
                                    <small  className="pr-1 inline-block">Remove </small><small>User</small>
                                </div>
                            </div>
                        </td>

                    </tr>
              
            
            
        </tbody>
    </table>
  )
}

export default AllUsersTable