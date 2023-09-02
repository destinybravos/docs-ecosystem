import ApplicationLogo from '@/Assets/Images/logo.png';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-6 sm:pt-0 bg-primary dark:bg-gray-900 px-4">
            <div className="mt-4">
                <Link href="/">
                    <img src={ApplicationLogo} className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
                {children}
            </div>
        </div>
    );
}
