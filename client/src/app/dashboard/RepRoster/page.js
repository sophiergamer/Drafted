'use client'
import {useState, useEffect} from 'react'

export default function MyReps(){

const [myReps, setMyReps] = useState([])

useEffect(()=>{
    fetch(`/users/{user.id}/representatives`)
    .then(response=> response.json())
    .then(data=> setMyReps(data))
},[])




return(
<div>
    <div>

    </div>
</div>
)

}