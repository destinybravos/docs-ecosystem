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
    .then(res=>{    
        alert(res.data.message);
        setIsProcessing(false);
        closeModal();
    })
    .catch(err=>{
        setIsProcessing(false);
        alert("Could not process your request at this time. Please try again!")
        console.log(err)
    })
  }

  return (
    <div>
        <div className='text-md font-bold'>Add User</div>
         <form onSubmit={(e)=> submitData(e) }  className="mt-4">
            <div className='flex flex-col gap-3 '>


                <div className=" p-1  flex items-center gap-4 space-x-3">
                    <select name="role" required className='bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none'>
                        <option value="" selected="selected">- Select user type-</option>
                        <option value="Student">Student</option>
                        <option value="Staff">Staff</option>
                       
                    </select>
                    <input type='text' name='firstname' required placeholder='Enter firstname' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                   
                </div>
                <div className='p-1 flex items-center gap-4 space-x-3'>
                    <input type='text' name='lastname' required placeholder='Enter Lastname' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                    <input type='text' name='account_id' required placeholder='Enter ID' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                </div>

                <div className=" p-1  flex items-center gap-4 space-x-3">
                    <input type='text' name='username'required placeholder='Enter username' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                    <select name="department_id" required className='bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none'>
                        <option value="" selected="selected">- Select Department-</option>
                        <option value="1">Mechanical Engineering</option>
                        <option value="2">Electrical Engineering</option>
                    
                    </select>
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
                   
                    <div className='w-full'>
                        <input type='text' name='level' required placeholder='Enter Level' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
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