'use client'
import {useState, useEffect, useRef} from 'react'
import MyCandidates from './MyCandidates/page'
// import EditRoster from './SearchCandidates/page'
import AllCandidates from './AllCandidates/page'
const SHAPES = ['square', 'triangle', 'wavy-line'];
const COLOR_DIGIT = "ABCDEF1234567890";

export default function MyRoster({myLeagues}){
const [myCandidates, setMyCandidates] = useState([])
const [allCandidates, setAllCandidates] = useState([])
const [newDraftData, setNewDraftData] = useState({league_id:"", rep_id:""})
const [pageNumber, setPageNumber] = useState(1)
const [leagueRoster, setLeagueRoster] = useState([])
const [leagueId, setLeagueId] = useState("1")
const [searchInfo, setSearchInfo] = useState({state:"", office_held:"", party:""})
/////////////////////////////////////// CONFETTI ////////////////////////////////////////////
const [isConfettiActive, setConfettiActive] = useState(false);
const containerRef = useRef(null);
useEffect(() => {
    if (isConfettiActive) {
        generateConfetti();
    }
}, [isConfettiActive]);

const generateRandomColor = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += COLOR_DIGIT[Math.floor(Math.random() * COLOR_DIGIT.length)];
    }
    return color;
};

const generateConfetti = () => {
    const container = containerRef.current;    
    if (container) {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            const positionX = Math.random() * window.innerWidth;
            const positionY = Math.random() * window.innerHeight;
            const rotation = Math.random() * 360;
            const size = Math.floor(Math.random() * (20 - 5 + 1)) + 5;            // Set confetti styles
            confetti.style.left = `${positionX}px`;
            confetti.style.top = `${positionY}px`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.className = 'confetti ' + SHAPES[Math.floor(Math.random() * 3)];
            confetti.style.width = `${size}px`
            confetti.style.height = `${size}px`
            confetti.style.backgroundColor = generateRandomColor();            // Append confetti to the container
            container.appendChild(confetti);            
            // Remove confetti element after animation duration (4 seconds)
            setTimeout(() => {
                container.removeChild(confetti);
            }, 4000);
        }
    }
};

const handleClick = () => {
    setConfettiActive(true);
    // Reset the confetti after a short delay
    setTimeout(() => {
        setConfettiActive(false);
    }, 4000);
};

/////////////////////////////////////SEARCH and LOAD REPS///////////////////////////////////////////////////
function handleSearch(event){
    event.preventDefault();
    setSearchInfo({...searchInfo, [event.target.name]: event.target.value})
}

const newSearch={state:searchInfo.state, office_held:searchInfo.office_held, party:searchInfo.party}

function searchCandidates(event){
    event.preventDefault();
    fetch(`/api/candidateSearch/${pageNumber}`,{
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newSearch)
    }).then(response=>response.json())
    .then(data=>setAllCandidates(data))
}

useEffect(()=>{
    fetch(`/api/representatives/page/${pageNumber}`)
    .then(response => response.json())
    .then(data => setAllCandidates(data))
}, [])

function nextPage(){
    if (pageNumber <=1111){
    setPageNumber(pageNumber + 1)}
    console.log(pageNumber)
}

function prevPage(){
    if (pageNumber >=2){
    setPageNumber(pageNumber - 1)}
}


////////////////////////////////////////////////ALL DRAFTED CANDIDATES////////////////////////////////

useEffect(()=>{
    fetch("/api/myaccount/draftedcandidates")
    .then(response => response.json())
    .then(data => setMyCandidates(data))
    }, [])

////////////////////////////////////////////CANDIDATE ROSTER BY LEAGUE//////////////////////////////////

function changeLeague(event){
    setLeagueId(event.target.name = event.target.value)
    displayUpdatedRoster(event.target.value)
    console.log(`This is back in time: ${leagueId}`)
}


function displayUpdatedRoster(leagueId) {
    fetch(`/api/myaccount/${leagueId}/roster`)
        .then(response => response.json())
        .then(data => {
            setLeagueRoster(data)
            console.log(`This is up-to-date: ${leagueId}`)
            console.log(leagueRoster)
        })
}
const filteredCandidates = myCandidates.filter(item=>{
    return leagueRoster==="Choose a League" || leagueRoster.includes(item.id)
  })

// function updateRoster(event){
//     event.preventDefault();
//     fetch("/api/myaccount/league/roster",{
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body: JSON.stringify({"league_id":item.league.id})
//     }).then(response=>response.json())
//     .then(data=>setLeagueRoster(data))
// }


