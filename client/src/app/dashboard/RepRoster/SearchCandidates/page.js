// 'use client'
// // import SearchedCandidateDisplay from "@/app/dashboard/RepRoster/AllCandidates/page";
// import {useState} from 'react'


// export default function EditRoster(){
// const [searchInfo, setSearchInfo] = useState({state_code:"", name:""})
// const [searchResults, setSearchResults] = useState([])

// function handleForm(event){
//     event.preventDefault();
//     setSearchInfo({...searchInfo, [event.target.name]: event.target.value})
// }

// const newSearch={state_code:searchInfo.state_code, name:searchInfo.name}

// // function searchCandidates(event){
// //     event.preventDefault();
// //     fetch("/candidateSearch",{
// //         method:"POST",
// //         headers: {"Content-Type":"application/json"},
// //         body: JSON.stringify(newSearch)
// //     }).then(response=>response.json())
// //     .then(data=>setSearchResults(data))
// // }


// return(
// <div>
//     <div className= "p-4">
//     {/* <h5 className="text-sky-950 font-rethink text-lg">Search for Candidates</h5>
//     <form  onSubmit={searchCandidates}>
//         <label>State's Abbreviation:</label>
//         <input className="border leading-tight border-slate text-slate text-sm rounded-lg  w-3/4 p-2 my-2" type="text" name="state_code" value={searchInfo.state_code} placeholder="CA, NY, FL eg." onChange={handleForm}/>
//         <br/>
//         <p className="text-sky-800">and/or</p>
//         <br/>
//         <label>Candidate Name:</label>
//         <input className="border leading-tight border-slate text-slate text-sm rounded-lg  w-3/4 p-2 my-2" type="text" name="name" value={searchInfo.name} onChange={handleForm}/>
//         <br/>
//         <button className="text-sm font-rethink text-white bg-sky-500 hover:bg-sky-600  p-2 mt-2 rounded-lg text-center"type="submit">search</button>
//     </form> */}
//     </div>
//     <br/>
//     <div className="flex flex-row p-4">
//         {/* <h5>Results:</h5> */}
//         <div>
//             {/* {searchResults.map(result=>
//                 <SearchedCandidateDisplay key={result.id}
//                             id={result.id}
//                             name={result.name}
//                             office_held={result.office_held}
//                             state={result.state} 
//                             district_number={result.district_number}
//                             seat_status={result.seat_status}
//                             party={result.party}
//                             photo={result.photo_url}
//                 />)} */}
//         </div>
//     </div>
// </div>
// )

// }