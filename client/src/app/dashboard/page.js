'use client'
import {useState, useEffect} from 'react'

export default function Home() {
const [user, setUser] = useState({})
const [myReps, setMyReps] = useState([])


useEffect(()=>{
    fetch("/users/id")
    .then(response=>response.json())
    .then(data=>setUser(data))
},[])

useEffect(()=>{
    fetch("/users/id/representatives")
    .then(response=>response.json())
    .then(data=>setMyReps(data))
})

return(
    <div>
        <div>
            
        </div>

        <div>
            {/* <ul>
                {myReps.map(rep=>
                <RepDisplay key={rep.id}
                            name={rep.name}
                            office={rep.office_held}
                            party={rep.party}
                            socials={rep.social_media} 
                            photo={rep.photo_url}               
                />
                )}
            </ul> */}
        </div>
    </div>
)




// useEffect(()=>{
//     fetch(`/users/{user.id}`)
//     .then(response=>response.json())
//     .then(data=>setUser(data))
// },[])

// useEffect(()=>{
//     fetch(`/users/{user.id}/representatives`)
//     .then(response=> response.json())
//     .then(data=> setMyReps(data))
// },[])






}