// useEffect(()=>{
//     fetch(`/api/myaccount/${leagueId}/roster`)
//     .then(response=> response.json())
//     .then(data=> {
//         setLeagueRoster([...leagueRoster, data])
//     console.log(`This is up-to-date: ${leagueId}`)})
// },[leagueId])

/////////////////////////////////////////////SENDING LEAGUE INFO TO DRAFT POST ON OTHER PAGE/////////////////////

function handleDraft(event){
    event.preventDefault();
    setNewDraftData({[event.target.name]: event.target.value})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
return(
<div ref={containerRef} id="confetti-container" >
    <div className='p-4 bg-sky-300 rounded-md m-2'>
    <h2 className='font-trocchi tracking-wide text-sky-900 text-xl' >Your Drafted Candidates</h2>
    <br/>
    <div>
        <div className='border-b-2 p-2'>
            <select className="rounded-lg p-1" name="leagueId" value={leagueId} onChange={changeLeague}>
                <option>Choose a League</option>
            {myLeagues.map(item=>
                <option value={item.league.id} key={item.league.id}>{item.league.name}</option>
            )}
            </select>
        <div className='grid grid-cols-4'>
            {filteredCandidates.map(candidate=>
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
 <div className= "p-4 bg-sky-200 border-sky-900 border-2 rounded-lg">
    <h5 className="text-sky-950 font-rethink text-lg">Search for Candidates</h5>
    <form  onSubmit={searchCandidates}>
        <label>State's Abbreviation:</label>
        <input className="border leading-tight text-sm rounded-lg  w-3/4 p-2 m-2" type="text" name="state" value={searchInfo.state} placeholder="CA, NY, FL eg." onChange={handleSearch}/>
        <br/>
        <label className='font-bolder p-2'>Office: </label>
        <select className="rounded-lg bg-sky-100 p-2" name="office_held" value={searchInfo.office_held} onChange={handleSearch}>
            <option>Choose One</option>
            <option value="P">President</option>
            <option value="S">Senate</option>
            <option value="H">House of Representatives</option>
        </select>
        <label className='font-bolder p-2'>Party Affiliation: </label>
        <select className="rounded-lg bg-sky-100 p-2" name="party" value={searchInfo.party} onChange={handleSearch}> 
            <option>Choose One</option>
             <option value="DEM">Democratic</option>
            <option value="REP">Republican</option>
            <option value="">Any</option>
        </select>
        <button className="text-sm font-rethink text-white bg-sky-500 hover:bg-sky-600  pt-1 pb-1 pl-2 pr-2 m-4 rounded-lg text-center"type="submit">search</button>
    </form>
 </div>    
 <br/>                           
    <div className='p-2'>
    <select className="rounded-lg p-1" name="league_id" value={newDraftData.league_id} onChange={handleDraft}>
    <option>Choose a League</option>
        {myLeagues.map(item=>
        <option value={item.league.id} key={item.league.id}>{item.league.name}</option>
        )}
        </select>
        </div>
    <div className='grid grid-cols-4 p-2'>
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
                                        myCandidates={myCandidates}
                                        handleClick={handleClick}/>)}
          
    </div>
        <div className='flex space-x-4' >
            <button onClick={prevPage} className='rounded-lg bg-sky-800 hover:bg-sky-950 text-white font-rethink text-sm p-2 m-2'>previous page</button>
            <button onClick={nextPage} className='rounded-lg bg-sky-800  hover:bg-sky-950 text-white font-rethink text-sm p-2 m-2'>next page</button>
        </div>
    </div>
</div>
)
}



/* <div className="checkbox-wrapper m-2">
<p className='font-rethink bg-white w-fit p-1'>position:</p>
  <label className='p-2' >
    <input type="checkbox" name="office_held" value="P"  onChange={handleSearch}/>
    President
  </label>
  <label className='p-2'>
    <input type="checkbox" name="office_held" value="S" onChange={handleSearch}/>
    Senate
  </label>
  <label className='p-2'>
    <input type="checkbox" name="office_held" value="H" onChange={handleSearch}/>
    House of Representatives
  </label>
  <p className='font-rethink underline underline-offset-2'>party affiliation:</p>
  <label className='p-2'>
    <input type="checkbox" name="office_held" value="DEM" onChange={handleSearch} />
    Democratic
  </label>
  <label className='p-2'>
    <input type="checkbox" name="office_held" value="REP" onChange={handleSearch} />
    Republican
  </label>
</div> */