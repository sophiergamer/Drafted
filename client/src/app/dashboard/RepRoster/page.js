'use client'
import {useState, useEffect} from 'react'
import MyCandidates from './MyCandidates/page'
// import EditRoster from './SearchCandidates/page'
import AllCandidates from './AllCandidates/page'

export default function MyRoster(){
const [myCandidates, setMyCandidates] = useState([])
const [allCandidates, setAllCandidates] = useState([])
const [myLeagues, setMyLeagues] = useState([])
const [newDraftData, setNewDraftData] = useState({league_id:"", rep_id:""})

useEffect(()=>{
    fetch("/api/myaccount/draftedcandidates")
    .then(response => response.json())
    .then(data => setMyCandidates(data))
    }, [])

useEffect(()=>{
    fetch("/api/shortrepslist")
    .then(response=>response.json())
    .then(data=>setAllCandidates(data))
}, [])

useEffect(()=>{
    fetch("/api/myaccount/leagues")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setMyLeagues(data)})
},[])

function draftCandidate(event){
    event.preventDefault();
    fetch("/api/myaccount/draftedcandidates", {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify()

    })
    }
function handleDraft(event){
    event.preventDefault();
    setNewDraftData({...newDraft, [event.target.name]: event.target.value})
}
const newDraft = {league_id:newDraftData.league_id, rep_id:newDraftData.rep_id }

return(
<div>
    <div className='p-4 bg-sky-300 rounded-md m-2'>
    <h2 className='font-trocchi tracking-wide text-sky-900 text-xl' >Your Drafted Candidates</h2>
    <br/>
    <div className='grid grid-cols-3'>
    {myCandidates.map(candidate => <MyCandidates
                                key={candidate.id}
                                id={candidate.id}
                                name={candidate.name}
                                office_held={candidate.office_held}
                                state={candidate.state} 
                                district_number={candidate.district_number}
                                seat_status={candidate.seat_status}
                                party={candidate.party}
                                photo={candidate.photo_url}/>)}
    </div>
    </div>
    <br/>
    <div className='p-4 bg-sky-300 rounded-md m-2'>
    <h2 className='font-trocchi tracking-wide text-sky-900 text-xl' >Edit Your Roster</h2>
    <br/>
    <div className='p-2'>
    <select className="rounded-lg p-1" name="league_id" value={newDraftData.league_id} onChange={handleDraft}>
        {myLeagues.map(item=>
        <option>{item.league.name}</option>)}
        </select>
        </div>
    <div className='grid grid-cols-3'>
     {allCandidates.map(candidate=>
                                    <AllCandidates key={candidate.id}
                                        rep_id={candidate.id}
                                        name={candidate.name}
                                        office_held={candidate.office_held}
                                        state={candidate.state} 
                                        district_number={candidate.district_number}
                                        seat_status={candidate.seat_status}
                                        party={candidate.party}
                                        photo={candidate.photo_url}
                                        draftCandidate={draftCandidate}
                                        handleDraft={handleDraft}
                                        newDraftData={newDraftData}/>)}
          
    </div>

    </div>
</div>
)
}