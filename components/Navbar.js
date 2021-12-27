import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import Link from 'next/link';

const menuItems = [
  { name: 'Home', icon: <FcHome className="w-5 h-5 mr-2" />, href: '/' },
  { name: 'Search', icon: <BsSearch className="w-5 h-5 mr-2" />, href: '/search' },
  { name: 'Buy Property', icon: <FcAbout className="w-5 h-5 mr-2" />, href: '/search?purpose=for-sale' },
  { name: 'Rent Property', icon: <FiKey className="w-5 h-5 mr-2" />, href: '/search?purpose=for-rent' },
]

function Navbar() {
  return (
    <div className=" flex justify-between border-b border-gray-200 py-4 px-2">
      <Link href='/' passHref>
        <h1 className="text-3xl font-bold text-blue-400 cursor-pointer">Realtor</h1>
      </Link>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="p-2 border rounded-md bg-opacity-20 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <FcMenu />
          </Menu.Button>
        </div>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-100 focus:outline-none">
            <div className="px-1 py-1 ">
              {menuItems.map(({ name, icon, href }) => (
                <Link href={href} key={name} >
                  <a>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={`${active ? 'bg-gray-200' : 'text-gray-900'
                            }  flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {icon}
                          {name}
                        </div>
                      )}
                    </Menu.Item>
                  </a>
                </Link>

              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div >
  )
}

export default Navbar
