import { Link } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

type Props = {
  user: { username: string; email: string };
  setUser: (a: { username: string; email; string } | null) => void;
};
export default function NavBar({ user, setUser }: Props) {
  return (
    <nav>
      <Link to="/orders/">Order History</Link>&nbsp;|&nbsp;
      <Link to="/orders/new">New Order</Link>&nbsp;|&nbsp;
      <span>{`Welcome, ${user.username}!`}</span>
      {user ? (
        <span
          onClick={() => {
            logOut();
            setUser(null);
          }}
        >
          Log Out
        </span>
      ) : undefined}
    </nav>
  );
}
