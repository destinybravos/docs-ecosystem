import axios from 'axios';
import React from 'react';
import Loader from '@/Components/Loader';

const DeleteUserDialog = ({userID,closeModal}) => {

    const[isProcessing, setIsProcessing] = React.useState(false);

    const deleteUser = async ()=>{
        setIsProcessing(true);

        try{
            const res = await axios.post(route('api.admin.delete_users'), {'user_id' :userID});
            setIsProcessing(false);
            alert(res.data.message);
            closeModal();
        }catch(error){
            setIsProcessing(false);
            console.log(error);
            alert("Could not reach the server. Please try again!");
            closeModal();

        }
    };

  return (
    <div className="px-2">
       
        <h2 className="font-extrabold border-b mb-4">Delete User</h2>
        <p className="text-base">Are you sure you want to delete this user?</p>

        <div className="mt-10 flex">
           
            <button  className="px-4 py-2 mr-2 bg-gray-300 rounded-sm" onClick={closeModal}>Cancel</button>
            
            <button className="px-4 py-2  bg-red-700 rounded-sm text-white" onClick={deleteUser}>Delete</button>
        </div>
        {isProcessing && <Loader />}
    </div>
  )
}

export default DeleteUserDialog