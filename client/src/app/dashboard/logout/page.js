import Link from "next/link";

export default function LogOut(){

function logUserOut(event){
    event.preventDefault();
    fetch("/api/logout", {
        method:"DELETE",
        headers: {'Content-type': 'application/json'}
    })
}

return(
    <button className="text-sm text-white absolute top-0 right-2 bg-sky-500 hover:bg-sky-600 w-20 p-3 mt-2 rounded-lg text-center"onClick={logUserOut}>
        <Link href="../login">
        Log Out
        </Link>
    </button>
)
}