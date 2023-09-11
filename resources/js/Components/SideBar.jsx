import { Link } from '@inertiajs/react'
import React from 'react'
import { FaUsers } from 'react-icons/fa'
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
            <li className={` ${route().current('add_document') && 'border-l-4 border-l-primary text-primary'}`}>
                <Link href={route('add_document')} className={`px-6 py-2 flex items-center`}>
                    <HiDocumentAdd className="mr-2" /> Add Documents
                </Link>
            </li>
            <li className={` ${route().current('manage_users') && 'border-l-4 border-l-primary text-primary'}`}>
                <Link href={route('manage_users')} className={`px-6 py-2 flex items-center`}>
                    <FaUsers className="mr-2" /> Manage Users
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default SideBar