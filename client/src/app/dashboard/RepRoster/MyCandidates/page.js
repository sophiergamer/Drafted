"use client"
import Image from "next/image"
export default function MyCandidates({myCandidates, setMyCandidates, name, id, office_held, state, district_number, seat_status, party, photo}){

function deleteDraft(league_id, rep_id){
    fetch('/api/myaccount/league/roster',{
        method:"DELETE"
    }).then(response=>response.json())
    .then(setMyCandidates(myCandidates.filter(candidate=> candidate.rep_id !== rep_id)))}


return(
    <div className="max-w-xs text-center shadow-md rounded-lg overflow-hidden bg-sky-200 justify-center border-sky-800 border-4 m-2">
        <div>
        <Image className="w-full"
            src={photo}
            width={200}
            height={100}
            alt={name}
            priority={true}
            />
        </div>
        <div >
            <h4 className="font-trocchi p-2 capitalize">{name}</h4>
            <div className="text-xs">
            <h5>state: {state}</h5>
            <h5>office: {office_held}</h5>
            <p>affiliation: {party}</p>
            <p>district: {district_number}</p>
            <p>seat status: {seat_status}</p>
            </div>
        </div>
        <button onClick={deleteDraft} name="rep_id" className="bg-red-500 hover:bg-red-700 rounded-lg text-white p-2 m-2"
        >Remove this Candidate</button>
    </div>
)



    
}