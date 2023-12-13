'use client'


export default function AddCandidate({ draftCandidate, newDraftData}){



return(
    <div>
        <button type="submit" onSubmit={draftCandidate} value={newDraftData.rep_id} name="rep_id" className="bg-red-500 hover:bg-red-700 rounded-lg text-white p-2 m-2">Draft this Candidate</button>
        </div>)
}