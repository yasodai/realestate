import { useRouter } from 'next/router';
import React from 'react';
import { filterData } from '../utils/filterData';


function SearchFilters({ className }) {
  const router = useRouter();

  const searchProperties = (e) => {
    const form = new FormData(e.currentTarget).entries()
    const data = Object.fromEntries(form)
    const { pathname, query } = router

    Object.entries(data).forEach(([name, value]) => query[name] = value)

    router.push({ pathname, query })
  }

  return (
    <form className={`flex flex-wrap justify-center gap-4 ${className}`} onChangeCapture={searchProperties}>
      {filterData.map(filter => (
        <select className='h-10 pl-3 pr-6 text-base border rounded-lg  outline-none focus:ring-1 ring-gray-300 ' key={filter.queryName} name={filter.queryName} >
          <option disabled selected>{filter.placeholder}</option>
          {filter.items.map(item => (
            <option key={item.value} value={item.value} >{item.name}</option>
          ))}
        </select>
      ))}

    </form>
  )
}

export default SearchFilters
