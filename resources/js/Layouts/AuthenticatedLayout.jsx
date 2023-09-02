import { useEffect, useState } from 'react';
import { RiAlignLeft } from 'react-icons/ri'
import { FaRegBell } from 'react-icons/fa'
import { RxDashboard } from 'react-icons/rx'
import { BiCalendar } from 'react-icons/bi'
import { BiTimeFive } from 'react-icons/bi'
import { MdPointOfSale } from 'react-icons/md'
import { MdOutlineInventory2 } from 'react-icons/md'
import { FaRegWindowClose } from 'react-icons/fa'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { GiStockpiles } from 'react-icons/gi'
import { FaUsersCog, FaUsers } from 'react-icons/fa'
import logo from '@/Assets/Images/logo.png';
import Dropdown from '@/Components/Dropdown';
import { Link, Head } from '@inertiajs/react';
import avatar from './../Assets/avatar.svg';

export default function Authenticated({ user, header, children }) {
    const [dateState, setDateState] = useState(new Date());
    const [nav_open, openNav] = useState(false);

    useEffect(() => {
           setInterval(() => setDateState(new Date()), 1000);
    }, []);

    return (
        <>
            <div className="min-h-screen bg-slate-100 dark:bg-black text-slate-700 dark:text-slate-100">
                {/* Side Bar Section */}
                <section aria-label="sidebar" className={`fixed z-50 h-full w-56 ${nav_open ? 'left-0' : '-left-56'} md:left-0 bg-white dark:bg-slate-900 border-r transition-all duration-500`}>
                    <div className="h-full flex flex-col justify-between">
                        {/* App Name or Logo */}
                        <aside className="pb-4 pt-3 px-4 relative">
                            <div className="flex items-center gap-3 text-primaryDark pb-3 border-b">
                                <img src={logo} alt="logo" className="h-10" />
                                <div>
                                    <h1 className="text-xl font-black my-0 leading-5">DOCs</h1>
                                    <h1 className="text-lg font-black my-0 leading-5">EcoSystem</h1>
                                </div>
                            </div>
                            <button className="absolute right-4 top-5 text-primary block md:hidden" onClick={() => openNav((openState) => !openState)}>
                                <FaRegWindowClose size={20} fontWeight={`bold`} />
                            </button>
                        </aside>

                        {/* Navigation Segment */}
                        <nav className="flex-grow text-base">
                            <ul>
                                <li className={` ${route().current('dashboard') && 'border-l-4 border-l-primary text-primary'}`}>
                                    <Link href={route('dashboard')} className={`px-6 py-2 flex items-center`}>
                                        <RxDashboard className="mr-2" /> Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Extra Navigation or Logout Button */}
                        <aside className="p-4">
                            <div className='text-sm flex items-center divide-x gap-x-4'>
                                <p className="font-semibold">
                                    <BiCalendar className="text-primary" size={20}  />
                                    {dateState.toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </p>
                                <p className="font-semibold pl-2">
                                    <BiTimeFive className="text-primary" size={20} />
                                    {dateState.toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                        hour12: true,
                                    })}
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* Main Section */}
                <section aria-label="main content" className="w-auto md:ml-56 min-h-[500px]">
                    {/* Header Section */}
                    <header className="min-h-[20px] z-40 bg-white dark:bg-slate-900 border-b sticky top-0">
                        {/* Header Top Section */}
                        <div className="px-4 py-2 flex items-center justify-between border-b">
                            <aside className="flex items-center gap-x-1 md:gap-x-6">
                                <button onClick={() => openNav((openState) => !openState)}>
                                    <RiAlignLeft size={20} fontWeight={`bold`} />
                                </button>
                                {/* <Link href={route('pos')} className={`px-2 py-1 gap-1 md:text-sm sm:text-xs text-xs flex items-center bg-primary text-white rounded-lg`}>
                                    <MdPointOfSale className="md:mr-2 sm:mr-0 mr-1" /> Make <span>Sales</span>
                                </Link> */}
                            </aside>
                            <aside className="flex items-center divide-x gap-x-2">
                                <div aria-label="top-right-icons" className="md:px-2 flex items-center gap-5">
                                    <button className="relative">
                                        <FaRegBell size={20} />
                                        <div className="absolute h-4 w-4 -top-2 -left-1 rounded-full bg-primary text-[0.6rem] flex items-center justify-center text-white p-1">
                                            0
                                        </div>
                                    </button>
                                </div>
                                <div aria-label="active-user-details" className="md:px-2">
                                    <div className="relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center pl-3 border border-transparent text-sm leading-4 font-medium rounded-md bg-white hover:text-slate-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        <div className="flex gap-x-3">
                                                            <img src={user.avatar ? user.avatar : avatar} alt=' ' className="rounded-full h-9 w-9 bg-slate-300" />
                                                            <aside className="hidden md:block text-left">
                                                                <strong>{user.firstname} {user?.lastname}</strong> <br />
                                                                <small className="text-slate-500">{user.account_id}</small>
                                                            </aside>
                                                        </div>

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            </aside>
                        </div>

                        {/* Header Under Section*/}
                        {header && (<div className="px-4">
                            {header}
                        </div>)}
                    </header>

                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-2">
                            {/* Unique Page Contents */}
                            <main>{children}</main>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
