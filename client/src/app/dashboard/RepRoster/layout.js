'use client'
import SearchedCandidateDisplay from './AllCandidates/page'
import {useState, useEffect} from 'react'

export default function RepRosterLayout({ children }) {
const [allCandidates, setAllCandidates] = useState([])

useEffect(()=>{
     fetch("/api/representatives")
     .then(response=>response.json())
     .then(data=>setAllCandidates(data))
})
    return(
  {children}
    )
      }