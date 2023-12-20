'use client'
import {useState, useEffect} from 'react'
import CreateLeague from './createLeague/page'
import LeagueDisplay from './leagueDisplay/page'
// import JoinLeague from "./JoinLeague/page"

export default function LeagueInfo({myLeagues, setMyLeagues}){


const [leagueForm, setLeagueForm] = useState({name:""})

function handleForm(event){
    event.preventDefault();
    setLeagueForm({...leagueForm, [event.target.name]:event.target.value})}

const newLeague = {name: leagueForm.name}

function createLeague(event){
    event.preventDefault();
    fetch("/api/myaccount/leagues",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(newLeague)
    }).then(response=>response.json())
.then(data=>{
    setMyLeagues([...myLeagues, data])
    setLeagueForm({name:""})})}



return(

<div className='p-4' >
  <div className='p-4 bg-sky-300 rounded-md m-2'>
    <h2 className='font-trocchi text-sky-900 text-xl mb-4 tracking-wide' >Your Leagues</h2>
 
    {myLeagues.map(item=>
    <LeagueDisplay key={item.league.id}
                name={item.league.name}
                />
)}
    </div>
<br/>
    <div className='p-3 bg-sky-300 rounded-md m-2'>
        <h2 className='font-trocchi text-sky-900 text-xl tracking-wide mb-2 '>Create a League</h2>
<CreateLeague handleForm={handleForm}
              leagueForm={leagueForm}
              createLeague={createLeague}/>
    </div>
<br/>
    <div className='p-4 bg-sky-300 rounded-md m-2'>
        <h2 className='font-trocchi text-sky-900 text-xl tracking-wide' >Join a League</h2> 
{/* <JoinLeague/> */}
    </div>
</div>
)

}