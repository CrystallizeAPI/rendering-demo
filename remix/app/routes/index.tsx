import { Link } from "remix";

export default function IndexRoute() {
  return (
    <ul>
      <li>
        <Link to="/script">Script</Link>
      </li>
      <li>
        <Link to="/no-script">No Script</Link>
      </li>
    </ul>
  );
}
