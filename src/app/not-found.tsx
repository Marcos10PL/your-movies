import { links } from "@/lib/variables";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-2 py-2 *:pb-3">
      <p>Sorry, but the page you are looking for does not exist.</p>
      <p>You can use these links: </p>
      <ul className="list-disc list-inside space-y-2 pl-1">
        {links.map(({ name, href }) => (
          <li key={name}>
            <Link
              href={href}
              className="text-emerald-300 hover:text-emerald-500 transition-colors duration"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
