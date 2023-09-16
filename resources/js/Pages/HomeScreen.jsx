import PageBanner from '@/Components/PageBanner';
import BaseLayout from '@/Layouts/BaseLayout';
import { Link, Head } from '@inertiajs/react';
import coverImg from '@/Assets/Images/coverImg.png';

export default function Welcome({ auth }) {
    return (
        <BaseLayout auth={auth}>
            <Head title="Welcome" />
            <PageBanner />

            {/* About Section  Start*/}
            <section className='bg-white  py-12 lg:py-20 px-0 md:px-3'>
                <div className="max-w-6xl mx-auto">

                    <div className='flex flex-col lg:flex-row gap-x-5 items-center'>

                        <div className='w-full lg:w-2/4'>
                            <div className='text-center lg:text-left overflow-hidden' data-aos="fade-right" data-aos-delay="400">
                                <img src={coverImg} className='w-full inline-block'/>
                            </div>
                        </div>


                        <div className='w-full lg:w-2/4 px-4 lg:px-0'>
                            {/*About us Text Start */}
                            <div className='bg-white px-4 lg:px-10 py-5  dark:bg-slate-950 dark:text-white' data-aos="slide-up">
                                <div className=''>
                                    <h2 className='text-3xl  md:text-4xl font-bold text-slate-600 dark:text-white'>
                                        Access School Documents with Ease.
                                    </h2>
                                    <div className='mt-2 lg:mt-8'>
                                        <h3 className='text-xl font-bold mb-1 text-black dark:text-white'>Our Simple Yet Effective Mission.</h3>
                                        <p className='leading-[140%] mb-7'>
                                           The School Document Ecosystem Software is developed with the aim and intension of making
                                           access to official school documents easier for both staff and students across all level of the institution.
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                            {/*About us Text End */}


                
                        </div>

                    </div>
                </div>
            </section>
            {/* About Section End */}


            {/* Section Get Started Start */}
            <section className="overflow-hidden py-12 lg:py-20 px-0 md:px-3 bg-[rgb(244,244,244)]">
               
                    <div className="max-w-6xl mx-auto">

                        <div className='mb-16 text-center'>
                            <h2 className='font-black text-4xl'>Get started in minutes</h2>
                            <p className='uppercase'>START SEARCHING FOR REQUIRED DOCUMENT WITH EASE!</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">


                            <div className=''>
                                <div className='py-7 px-3 text-center border-r border-slate-300' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                    {/* <GiTrade className='text-6xl text-white inline-block' /> */}
                                    
                                    <h5 className='font-semibold text-xl'>1. Register</h5>
                                    <p className='mt-6'>
                                        Sign up to create your own account on the Ecosystem to get started
                                    </p>

                                </div>
                            </div>

                            <div className=''>
                                <div className='py-7 px-3 text-center border-r border-slate-300' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                    {/* <GiTrade className='text-6xl text-white inline-block' /> */}
                                    
                                    <h5 className='font-semibold text-xl'>2. Complete Profile</h5>
                                    <p className='mt-6'>
                                        Enter your bio data and your academic credentials to validate and activate your account.
                                    </p>

                                </div>
                            </div>

                            <div className=''>
                                <div className='py-7 px-3 text-center border-r border-slate-300' data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                    {/* <GiTrade className='text-6xl text-white inline-block' /> */}
                                    
                                    <h5 className='font-semibold text-xl'>3. Search Document</h5>
                                    <p className='mt-6'>
                                        Use the global search module on the dashboard to search for documents in the Ecosystem.
                                    </p>

                                </div>
                            </div>


                            <div className=''>
                                <div className='py-7 px-3 text-center'  data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                    {/* <GiTrade className='text-6xl text-white inline-block' /> */}
                                    
                                    <h5 className='font-semibold text-xl'>4. View/Download</h5>
                                    <p className='mt-6'>
                                        Preview and download the required document without hassle of visiting a physical location.
                                    </p>

                                </div>
                            </div>



                        </div>

                        <div className='text-center mt-12'>
                            <Link   className={`py-3 px-5 mx-2 md:mx-0 rounded-3xl bg-gradient-to-b from-primary to-primaryDark hover:bg-black text-white font-bold`}>
                                Get Started
                            </Link>
                        </div>

                    </div>
                
            </section>
             {/* Section Get Started End */}

        </BaseLayout>
    );
}
