import React from 'react'
import bg from '@/Assets/Images/bg_1.jpg';
import student from '@/Assets/Images/student.png';
import { BsHandIndex } from 'react-icons/bs';
import { Link } from '@inertiajs/react';

const PageBanner = () => {
  return (
    <div className={`min-h bg-primaryDark bg-cover bg-no-repeat bg-center relative text-slate-100`} style={{backgroundImage: `url(${bg})`}}>
        <section className="bg-primaryDark bg-opacity-90 pt-20 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
                <div className="flex items-center justify-center text-center md:text-left mb-10">
                    <aside>
                        <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{textShadow:`0 0 10px #165a28`}}>
                            Unlimited Access To University <span className="text-secondary">Documents</span> Ecosystem!
                        </h1>
                        <p className="text-sm mb-5">
                            Get Unlimited Access to Required <span className="text-secondary">Documents</span> Without Stress!  
                            Sign up now to use the free documents ecosystem for all documents and templates needed in various 
                            sections and departments within the University.
                        </p>
                        <Link href={route('register')} className="bg-secondary text-primaryDark font-semibold py-2 px-4 rounded-lg inline-flex items-center gap-2">
                            <BsHandIndex className="inline-block rotate-90" /> Get Started
                        </Link>
                    </aside>
                </div>
                <div className="flex items-center justify-center">
                    <img src={student} alt="student image" className="" />
                </div>
            </div>
        </section>
    </div>
  )
}

export default PageBanner