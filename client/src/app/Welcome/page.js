import Link from "next/link";

export default function Welcome(){

return(<span className="flex justify-between">

      <ul className="flex gap-4">
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
      </ul>
 </span>
)
}

