import axios from 'axios';
import React from 'react';
import Loader from '@/Components/Loader';

const DeleteUserDialog = ({userID,closeModal}) => {

    const[isProcessing, setIsProcessing] = React.useState(false);
    const[errorMsg, setErorMsg] = React.useState(null);

    const deleteUser = async ()=>{
        setIsProcessing(true);

        try{
            const res = await axios.post(route('api.admin.delete_users'), {'user_id' :userID});
            setIsProcessing(false);
            alert(res.data.message);
            closeModal();
        }catch(error){
            setIsProcessing(false);
            if (error.response) {
                setErorMsg(error.response.data.message);
            } else {
                alert("Could not reach the server. Please try again!");
            }
        }
    };

  return (
    <div className="p-5">
       
        <h2 className="font-extrabold border-b mb-4">Delete User</h2>
        <p className="text-base">Are you sure you want to delete this user?</p>

        <div className="mt-10 flex">
           
            <button  className="px-4 py-2 mr-2 bg-gray-300 rounded-sm" onClick={closeModal}>Cancel</button>
            
            <button className="px-4 py-2  bg-red-700 rounded-sm text-white" onClick={deleteUser}>Delete</button>
        </div>
        {errorMsg && <span className="text-red-500 text-sm" >{errorMsg}</span> }
        {isProcessing && <Loader />}
    </div>
  )
}

export default DeleteUserDialog