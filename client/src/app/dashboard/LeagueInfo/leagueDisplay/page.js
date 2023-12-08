export default function LeagueDisplay({name, members}){

return(
<div>
    <div>
        <div>
            <h2>{name}</h2>
            <p>Members({members.length}):</p>
            <ul>
                {members.map(member=>
                    <li>{member.name}</li>)}
            </ul>
        </div>
    </div>
</div>
)

}