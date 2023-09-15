import { useDebounce } from '@/hooks/Search'
import { Link } from '@inertiajs/react';
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsDownload, BsEye } from 'react-icons/bs';
import wordIcon from '@/Assets/Images/wordIcon.png';
import pdfIcon from '@/Assets/Images/pdfIcon.png';
import excelIcon from '@/Assets/Images/excelIcon.png';
import pPointIcon from '@/Assets/Images/ppoint.png';

const SearchPage = () => {
  const [documents, setDocuments] = useState([]);

  const searchDocuments = useDebounce(async (query)=>{
    await axios.post(route('api.search_documents'), {search_param: query})
    .then((response) => {
        setDocuments(response.data.body.documents);
    })
    .catch((err) => {
        console.log("Error::=>", err?.response?.data);   
    })
 }, 500)


  return (
    <section>
        <div className="relative">
            <aside className="flex items-center px-4 py-3">
                <input type="text" autoFocus className="py-2 pr-8 rounded-lg outline-none ring-0 focus:ring-0 focus:outline-none border border-primary w-full transition-all duration-500" placeholder="Search Ecosystem"
                  onKeyUp={(e) => searchDocuments(e.target.value) } />
                <BiSearch size={20} className="absolute right-6" />
            </aside>
        </div>

        <div className="px-4 py-3 min-h-full md:min-h-[150px] md:max-h-[450px] overflow-y-auto overflow-x-hidden">
          <ul className='divide-y'>
            {documents?.data && documents?.data.map((document) => (
              <li key={document.id} className="py-2">
                <div className="flex gap-2 items-start">
                    {/* Icon */}
                    <aside>
                        {document.files[0].type}
                        {document.files[0].ext}
                        {document.files[0].path + document.files[0].name}
                        <img src={wordIcon} alt="doc" className="h-10 mx-auto" />
                    </aside>
                    {/* Details */}
                    <aside className="flex-grow">
                        <h2 className="text-lg font-bold">
                            { document.doc_name }
                        </h2>
                        <section className="flex items-center gap-3 text-sm mb-">
                            <aside>
                                <BsEye className='inline' /> {document.no_views ? document.no_views : 0} Views
                            </aside>
                            <aside>
                                <BsDownload className='inline' /> {document.no_downloads ? document.no_downloads : 0} Downloads
                            </aside>
                        </section>
                        <div className="flex justify-end">
                            <Link href={route('document.view', [document.id])} className={`bg-primary text-xs py-1 px-2 rounded-md text-white`}>
                                <BsEye className='inline mr-1' size={16} /> View
                            </Link>
                        </div>
                    </aside>
                </div>
              </li>
            ))}
          </ul>
        </div>
    </section>
  )
}

export default SearchPage