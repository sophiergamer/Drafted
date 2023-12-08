'use client'
import {useState, useEffect} from 'react'
import LogOut from './logout/page'
import Link from 'next/link'

export default function Home() {
const [user, setUser] = useState({})



useEffect(()=>{
    fetch("/users/id")
    .then(response=>response.json())
    .then(data=>setUser(data))
},[])


return(
    <div>
        <div>
        <span className="flex-col h-screen sticky items-center tracking-wide">
  
  <ul className="flex gap-4">
    <li>
      <Link href="/leagueinfo">My Leagues</Link>
    </li>
    <li>
      <Link href="/reproster">My Rosters</Link>
    </li>
    <li>
      <LogOut/>
    </li>
  </ul>
</span>
        </div>

        <div>
            {/* <ul>
                {myReps.map(rep=>
                <RepDisplay key={rep.id}
                            name={rep.name}
                            office={rep.office_held}
                            party={rep.party}
                            socials={rep.social_media} 
                            photo={rep.photo_url}               
                />
                )}
            </ul> */}
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