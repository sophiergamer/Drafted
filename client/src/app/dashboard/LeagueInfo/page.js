'use client'
import {useState, useEffect} from 'react'
import CreateLeague from './createLeague/page'
import LeagueDisplay from './leagueDisplay/page'

export default function LeagueInfo(){
const [myLeagues, setMyLeagues] = useState([])

useEffect(()=>{
    fetch("/api/myaccount/leagues")
    .then(response => response.json())
    .then(data => setMyLeagues(data))
},[])



return(
<div>
<CreateLeague/>
{myLeagues.map(league=>
<LeagueDisplay key={league.id}
            name={league.name}
            members = {league.members}/>
)}
</div>

)

}