"use client"
import Image from "next/image"



export default function AllCandidates({name, rep_id, office_held, state, district_number, seat_status, party, photo, newDraftData, myCandidates, setMyCandidates}){
    function draftCandidate(event){
        event.preventDefault();
        fetch("/api/myaccount/draftedcandidates", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({...newDraftData, "rep_id":rep_id})
        }).then(response=>response.json())
        .then(data=>setMyCandidates([...myCandidates, data]))
        }
    

return(
<div>
    <div className="max-w-xs text-center shadow-md rounded-lg overflow-hidden bg-white justify-center border-sky-800 border-4 m-2">
        <div>
        <Image className="w-full"
            src={photo}
            width={200}
            height={200}
            alt={name}
            />
        </div>
        <div>
            <h4>{name}</h4>
            <h5>{state}</h5>
            <h5>{office_held}</h5>
            <p>affiliation: {party}</p>
            <p>district: {district_number}</p>
            <p>seat status: {seat_status}</p>
        </div>
        <button onClick={draftCandidate}  name="rep_id" 
        className="bg-red-500 hover:bg-red-700 rounded-lg text-white p-2 m-2">Draft this Candidate</button>



        {/* <AddCandidate   //rep_id={id}
                        draftCandidate={draftCandidate}
                        handleDraft={handleDraft}
                        newDraftData={newDraftData}/> */}
    </div>
</div>
    )
}