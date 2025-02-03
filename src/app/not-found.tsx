import { links } from "@/components/website/navbar";
import Link from "next/link";


export default function NotFound() {
  console.log(links);
  return (
    <div className="px-2 py-2 *:pb-3">
      <p>Sorry, but the page you are looking for does not exist.</p>
      <p>You can use these links: </p>
    </div>
  );
}
