import Image from "next/image"

export default function RepDisplay({name, id, office_held, state, district_number, seat_status, party, photo}){

function draftCandidate(event){
    event.preventDefault();
    fetch("/api/myaccount/draftedcandidates", {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify()

    })
}


return(
    <div>
        <div>
        <Image
            src={photo}
            width={100}
            height={100}
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
        <button>Draft this Candidate</button>
    </div>
    )
}