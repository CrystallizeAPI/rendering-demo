import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/static">Static</Link>
      </li>
      <li>
        <Link href="/dynamic">Dynamic</Link>
      </li>
    </ul>
  );
}
