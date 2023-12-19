"use client"
import { useRouter } from 'next/navigation';
import {useState} from 'react'

export default function SignUp(){
const [signUp, setSignUp] = useState({name:"", username:"", password:"", email:"", 
                                city_name:"", state_code:""})

function handleSignUp(event){
    event.preventDefault();
    setSignUp({...signUp, [event.target.name]: event.target.value})
}

const newUserData= {name:signUp.name, username:signUp.username, password:signUp.password, email:signUp.email,
    city_name:signUp.city_name, state_code:signUp.state_code}

const router = useRouter()

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
            city_name:"", 
            state_code:""
        })
    router.push("/login")
    })}


const state_codes = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN",
                    "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ","NM", "NV", 
                    "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV",
                     "WY"]

return(
<div>
    <div>
    <form className="font-rethink pl-2.5 w-full max-w bg-whiteish border border-slate-400 rounded-lg shadow " onSubmit={signUpUser}>
      <br/>
    <h2 className='text-3xl p-2 m-2 '>Sign Up for<a className='font-trocchi text-4xl tracking-wider text-sky-900'> DRAFTED</a></h2>
        <label className="form-label inline text-base m-2 text-slate">create a username</label>
        <input type='text' name="username" value={newUserData.username} onChange={handleSignUp} className="border leading-tight border-slate text-slate text-sm rounded-lg  w-3/4 p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">your first name</label>
        <input type='text' name="name" value={newUserData.name} onChange={handleSignUp} className=" border border-slate text-slate text-sm rounded-lg  w-3/4 p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">your email </label>
        <input type='text' name="email" value={newUserData.email} onChange={handleSignUp} className=" border border-slate text-slate text-sm rounded-lg  w-3/4  p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">create a password</label>
        <input type='text' name="password" value={newUserData.password} onChange={handleSignUp} className=" border border-slate text-slate text-sm rounded-lg  w-3/4  p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">your city</label>
        <input type='text' name="city_name" value={newUserData.city_name} onChange={handleSignUp} className=" border border-slate text-slate text-sm rounded-lg  w-3/4 p-2 my-2"/>
        <br/>
        <label className="form-label inline text-base m-2 text-slate">your state</label>
        <select className="rounded-lg p-2 m-2" name="state_code" value={newUserData.state_code} onChange={handleSignUp}>
            {state_codes.map(code=> 
                <option key={code}>{code}</option>
            )}
        </select>
        <br/>
        <button className="p-2 w-m m-4 text-white bg-sky-500 hover:bg-sky-600 font-medium rounded-lg text-sm text-center" type="submit">Sign Up</button>
    </form>
    </div>
</div>
)


}