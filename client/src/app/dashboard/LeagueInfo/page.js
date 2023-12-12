'use client'
import {useState, useEffect} from 'react'
import CreateLeague from './createLeague/page'
import LeagueDisplay from './leagueDisplay/page'
// import JoinLeague from "./JoinLeague/page"

export default function LeagueInfo(){
const [myLeagues, setMyLeagues] = useState([])

useEffect(()=>{
    fetch("/api/myaccount/leagues")
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setMyLeagues(data)})
},[])


return(
<div >
  <div className='p-4 bg-sky-300 rounded-md m-2'>
    <h2 className='font-trocchi text-sky-900 text-xl tracking-wide' >Your Leagues</h2>
    {myLeagues.map(item=>
    <LeagueDisplay key={item.league.id}
                name={item.league.name}
                />
)}
</div>
<br/>
<div className='p-4 bg-sky-300 rounded-md m-2'>
<h2 className='font-trocchi text-sky-900 text-xl tracking-wide' >Create a League</h2>
<CreateLeague/>
</div>
<br/>
{/* <div className='p-4 bg-sky-300 rounded-md m-2'>
<h2 className='font-trocchi text-sky-900 text-xl tracking-wide' >Join a League</h2> */}
{/* <JoinLeague/> */}
{/* </div> */}

</div>

)

}