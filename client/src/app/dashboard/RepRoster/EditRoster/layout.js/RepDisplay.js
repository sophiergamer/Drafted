export default function RepDisplay({name, office, party, socials, photo}){
return(
    <div>
        <div>
            <img src={photo} alt={name}/>
        </div>
        <div>
            <h4>{name}</h4>
            <h5>{office}</h5>
            <p>{party}</p>
            <p>{socials}</p>
        </div>
    </div>
    )
}