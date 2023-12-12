"use client"
import{useEffect, useState} from 'react'

export default function JoinLeague(){
const [allLeagues, setAllLeagues] = useState([])
const [user, setUser] = useState({})

useEffect(()=>{
    fetch("/api/myaccount")
    .then(response=>response.json())
    .then(data=>setUser(data))
},[])

useEffect(()=>{
    fetch("/api/leagues")
    .then(response => response.json())
    .then(data=> setAllLeagues(data))
}, [])



function RequestToJoin(id){
    fetch("/api/myaccount/joinleague" + id, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(id)
    }).then(response=> response.json())
    .then()
    }

return(
<div>
    {allLeagues.map(league=>
        <h3>{league.name}</h3>
//         <button className="bg-red-500 hover:bg-red-700"type="submit" onSubmit={RequestToJoin(league.id)}>Request to Join</button>)}
    )}</div>

)
}