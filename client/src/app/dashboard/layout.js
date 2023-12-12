"use client"
import Image from 'next/image'
import RepRoster from "./RepRoster/page"
import LeagueInfo from './LeagueInfo/page'
import LogOut from './logout/page'
import {useState, useEffect} from 'react'

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState({})

  useEffect(()=>{
    fetch("/api/myaccount")
    .then(response=>response.json())
    .then(data=>setUser(data))
},[])
  
return(
<div>
     <h1 className='font-trocchi p-3 font-bold text-5xl tracking-wider text-sky-900 underline underline-offset-8 decoration-dashed decoration-red-600'>DRAFTED</h1>
     <div >
          <span className="flex gap-4 m-3 font-mono font-bold text-sky-700 outline-1"> 
                  <LogOut/>
            </span>
            <h2 className='p-3'>Welcome, {user.name}!</h2>
          <div className='flex p-5 flex-auto'>
            <RepRoster/>
            <LeagueInfo/>
          </div>
           </div>
     {children}
              
</div>
)
  }