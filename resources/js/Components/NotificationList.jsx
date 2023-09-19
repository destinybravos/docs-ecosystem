import React from 'react'

const NotificationList = ({notifications}) => {
  return (
    <div className="absolute right-0 top-[120%] w-56 bg-slate-100 border rounded-md">
        {notifications.length > 0 ? <ul className="divide-y text-left">
            {notifications && notifications.map((notification) => (<li key={notification.id}
                className='py-1 px-2 text-sm'>
                    <span dangerouslySetInnerHTML={{__html: notification.data.message}}></span>
            </li>))}
        </ul>:
        <ul>
            <li className='py-1 px-2'>
                No notifications available
            </li>
        </ul>}

    </div>
  )
}

export default NotificationList