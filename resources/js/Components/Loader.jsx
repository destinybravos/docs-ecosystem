import React from 'react'
import loader from '../Assets/images/loader.gif'

const Loader = ({message = "Processing request...", className = '', withMessage = true}) => {
  return (
    <div className={'flex items-center' + className}>
        {withMessage && <span>{message}</span> }
        <img src={loader} className="h-4 ml-1"/>
    </div>
  )
}

export default Loader