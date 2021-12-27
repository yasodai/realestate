import React from 'react'
import { fetchApi } from '../../utils/fetchApi'
import ImageScrollbar from './../../components/ImageScrollbar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import Image from 'next/image';
function PropertyDetails({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos } }) {
  return (
    <div className="flex flex-col gap-4 p-4 ">
      <ImageScrollbar photos={photos} />
      <div className="flex flex-col gap-1.5">
        {/* 上 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className='text-green-500'>{isVerified && <GoVerified />}</span>
            <h3 className='text-lg font-bold'>AED {price}{rentFrequency && `/${rentFrequency}`}</h3>
          </div>
          <Image className='rounded-full object-scale-down object-center' src={agency?.logo?.url || '/'} alt="avatar" width={40} height={40} />
        </div>
        {/* 中 */}
        <div className="flex text-blue-500 gap-4 items-center">
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
        </div>
        {/* 下 */}
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-500 leading-relaxed">{description}</p>
      </div>
      <div className="flex flex-wrap uppercase justify-between">
        <div className="flex justify-between gap-16 p-3 border-b border-gray-200 w-[400px]">
          <h4 className="">Type</h4>
          <p className="font-bold">{type}</p>
        </div>
        <div className="flex justify-between  gap-16 p-3 border-b border-gray-200 w-[400px]">
          <h4 className="">purpose</h4>
          <p className="font-bold">{purpose}</p>
        </div>
        {furnishingStatus && (
          <div className="flex justify-between  gap-16 p-3 border-b border-gray-200 w-[400px]">
            <h4 className="">Furnishing Status</h4>
            <p className="font-bold">{furnishingStatus}</p>
          </div>
        )}
      </div>
      <div className="">
        {amenities && <h4 className="text-xl font-bold">Amenities</h4>}
        <div className="flex flex-wrap gap-2 p-2">
          {amenities.map(item => (
            item?.amenities?.map(amenity => (
              <span key={amenity.text} className="text-blue-400 bg-gray-200 font-bold py-1.5 px-2">{amenity.text}</span>
            ))
          ))}
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails


export async function getServerSideProps({ params: { id } }) {
  const propertyDetails = await fetchApi('/properties/detail', { externalID: id })
  return {
    props: {
      propertyDetails
    }
  }
}