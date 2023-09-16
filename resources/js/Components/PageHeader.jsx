import React, { useState } from 'react'
import logo from '@/Assets/Images/logo.png';
import { Link } from '@inertiajs/react';
import { BsMenuButtonWide } from 'react-icons/bs';
import { VscSignIn, VscDashboard } from 'react-icons/vsc';
import { FiUserPlus } from 'react-icons/fi';

const PageHeader = ({user}) => {
    const [openNav, setOpenNav] = useState(false);
    return (
        <header className={`bg-white sticky top-0 px-4 py-3 z-40`}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center relative">
                {/* Logo and Harmburger for mobile toggle */}
                <aside className="flex items-center justify-between  w-full text-primaryDark">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="logo" className="h-10" />
                        <div>
                            <h1 className="text-xl font-black my-0 leading-5">DOCs</h1>
                            <h1 className="text-lg font-black my-0 leading-5">EcoSystem</h1>
                        </div>
                    </div>

                    <button className="md:hidden" onClick={() => setOpenNav((prev) => !prev)}>
                        <BsMenuButtonWide className="h-7 w-7" />
                    </button>
                </aside>
                
                {/* Navigation */}
                <ul className={`${openNav ? 'top-12' : '-top-56'} transition-all duration-500 text-sm px-2 py-2 space-y-2 md:space-y-0 flex flex-col md:flex-row gap-3 flex-shrink-0 text-primaryDark w-full md:w-auto absolute md:static bg-slate-50 md:bg-transparent shadow-md md:shadow-none rounded-md md:rounded-none border md:border-none`}>
                    <li className="">
                        <Link href={route('homepage')} className="py-2 px-4">Home</Link>
                    </li>
                    <li className="">
                        <Link href={route('homepage')} className="py-2 px-4">About</Link>
                    </li>
                    <li className="">
                        <Link href={route('homepage')} className="py-2 px-4">Motivation</Link>
                    </li>
                    { user ? (
                    <li className="md:ml-8">
                        <Link href={route('dashboard')} className="py-2 px-4 bg-primary rounded-lg text-white">
                            <VscDashboard className="inline-block w-5 h-5" /> <span>Dashboard</span>
                        </Link>
                    </li>
                    ) : <>
                        <li className="md:ml-8">
                            <Link href={route('login')} className="py-2 px-4 border-primary border rounded-lg text-primary">
                                <VscSignIn className="inline-block w-5 h-5" /> <span>Login</span>
                            </Link>
                        </li>
                        <li className="">
                            <Link href={route('register')} className="py-2 px-4 bg-primary rounded-lg text-white">
                                <FiUserPlus className="inline-block w-5 h-5" /> <span>Sign Up</span>
                            </Link>
                        </li>
                    </>}
                </ul>
            </div>
        </header>
    )
}

export default PageHeader