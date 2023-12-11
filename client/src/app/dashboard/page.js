'use client'
import {useState, useEffect} from 'react'
import LogOut from './logout/page'
import Link from 'next/link'
import LeagueInfo from './LeagueInfo/page'
import RepRoster from './RepRoster/page'
import Image from 'next/image'
import horizontalDrafted from "../horizontalDrafted.png"

export default function Home() {
const [user, setUser] = useState({})



useEffect(()=>{
    fetch("/users/id")
    .then(response=>response.json())
    .then(data=>setUser(data))
},[])


return(
    <div >
        <div >
              <span className="flex-colitems-center tracking-wide">
              <ul className="flex gap-4">
                <li>
                <Image src={horizontalDrafted}
                  alt="logo"
                 height="100"
                  width="200"/>
                  <LogOut/>
                </li>
              </ul>
            </span>
        </div>
      <br/>
        <div>
            <LeagueInfo/>
            <RepRoster/>
        </div>
    </div>
)




// useEffect(()=>{
//     fetch(`/users/{user.id}`)
//     .then(response=>response.json())
//     .then(data=>setUser(data))
// },[])

// useEffect(()=>{
//     fetch(`/users/{user.id}/representatives`)
//     .then(response=> response.json())
//     .then(data=> setMyReps(data))
// },[])






}