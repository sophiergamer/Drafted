'use client'
import { useState } from "react"


export default function CreateLeague(){
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
    })}

return(
<div>
    <form onSubmit={createLeague}>
        <h2>Create a League</h2>
        <label>League Name:</label>
        <input onChange={handleForm} value={leagueForm.name} name="name"/>
        <br/>
        <button className="bg-red-500 hover:bg-red-700 rounded-lg p-2 m-1" type='submit'> create </button>
    </form>
</div>
)






}