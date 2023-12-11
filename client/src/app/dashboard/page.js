'use client'
import {useState, useEffect} from 'react'


export default function Home() {
const [user, setUser] = useState({})

// const [clicked, setClicked] = useState(false)


useEffect(()=>{
    fetch("/users/id")
    .then(response=>response.json())
    .then(data=>setUser(data))
},[])

return(
    <div >
        <div >
             
        </div>
      <br/>
      <div>
        
      </div>
 
    </div>
)

}