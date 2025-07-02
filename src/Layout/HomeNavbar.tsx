import Link from 'next/link'
import React from 'react'

function HomeNavbar() {
  return (
    <div className='w-full items-center justify-between lg:px-20 md:px-10 px-3 h-20 shadow-md flex'>
      <Link href={"/"} className='text-2xl'>
        ঠা<span className='text-red-400'>প</span>👄
      </Link>

      <ul className='flex gap-2'>
        <li>
          <Link href={"/order"}>ঠাপানো <span className='text-red-400'>অর্ডার</span></Link>
        </li>
        <span className='text-gray-500'>|</span>
        <li>
          <Link href={"/history"}>ঠাপানোর <span className='text-red-400'>হিস্টরি</span></Link>
        </li>
        <li>
          <Link href={"/logout"}><span className='text-red-400'>logout</span></Link>
        </li>
      </ul>

    </div>
  )
}

export default HomeNavbar
