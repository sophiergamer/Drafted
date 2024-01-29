"use client"
import{useEffect, useState} from 'react'

export default function JoinLeague({allLeagues, myLeagues}){
const [availableLeagues, setAvailableLeagues] = useState([])
const [user, setUser] = useState({})

useEffect(()=>{
    fetch("/api/myaccount")
    .then(response=>response.json())
    .then(data=>setUser(data))
},[])

function showAvailable(){setAvailableLeagues(allLeagues.filter(league=>{
    return !myLeagues.includes(league.id)}
  ))}

// function RequestToJoin(id){
//     fetch("/api/myaccount/joinleague",{
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body: JSON.stringify(id, user)
//     }).then(response=> response.json())
//     .then()
//     }

return(
<div>
    {availableLeagues.map(league=> 
    <div className="p-2 bg-sky-700 rounded-lg m-3 text-sky-200">
        <h3 className="text-xl font-sans tracking-wide p-2 mt-1 mr-1 ml-1">{league.name}</h3>
        <button className="bg-red-500 hover:bg-red-700 ml-4 mt-1 mb-1 p-2 rounded-lg text-white"
         onClick={RequestToJoin(league.id)}>Request to Join</button>
    </div>
    )}
    </div>

)
}