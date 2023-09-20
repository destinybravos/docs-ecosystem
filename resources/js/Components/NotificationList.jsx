import { Link } from '@inertiajs/react'
import React from 'react'

const NotificationList = ({notifications}) => {
    const updateNotifications = (notification_id) => {
        axios.post(route(`api.update_notification`), {notification_id : notification_id});
    }
    return (
        <>
            <div className="absolute -right-2 top-10 w-56 bg-slate-50 shadow-md border rounded-md">
                {notifications.length > 0 ? <ul className="divide-y text-left relative z-40">
                    {notifications && notifications.map((notification) => (<li key={notification.id}
                        className='py-1 px-2 text-sm'>
                            <Link href={notification.data.link} onClick={() => updateNotifications(notification.id) } dangerouslySetInnerHTML={{__html: notification.data.message}}></Link>
                    </li>))}
                </ul>:
                <ul>
                    <li className='py-1 px-2'>
                        No notifications available
                    </li>
                </ul>}
            </div>
            <div className="absolute h-4 w-4 bg-slate-50 border-t border-l right-0 top-8 rotate-45 z-30"></div>
        </>
    )
}

export default NotificationList