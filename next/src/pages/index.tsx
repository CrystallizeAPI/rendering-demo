import Link from "next/link";

export default function Home() {
  return (
    <ul
      style={{
        listStyleType: "none",
        display: "flex",
        gap: 16,
        justifyContent: "center",
        margin: "256px auto",
        maxWidth: "48rem",
      }}
    >
      <li
        style={{
          flex: 1,
        }}
      >
        <Link href="/static">
          <a
            style={{
              width: "100%",
              height: "12rem",
              background: "#C5DEDD",
              textAlign: "center",
              borderRadius: 8,
              fontSize: 32,
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Static
          </a>
        </Link>
      </li>
      <li
        style={{
          flex: 1,
        }}
      >
        <Link href="/dynamic">
          <a
            style={{
              width: "100%",
              height: "12rem",
              background: "#D6E2E9",
              textAlign: "center",
              borderRadius: 8,
              fontSize: 32,
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Dynamic
          </a>
        </Link>
      </li>
    </ul>
  );
}
