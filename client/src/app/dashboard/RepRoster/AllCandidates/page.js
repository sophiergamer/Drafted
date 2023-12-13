"use client"
import Image from "next/image"
import AddCandidate from "../AddCandidate/page"


export default function AllCandidates({name, id, office_held, state, district_number, seat_status, party, photo, draftCandidate, newDraftData, handleDraft}){

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
        <AddCandidate   //rep_id={id}
                        draftCandidate={draftCandidate}
                        handleDraft={handleDraft}
                        newDraftData={newDraftData}/>
    </div>
</div>
    )
}