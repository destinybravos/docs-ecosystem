import { useDebounce } from '@/hooks/Search'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchPage = () => {
  const [documents, setDocuments] = useState([]);

  const searchDocuments = useDebounce(async (query)=>{
    await axios.post(route('api.fetch_documents'), {search_param: query})
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
                <input type="text" className="py-2 pr-8 rounded-lg outline-none ring-0 focus:ring-0 focus:outline-none border border-primary w-full transition-all duration-500" placeholder="Search Ecosystem"
                  onKeyUp={(e) => searchDocuments(e.target.value) } />
                <BiSearch size={20} className="absolute right-6" />
            </aside>
        </div>

        <div className="px-4 py-3 min-h-full md:min-h-[150px] md:max-h-[450px] overflow-y-auto overflow-x-hidden">

        </div>
    </section>
  )
}

export default SearchPage