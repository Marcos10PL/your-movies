import { links } from "@/lib/variables";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-2 py-2 *:pb-3">
      <p>Sorry, but the page you are looking for does not exist.</p>
      <p>You can use these links: </p>
      {links.map(({ name, href }) => (
        <Link key={name} href={href}>
          {name}
        </Link>
      ))}
    </div>
  );
}
