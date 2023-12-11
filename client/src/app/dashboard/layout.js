"use client"
import Image from 'next/image'

import LogOut from './logout/page'

export default function DashboardLayout({ children }) {

return(
<div>
{/* <Image src={horizontalDrafted}
                  alt="logo"
                 height="100"
                  width="200"/> */}
     <h1 className='font-trocchi p-3 font-bold text-5xl tracking-wider text-sky-900 underline underline-offset-8 decoration-dashed decoration-red-600'>DRAFTED</h1>
     <div className>
          <span className="flex gap-4 m-3 font-mono font-bold text-sky-700 outline-1"> 
                  <LogOut/>
            </span>
           </div>
     {children}
              
</div>
)
  }