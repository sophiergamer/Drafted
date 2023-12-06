'use client'
import RepDisplay from "@/app/dashboard/RepRoster/EditRoster/layout.js/RepDisplay";
import {useState} from 'react'



export default function EditRoster(){
const [searchInfo, setSearchInfo] = useState({state_code:"", district_number:""})
const [searchResults, setSearchResults] = useState([])

function handleForm(event){
    event.preventDefault();
    setSearchInfo({...searchInfo, [event.target.name]: event.target.value})
}

newSearch={state_code:searchInfo.state_code, district_number:searchInfo.district_number}

function searchCandidates(event){
    event.preventDefault();
    fetch("/candidateSearch",{
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newSearch)
    }).then(response=>response.json())
    .then(data=>setSearchResults(data))
}


return(
<div>
    <h5>Search for Candidates</h5>
    <form onSubmit={searchCandidates}>
        <label>Your State's Abbreviation:</label>
        <input type="text" name="state_code" value="" placeholder="CA, NY, FL eg." onChange={handleForm}/>
        <label>Your District Number (look it up <a href="https://www.census.gov/mycd/">here</a>:):</label>
        <input type="number" name="district_number" value="" onChange={handleForm}/>
    </form>
    <div>
        <h3>Candidates in this District:</h3>
        <div>
            {searchResults.map(result=>
                <RepDisplay key={result.id}
                            name={result.name}
                            
                />)}
        </div>
    </div>
</div>
)

}