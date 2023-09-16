import { Link } from '@inertiajs/react'
import React from 'react'
import { BsKey } from 'react-icons/bs'
import { FaSchool, FaUsers } from 'react-icons/fa'
import { HiDocumentAdd } from 'react-icons/hi'
import { RxDashboard } from 'react-icons/rx'

const SideBar = ({user}) => {
  return (
    <div>
        <ul>
            <li className={` ${route().current('dashboard') && 'border-l-4 border-l-primary text-primary'}`}>
                <Link href={route('dashboard')} className={`px-6 py-2 flex items-center`}>
                    <RxDashboard className="mr-2" /> Dashboard
                </Link>
            </li>
            <li className={` ${(route().current('document_ecosystem') || route().current('document.view')) && 'border-l-4 border-l-primary text-primary'}`}>
                <Link href={route('document_ecosystem')} className={`px-6 py-2 flex items-center`}>
                    <HiDocumentAdd className="mr-2 w-4 h-4" /> Documents
                </Link>
            </li>
            { (user.role === 'admin' || user.role === 'staff') && 
            <>
                <li className={` ${route().current('manage_users') && 'border-l-4 border-l-primary text-primary'}`}>
                    <Link href={route('manage_users')} className={`px-6 py-2 flex items-center`}>
                        <FaUsers className="mr-2" /> Manage Users
                    </Link>
                </li>
                <li className={` ${route().current('manage_doc_access') && 'border-l-4 border-l-primary text-primary'}`}>
                    <Link href={route('manage_doc_access')} className={`px-6 py-2 flex items-center`}>
                        <BsKey className="mr-2" /> Access Requests
                    </Link>
                </li>
                {(user.role === 'admin') && (<li className={` ${route().current('manage_departments') && 'border-l-4 border-l-primary text-primary'}`}>
                    <Link href={route('manage_departments')} className={`px-6 py-2 flex items-center`}>
                        <FaSchool className="mr-2" /> Departments
                    </Link>
                </li>)};
            </>}
        </ul>
    </div>
  )
}

export default SideBar