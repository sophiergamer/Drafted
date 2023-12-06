
import Link from "next/link";

export default function NavBar(){

  return (
  <div>
  <span className="flex justify-between">
      <h1 className="text-xl">Logo</h1>
      <ul className="flex gap-4">
        <li>
          <Link href="/navbar">Home</Link>
        </li>
        <li>
          <Link href="/user/login">Login</Link>
        </li>
        <li>
          <Link href="/user/signup">Sign Up</Link>
        </li>
      </ul>
 </span>
  <span className="flex-col h-screen sticky items-center tracking-wide">
  
        <ul className="flex gap-4">
          <li>
            <Link href="/">My Leagues</Link>
          </li>
          <li>
            <Link href="">My Rosters</Link>
          </li>
        </ul>
      </span>
     </div>
  )}