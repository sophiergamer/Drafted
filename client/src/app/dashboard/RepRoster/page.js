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
const [pageNumber, setPageNumber] = useState(1)
const [leagueRoster, setLeagueRoster] = useState([])
const [leagueId, setLeagueId] = useState("1")
const [searchInfo, setSearchInfo] = useState({state_code:"", name:""})

function handleSearch(event){
    event.preventDefault();
    setSearchInfo({...searchInfo, [event.target.name]: event.target.value})
}

const newSearch={state_code:searchInfo.state_code, name:searchInfo.name}

function searchCandidates(event){
    event.preventDefault();
    fetch("/candidateSearch",{
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newSearch)
    }).then(response=>response.json())
    .then(data=>setSearchResults(data))
}


useEffect(()=>{
    fetch("/api/myaccount/draftedcandidates")
    .then(response => response.json())
    .then(data => setMyCandidates(data))
    }, [])

// useEffect(()=>{
//     fetch("/api/shortrepslist")
//     .then(response=>response.json())
//     .then(data=>setAllCandidates(data))
// }, [])

function changeLeague(event){
    setLeagueId(event.target.name = event.target.value)
    displayUpdatedRoster(event.target.value)
    console.log(`This is back in time: ${leagueId}`)
}


function displayUpdatedRoster(leagueId) {
    fetch(`/api/myaccount/${leagueId}/roster`)
        .then(response => response.json())
        .then(data => {
            setLeagueRoster(leagueRoster)
            console.log(`This is up-to-date: ${leagueId}`)
        })
}


// useEffect(()=>{
//     fetch(`/api/myaccount/${leagueId}/roster`)
//     .then(response=> response.json())
//     .then(data=> {
//         setLeagueRoster([...leagueRoster, data])
//     console.log(`This is up-to-date: ${leagueId}`)})
// },[leagueId])


useEffect(()=>{
    fetch(`/api/representatives/page/${pageNumber}`)
    .then(response => response.json())
    .then(data => setAllCandidates(data))
}, [pageNumber])

function nextPage(){
    if (pageNumber <=1111){
    setPageNumber(pageNumber + 1)}
    console.log(pageNumber)
}

function prevPage(){
    if (pageNumber >=2){
    setPageNumber(pageNumber - 1)}
}

useEffect(()=>{
    fetch("/api/myaccount/leagues")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setMyLeagues(data)})
},[])

function handleDraft(event){
    event.preventDefault();
    setNewDraftData({[event.target.name]: event.target.value})
}


return(
<div>
    <div className='p-4 bg-sky-300 rounded-md m-2'>
    <h2 className='font-trocchi tracking-wide text-sky-900 text-xl' >Your Drafted Candidates</h2>
    <br/>
    <div>
        <div className='border-b-2 p-2'>
            <select className="rounded-lg p-1" name="leagueId" value={leagueId} onChange={changeLeague}>
            {myLeagues.map(item=>
                <option value={item.league.id} key={item.league.id}>{item.league.name}</option>
            )}
            </select>
        <div className='grid grid-cols-3'>
            {myCandidates.map(candidate=>(leagueRoster.includes(candidate.id))?
                                <MyCandidates
                                key={candidate.id}
                                id={candidate.id}
                                name={candidate.name}
                                office_held={candidate.office_held}
                                state={candidate.state} 
                                district_number={candidate.district_number}
                                seat_status={candidate.seat_status}
                                party={candidate.party}
                                photo={candidate.photo_url}
                                myCandidates={myCandidates}
                                setMyCandidates={setMyCandidates}/>
                                : null
                               )}
            </div>
 
        </div>
        </div>
    <div className='grid grid-cols-3'>
    {/* {myCandidates.map(candidate => <MyCandidates
                                key={candidate.id}
                                id={candidate.id}
                                name={candidate.name}
                                office_held={candidate.office_held}
                                state={candidate.state} 
                                district_number={candidate.district_number}
                                seat_status={candidate.seat_status}
                                party={candidate.party}
                                photo={candidate.photo_url}/>)} */}
    </div>
    </div>
    <br/>
 <div className='p-4 bg-sky-300 rounded-md m-2 w-full'>
    <h2 className='font-trocchi tracking-wide text-sky-900 text-xl' >Edit Your Roster</h2>
    <br/>
 <div className= "p-4">
    <h5 className="text-sky-950 font-rethink text-lg">Search for Candidates</h5>
    <form  onSubmit={searchCandidates}>
        <label>State's Abbreviation:</label>
        <input className="border leading-tight border-slate text-slate text-sm rounded-lg  w-3/4 p-2 m-2" type="text" name="state_code" value={searchInfo.state_code} placeholder="CA, NY, FL eg." onChange={handleSearch}/>
        <br/>
    
        <label>Candidate Name:</label>
        <input className="border leading-tight border-slate text-slate text-sm rounded-lg  w-3/4 p-2 m-2" type="text" name="name" value={searchInfo.name} onChange={handleSearch}/>
        <br/>
        <button className="text-sm font-rethink text-white bg-sky-500 hover:bg-sky-600  p-2 mt-2 rounded-lg text-center"type="submit">search</button>
    </form>
 </div>    
 <br/>                           
    <div className='p-2'>
    <select className="rounded-lg p-1" name="league_id" value={newDraftData.league_id} onChange={handleDraft}>
        {myLeagues.map(item=>
        <option value={item.league.id} key={item.league.id}>{item.league.name}</option>
        )}
        </select>
        </div>
    <div className='grid grid-cols-3 p-2'>
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
                                        handleDraft={handleDraft}
                                        newDraftData={newDraftData}
                                        setMyCandidates={setMyCandidates}
                                        myCandidates={myCandidates}/>)}
          
    </div>
        <div className='flex space-x-4' >
            <button onClick={prevPage} className='rounded-lg bg-sky-800 hover:bg-sky-950 text-white font-rethink text-sm p-2 m-2'>previous page</button>
            <button onClick={nextPage} className='rounded-lg bg-sky-800  hover:bg-sky-950 text-white font-rethink text-sm p-2 m-2'>next page</button>
        </div>
    </div>
</div>
)
}