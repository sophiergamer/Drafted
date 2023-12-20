"use client"
import Image from 'next/image'
import RepRoster from "./RepRoster/page"
import LeagueInfo from './LeagueInfo/page'
import LogOut from './logout/page'
import {useState, useEffect} from 'react'
import About from './About/page'

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState({})
  const [myLeagues, setMyLeagues] = useState([])

  useEffect(()=>{
      fetch("/api/myaccount/leagues")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setMyLeagues( data)})
  },[])

  useEffect(()=>{
    fetch("/api/myaccount")
    .then(response=>response.json())
    .then(data=>setUser(data))
},[])
  
return(
<div>
     <h1 className='font-trocchi p-3 font-bold text-7xl tracking-wider text-sky-900 underline underline-offset-8 decoration-dashed decoration-red-600'>DRAFTED</h1>
     <div >
          <span className="flex gap-4 m-3 font-mono font-bold text-sky-700 outline-1"> 
                <About/>
                  <LogOut/>
            </span>
            <button className='p-3 m-3 bg-white outline-dashed outline-2 outline-red-600 rounded-lg '>Welcome, {user.name}!</button>
          <div className='flex p-5 flex-auto'>
            <RepRoster myLeagues={myLeagues}
                        setMyLeagues={setMyLeagues}
                      />
            <LeagueInfo myLeagues={myLeagues}
                        setMyLeagues={setMyLeagues}/>
          </div>
           </div>
     {children}
              
</div>
)
  }