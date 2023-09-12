import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchPage = () => {
  return (
    <section>
        <div className="relative">
            <aside className="flex items-center px-4 py-3">
                <input type="text" className="py-2 pr-8 rounded-lg outline-none ring-0 focus:ring-0 focus:outline-none border border-primary w-full transition-all duration-500" placeholder="Search Ecosystem" />
                <BiSearch size={20} className="absolute right-6" />
            </aside>
        </div>

        <div className="px-4 py-3 min-h-full md:min-h-[150px] md:max-h-[450px] overflow-y-auto overflow-x-hidden">

        </div>
    </section>
  )
}

export default SearchPage