import HomeNavbar from '@/Layout/HomeNavbar'
import React from 'react'

function HomeLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='w-full flex flex-col'>
      <header className='sticky z-[1000] bg-white top-0 left-0'>
        <HomeNavbar />
      </header>
        <main>
            {children}
        </main>
    </div>
  )
}

export default HomeLayout
