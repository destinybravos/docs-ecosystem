import React from 'react'
import loader from '../Assets/images/loader.gif'

const Loader = () => {
  return (
    <div className="flex items-center mt-2">
        <span>Processing request...</span>
        <img src={loader} className="h-4 ml-1"/>
    </div>
  )
}

export default Loader