import React from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'


const CustomModal = ({closeModal , childern}) => {
  return (
    <div className="fixed w-screen h-screen bg-gray-400 dark:bg-gray-900 bottom-0 bg-opacity-60 dark:bg-opacity-60 right-0 z-50 backdrop-blur-sm dark:backdrop-blur-sm flex items-center">
      <div className=" justify-center items-center w-full flex ">
        <div className="max-w-auto max-h-[90vh] overflow-y-auto overflow-x-hidden mx-auto relative bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
          <div className="bg-white w-8 h-8 flex items-center justify-center -right-1 -top-0 absolute rounded-full cursor-pointer" onClick={()=> closeModal()}><AiOutlineCloseCircle/></div>
          <div className="max-h-auto">{childern}</div>
        </div>
      </div>
    </div>
  )
}

export default CustomModal