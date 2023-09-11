import React from 'react'
import InputLabel from '@/Components/InputLabel';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';
import Loader from '@/Components/Loader';




const AddUserForm = ({closeModal}) => {
    const[isProcessing, setIsProcessing] = React.useState(false);

  // submit data
  const submitData = (e) =>{
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
        console.log(err)
    })
  }

  return (
    <div>
        <div className='text-md font-bold'>Add User</div>
         <form onSubmit={(e)=> submitData(e) }  className="mt-4">
            <div className='flex flex-col gap-3 '>


                <div className=" p-1  flex items-center gap-4 space-x-3">
                    <select name="role" id="role" className='bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none'>
                        <option value="" selected="selected">- Select user type-</option>
                        <option value="Student">Student</option>
                        <option value="Staff">Staff</option>
                       
                    </select>
                    <input type='text' name='firstname' placeholder='Enter firstname' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                   
                </div>

                <div className=" p-1  flex items-center gap-4 space-x-3">
                    <select name="role" id="role" className='bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none'>
                        <option value="" selected="selected">- Select Department-</option>
                        <option value="Student">Mechanical Engineering</option>
                        <option value="Staff">Electrical Engineering</option>
                       
                    </select>
                   
                </div>

                <div className=" p-1  flex items-center gap-4 space-x-3">
                  
                    <input type='text' name='lastname' placeholder='Enter Lastname' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />

                    <input type='text' name='username' placeholder='Enter username' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                   
                </div>

                <div className=" p-1  flex items-center gap-4 ">
                  
                  <input type='password' name='password'  placeholder='Enter Password'  className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />

                  <input type='email' name='email' placeholder='Enter Email Address' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                 
                </div>

                <div className="flex items-center gap-4 mb-4 space-x-3">
                    <div className='bg-gray-100 rounded-md px-2 py-2 w-full flex'>
                        <FaUserAlt size={20}/>
                        
                        <InputLabel htmlFor="avatar" value="Choose Profile Photo" className='' />
                        <input type='file' name='avatar' id='avatar' className="hidden bg-gray-100" />
                    </div>
                    <div className='w-full'>
                    <input type='text' name='phone' placeholder='Enter Phone No' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
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