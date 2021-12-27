import Image from 'next/image'
import React from 'react'
import { GoVerified } from 'react-icons/go'
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import millify from 'millify';
import Link from 'next/link';
import DefaultImage from '../assets/images/house.jpg'
function Property({ property: { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID } }) {
  return (
    <Link href={`/property/${externalID}`}>
      <a className="flex flex-col">
        <Image className='object-center object-cover' src={coverPhoto ? coverPhoto.url : DefaultImage} alt="" width={400} height={260} />
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
          <h2 className="text-lg">{title.substring(0, 40)}...</h2>
        </div>
      </a>
    </Link>
  )
}

export default Property
