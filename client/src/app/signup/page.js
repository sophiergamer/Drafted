"use client"
import Link from 'next/link';
import {useState} from 'react'

export default function SignUp(){
const [signUp, setSignUp] = useState({name:"", username:"", password:"", email:"", 
                            building_number:"", street_name:"",city_name:"", state_code:"", zip_code:""})

function handleSignUp(event){
    event.preventDefault();
    setSignUp({...signUp, [event.target.name]: event.target.value})
}

const newUserData= {name:signUp.name, username:signUp.username, password:signUp.password, email:signUp.email, building_number:signUp.building_number, street_name:signUp.building_number,
    city_name:signUp.city_name, state_code:signUp.state_code, zip_code:signUp.zip_code}

function signUpUser(event){
    event.preventDefault();

    fetch("/api/users", {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newUserData)}
    )
    .then(response=>response.json())
    .then(data => {
        console.log(data)
        setSignUp({
            name:"", 
            username:"", 
            password:"", 
            email:"", 
            building_number:"", 
            street_name:"",
            city_name:"", 
            state_code:"", 
            zip_code:""
        })
    })
}


const state_codes = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN",
                    "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ","NM", "NV", 
                    "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV",
                     "WY"]

return(
<div>
    <div>
    <form className="pl-2.5 w-full max-w bg-whiteish border border-slate rounded-lg shadow " onSubmit={signUpUser}>
      <br/>
    <h2 className='text-4xl p-2 m-2'>Sign Up</h2>
        <label className="form-label inline text-base m-2 text-slate">Create a Username</label>
        <input type='text' name="username" value={newUserData.username} onChange={handleSignUp} className="border leading-tight border-slate text-slate text-sm rounded-lg  w-3/4 p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">Your First Name</label>
        <input type='text' name="name" value={newUserData.name} onChange={handleSignUp} className=" border border-slate text-slate text-sm rounded-lg  w-3/4 p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">Your Email </label>
        <input type='text' name="email" value={newUserData.email} onChange={handleSignUp} className=" border border-slate text-slate text-sm rounded-lg  w-3/4  p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">Create a Password</label>
        <input type='text' name="password" value={newUserData.password} onChange={handleSignUp} className=" border border-slate text-slate text-sm rounded-lg  w-3/4  p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate" >Your Address</label>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">Building Number</label>
        <input type='text' name="building_number" value={newUserData.building_number} onChange={handleSignUp} className=" border border-slate text-slate text-sm rounded-lg  w-3/4 p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">Street Name</label>
        <input type='text' name="street_name" value={newUserData.street_name} onChange={handleSignUp} className=" border border-slate text-slate text-sm rounded-lg  w-3/4 p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">City</label>
        <input type='text' name="city_name" value={newUserData.city_name} onChange={handleSignUp} className=" border border-slate text-slate text-sm rounded-lg  w-3/4 p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">State</label>
        <select name="state_code" value={newUserData.state_code} onChange={handleSignUp}>
            {state_codes.map(code=> 
                <option key={code}>{code}</option>
            )}
        </select>
        <label>Zip Code</label>
        <input type='text' name="zip_code" value={newUserData.zip_code} onChange={handleSignUp} className=" border border-slate text-slate text-sm rounded-lg  w-3/4 p-2 my-2"/>
        <br/>
        <button className="p-2 w-m m-4 border-1 border-black font-medium rounded-lg text-sm text-center" type="submit"><Link href="/login">Sign Up for Drafted</Link></button>
    </form>
    </div>
</div>
)


}