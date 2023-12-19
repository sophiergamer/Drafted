"use client"
export default function LeagueDisplay({name}){

return(
<div >
        <ul className="bg-sky-800 text-white text-center p-2 m-1 rounded-lg mb-2">
            <li >{name}</li>
            <p>Score: 0</p>
            <p>Members:</p>
            <ul>
                <li></li>
            </ul>

            
        </ul>

</div>
)

}