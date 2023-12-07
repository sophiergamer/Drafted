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
    <button onClick={logUserOut}>
        <Link href="../login">
        LogOut
        </Link>
    </button>
)
}