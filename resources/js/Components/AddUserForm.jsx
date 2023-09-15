import React from 'react'
import InputLabel from '@/Components/InputLabel';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';
import Loader from '@/Components/Loader';




const AddUserForm = ({closeModal}) => {
    const[isProcessing, setIsProcessing] = React.useState(false);

  // submit data
  const submitData = (e) =>{
    const data = new FormData(e.target);
    e.preventDefault()
    setIsProcessing(true);
    axios.post(route('api.admin.create_user'), data)
    .then((res)=>{    
        alert(res.data.message);
        setIsProcessing(false);
        closeModal();
    })
    .catch((err) => {
        setIsProcessing(false);
        alert("Could not process your request at this time. Please try again!")
        console.log(err)
    })
  }

  const[userType, setUserType] = React.useState('Student');
  return (
    <div className='p-5'>
        <div className='text-md font-bold'>Add User</div>
         <form onSubmit={(e)=> submitData(e) }  className="mt-4" encType="multipart/form-data">
            <div className='flex flex-col gap-3 '>

                <div className=" p-1  flex items-center gap-4 space-x-3">
                    <input type='text' name='firstname' required placeholder='Enter firstname' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                    <input type='text' name='lastname' required placeholder='Enter Lastname' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                </div>
                <div className='p-1 flex items-center gap-4 space-x-3'>
                    <select name="department_id" defaultValue={``} required className='bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none'>
                        <option value="">- Select Department-</option>
                        <option value="1">Mechanical Engineering</option>
                        <option value="2">Electrical Engineering</option>
                    
                    </select>
                    <input type='text' name='account_id' required placeholder='Staff ID/Matric No.' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                </div>

                <div className=" p-1  flex items-center gap-4 ">
                  <input type='password'required name='password'  placeholder='Enter Password'  className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                  <input type='email'required name='email' placeholder='Enter Email Address' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                </div>

                <div className="flex items-center gap-4 mb-4 space-x-3">
                    <div className='bg-gray-100 rounded-md px-2 py-2 w-full flex'>
                        <FaUserAlt size={20}/>
                        
                        <InputLabel htmlFor="avatar" value="Choose Profile Photo" className='' />
                        <input type='file' name='avatar' id='avatar' className="hidden bg-gray-100" />
                    </div>
                    <div className='w-full'>
                    <input type='text' name='phone' required placeholder='Enter Phone No' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-4 space-x-3">

                    <div className="w-full">
                        <select name="role" defaultValue={``} required className='bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none' onChange={(e)=>setUserType(e.target.value)}>
                            <option value="">- Select user type-</option>
                            <option value="Student">Student</option>
                            <option value="Staff">Staff</option>
                       
                        </select>
                    </div>  

                    <div className='w-full'>

                        {
                             (userType === 'Student')?(
                                <select name="level" defaultValue={``} required className='bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none'>
                                    <option value="">- Select level-</option>
                                    <option value="100 Level">100 Level</option>
                                    <option value="200 Level">200 Level</option>
                                    <option value="300 Level">300 Level</option>
                                    <option value="400 Level">400 Level</option>
                                    <option value="500 Level">500 Level</option>
                                    <option value="600 Level">600 Level</option>
                       
                                </select>
                            ):(
                                <select name="category" defaultValue={``} required className='bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none'>
                                    <option value="">- Select Category-</option>
                                    <option value="Academic Staff">Academic Staff</option>
                                    <option value="Non Academic Staff">Non Academic Staff</option>
                   
                                </select>
                            )
                        }
                        
                    </div>
                </div>

            </div>
            <button className='bg-primary rounded-md px-6 py-2 text-white w-full'>Add User</button>
        </form>

        {
            isProcessing && <Loader />
        }

            
       
    </div>
  )
}

export default AddUserForm