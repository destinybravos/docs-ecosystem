import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';
import InputLabel from '@/Components/InputLabel';
import { BsSave2Fill } from 'react-icons/bs';

export default function ForgotPassword({ auth, status, departments }) {
    const { data, setData, post, processing, errors } = useForm({
        department_id: '',
        account_id: '',
        phone: '',
        level: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('save_complete_userdata'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <h1 className="text-2xl font-bold">Complete Registration</h1>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Kindly complete your registration by entering these extra fields below;
            </div>

            {status && <div className="mb-4 font-medium text-sm text-red-600 dark:text-red-400">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Department" />
                    <SelectInput
                        required
                        id="department_id"
                        name="department_id"
                        defaultValue={data.department_id}
                        className="mt-1 block w-full"
                        autoComplete="department_id"
                        isFocused={true}
                        onChange={(e) => setData('department_id', e.target.value)}
                    >
                        <option value="">Select Department</option>
                        {departments.length > 0 && departments.map((department) => (
                            <option key={department.id} value={department.id}>{department.name}</option>
                        )) }
                    </SelectInput>
                    <InputError message={errors.department_id} className="mt-2" />
                </div>
                
                <div className='mt-4'>
                    <InputLabel htmlFor="email" value="Level" />
                    <SelectInput
                        required
                        id="level"
                        name="level"
                        defaultValue={data.level}
                        className="mt-1 block w-full"
                        autoComplete="level"
                        onChange={(e) => setData('level', e.target.value)}
                    >
                        <option value="">Select Level</option>
                        <option value="100 Level">100 Level</option>
                        <option value="200 Level">200 Level</option>
                        <option value="300 Level">300 Level</option>
                        <option value="400 Level">400 Level</option>
                        <option value="500 Level">500 Level</option>
                    </SelectInput>
                    <InputError message={errors.level} className="mt-2" />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor="email" value="Registration | Matric No." />
                    <TextInput
                        required
                        id="account_id"
                        type="text"
                        name="account_id"
                        placeholder="Enter your registration or Matric Number"
                        defaultValue={data.account_id}
                        className="mt-1 block w-full"
                        autoComplete="account_id"
                        onChange={(e) => setData('account_id', e.target.value)}
                    />
                    <InputError message={errors.account_id} className="mt-2" />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor="email" value="Phone Number" />
                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="Enter your Phone Number"
                        defaultValue={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        <BsSave2Fill className="inline w-7 h-7 mr-3" /> Save & Proceed
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
