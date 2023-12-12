'use client'
import {useState, useEffect} from 'react'
import MyCandidates from './MyCandidates/page'
import EditRoster from './EditRoster/page'

export default function MyRoster(){
const [allMyCandidates, setAllMyCandidates] = useState([])

useEffect(()=>{
    fetch("/api/myaccount/draftedcandidates")
    .then(response => response.json())
    .then(data => setAllMyCandidates(data))
    }, [])

return(
<div>
    <div className='p-4 bg-sky-300 rounded-md m-2'>
    <h2 className='font-trocchi tracking-wide text-sky-900 text-xl' >Your Drafted Candidates</h2>
    <br/>
    <div >
    {allMyCandidates.map(candidate => (<MyCandidates
                                key={candidate.id}
                                id={candidate.id}
                                name={candidate.name}
                                office_held={candidate.office_held}
                                state={candidate.state} 
                                district_number={candidate.district_number}
                                seat_status={candidate.seat_status}
                                party={candidate.party}
                                photo={candidate.photo_url}/>))}
    </div>
    </div>
    <br/>
    <div className='p-4 bg-sky-300 rounded-md m-2'>
    <h2 className='font-trocchi tracking-wide text-sky-900 text-xl' >Edit Your Roster</h2>
    <br/>
    <EditRoster/>
    </div>
</div>
)
}