"use client"
import{useEffect, useState} from 'react'


export default function JoinLeague({myLeagues}){
const [user, setUser] = useState({})
const [allLeagues, setAllLeagues] = useState([])

useEffect(()=>{
    fetch("/api/myaccount")
    .then(response=>response.json())
    .then(data=>setUser(data))
},[])

useEffect(()=>{
    fetch("/api/leagues")
    .then(response=>response.json())
    .then(data=>{
        setAllLeagues([...allLeagues, data])
        console.log(allLeagues)})
},[])

// const availableLeagues = allLeagues.filter(league=>{
//     return myLeagues.includes(league.id)
// }


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
    <ul>
        {allLeagues.map(league=>
        <li key={league.id} className="bg-sky-800 text-white text-center p-2 m-1 rounded-lg mb-2">
            {league.name}
        </li>
        )}
    </ul>

        {/* <button className="bg-red-500 hover:bg-red-700 ml-4 mt-1 mb-1 p-2 rounded-lg text-white" */}
    {/* //      onClick={RequestToJoin(league.id)}>Request to Join</button> */}
     
    
    </div>

)
}