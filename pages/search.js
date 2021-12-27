import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import noresult from '../assets/images/noresult.svg';
import { fetchApi } from '../utils/fetchApi';
import Property from './../components/Property';
import SearchFilters from './../components/SearchFilters';

function Search({ properties }) {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter()
  return (
    <div className="">
      <div className='bg-gray-100 p-4'>
        <button onClick={() => setSearchFilters(!searchFilters)} className="flex items-center justify-center w-full">
          <h1 className="text-xl font-extrabold">Search Property ByFilters</h1>
          <BsFilter className='w-6 h-6 ml-4' />
        </button>
        <SearchFilters className={`overflow-hidden ease duration-150 ${searchFilters ? "py-4 max-h-screen" : "max-h-0"}`} />
      </div>
      <h1 className="text-2xl font-bold p-4">Properties {router.query.purpose}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {properties.hits.map(property => <Property property={property} key={property.id} />)}
      </div>
      {properties.hits.length === 0 && (
        <div className="flex flex-col items-center gap-4 my-4">
          <Image src={noresult} alt='' />
          <p className="text-xl">No Result Found.</p>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const minPrice = query.minPrice || '0'
  const maxPrice = query.maxPrice || '1000000'
  const areaMax = query.areaMax || '35000'
  const roomsMin = query.roomsMin || '0'
  const bathsMin = query.bathsMin || '0'
  const purpose = query.purpose || 'for-rent'
  const sort = query.sort || 'price-desc'
  const rentFrequency = query.rentFrequency || 'yearly'
  const categoryExternalID = query.categoryExternalID || '4'
  const locationExternalIDs = query.locationExternalIDs || '5002'

  const params = { minPrice, maxPrice, areaMax, roomsMin, bathsMin, purpose, sort, rentFrequency, categoryExternalID, locationExternalIDs }
  const properties = await fetchApi('/properties/list', params)
  return {
    props: {
      properties: properties
    }
  }
}

export default Search

