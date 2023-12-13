'use client'

export default function CreateLeague({leagueForm, handleForm, createLeague}){

return(
<div>
    <form className="w-full max-w-sm bg-sky-300 flex-none border-2 p-2 border-sky-800 rounded-lg shadow font-rethink" onSubmit={createLeague}>
        <br/>
        <label>League Name:</label>
        <input className="p-2 rounded-lg m-1 "onChange={handleForm} value={leagueForm.name} name="name"/>
        <br/>
        <button className="bg-red-500 hover:bg-red-700 rounded-lg p-2 m-1" type='submit'> create </button>
    </form>
</div>
)






}