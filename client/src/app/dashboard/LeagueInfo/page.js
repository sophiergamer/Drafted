'use client'
import {useState, useEffect} from 'react'
import CreateLeague from './createLeague/page'

export default function LeagueInfo(){
const [myLeagues, setMyLeagues] = useState([])

useEffect(()=>{
    fetch("/api/myaccount/leagues")
    .then(response => response.json())
    .then(data => setMyLeagues(data))
},[])



return(
<CreateLeague/>
{myLeagues.map(league=>
    )}

)


}