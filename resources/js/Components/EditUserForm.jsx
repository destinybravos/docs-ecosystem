import React from 'react'
import InputLabel from '@/Components/InputLabel';
import axios from 'axios';
import { FaUserAlt } from 'react-icons/fa';
import Loader from '@/Components/Loader';




const EditUserForm = ({user, closeModal}) => {
    const[isProcessing, setIsProcessing] = React.useState(false);
console.log(user);
  // submit data
  const submitData = (e) =>{
    e.preventDefault();
    const data = new FormData(e.target);
    setIsProcessing(true);
    axios.post(route('api.admin.update_user'), data)
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
    <div className='p-5'>
        <div className='text-md font-bold'>Edit User</div>
        <form onSubmit={(e)=> submitData(e) }  className="mt-4">
            <div className='flex flex-col gap-3 '>
                <input type="hidden" name='user_id'  value={user.id} readOnly={true}/>



                <div className=" p-1  flex items-center gap-4 space-x-3">
                    <select name="role" className='bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none'>
                        <option value="" selected="selected">- Select user type-</option>
                        <option value="Student">Student</option>
                        <option value="Staff">Staff</option>
                       
                    </select>
                    <input type='text' defaultValue={user.firstname} name='firstname'  placeholder='Enter firstname' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                   
                </div>

                <div className='p-1 flex items-center gap-4 space-x-3'>
                    <input type='text'defaultValue={user.lastname} name='lastname' placeholder='Enter Lastname' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                    <input type='text'defaultValue={user.account_id} name='account_id'  placeholder='Enter ID' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                </div>

                

                <div className=" p-1  flex items-center gap-4 ">
                  <input type='password' name='password'  placeholder='Enter Password'  className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                  <input type='email'name='email' defaultValue={user.email}placeholder='Enter Email Address' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                </div>

                <div className="flex items-center gap-4 mb-4 space-x-3">
                    <div className='bg-gray-100 rounded-md px-2 py-2 w-full flex'>
                        <FaUserAlt size={20}/>
                        
                        <InputLabel htmlFor="avatar" value="Choose Profile Photo" className='' />
                        <input type='file' name='avatar' id='avatar' className="hidden bg-gray-100" />
                    </div>
                    <div className='w-full'>
                    <input type='text' name='phone'  defaultValue={user.phone} placeholder='Enter Phone No' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-4 space-x-3">
                    <div className="w-full">
                        <select name="department_id"  className='bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none'>
                            <option value="" selected="selected">- Select Department-</option>
                            <option value="1">Mechanical Engineering</option>
                            <option value="2">Electrical Engineering</option>
                        
                        </select>
                    </div>  
                    <div className='w-full'>
                        <input type='text' name='level' defaultValue={user.level} placeholder='Enter Level' className="bg-gray-100 rounded-md px-2  w-full border-0  py-2 focus-within:outline-none" />
                    </div>
                </div>

               

            </div>
            <button className='bg-primary rounded-md px-6 py-2 text-white w-full'>Save Changes</button>
        </form>

        {
            isProcessing && <Loader />
        }

            
       
    </div>
  )
}

export default EditUserForm