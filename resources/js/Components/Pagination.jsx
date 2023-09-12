import React from 'react'
import { Link } from '@inertiajs/react'

function Pagination({ links, classes, pageLimit, totalRecords, onPageResponse }) {
    const fetchPaginate = (url) => {
        axios.post(url)
        .then((res) => {
            onPageResponse(res.data.body);
        })
    }
    return (
        <div>
            {
                (totalRecords > pageLimit) && (
                    <div className={`${classes}`}>
                        <div className="flex flex-wrap flex-initial -mb-1 ml-auto">
                            {
                                links.map((link,i)=>(
                                    <div  key={i}>
                                        {
                                            (link.url === null) ? (
                                                <div  className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded" dangerouslySetInnerHTML={{ __html: link.label }} />
                                            ) : (
                                                <button className={`${ link.active && 'bg-blue-500 hover:text-gray-50 dark:bg-gray-600 dark:text-white text-gray-50' } mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded dark:text-gray-700 hover:bg-gray-400 hover:text-white dark:bg-gray-300 dark:hover:bg-blue-400 bg-gray-50 dark: focus:border-indigo-500 focus:text-indigo-500`} onClick={() => fetchPaginate(link.url)}  dangerouslySetInnerHTML={{ __html: link.label }} />
                                            )
                                        }
                                        </div>
                                ))
                            }
                            
                </div>
            </div>
                )

            }
         
        </div >
    )
}

export default Pagination