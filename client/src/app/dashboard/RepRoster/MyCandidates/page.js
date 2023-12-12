"use client"
export default function MyCandidates({name, id, office_held, state, district_number, seat_status, party, photo}){

return(
    <div className="max-w-xs text-center shadow-md rounded-lg overflow-hidden bg-white justify-center border-sky-800 border-4 ml-8">
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
        <button className="bg-red-500 hover:bg-red-700 rounded-lg text-white p-2 m-2">Remove this Candidate</button>
    </div>
)



    
}