// "use client"
// import{useEffect, useState} from 'react'
// import AllLeagueDisplay from './AllLeagueDisplay/page'

// export default function JoinLeague(){
// const [availableLeagues, setAvailableLeagues] = useState([])
// const [user, setUser] = useState({})

// useEffect(()=>{
//     fetch("/api/myaccount")
//     .then(response=>response.json())
//     .then(data=>setUser(data))
// },[])

// useEffect(()=>{
//     fetch("/api/myaccount/leaguestojoin")
//     .then(response => response.json())
//     .then(data=> setAvailableLeagues(data))
// }, [])


// function RequestToJoin(id){
//     fetch("/api/myaccount/joinleague",{
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body: JSON.stringify(id, user)
//     }).then(response=> response.json())
//     .then()
//     }

// return(
// <div>
//     {availableLeagues.map(league=> 
//         <AllLeagueDisplay 
//         key={league.id}
//         id = {league.id}
//         name = {league.name}
//         RequestToJoin={RequestToJoin}/>
//     )}</div>

// )
// }