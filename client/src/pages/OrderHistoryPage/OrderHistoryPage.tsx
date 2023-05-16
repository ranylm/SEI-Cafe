import * as usersService from "../../utilities/users-service";

export default function OrderHistoryPage() {
  const handleCheckToken = async () => {
    const expDate = await usersService.checkToken();
    alert(expDate);
  };
  return (
    <div>
      <h1>OrderHistoryPage</h1>
      <button onClick={handleCheckToken}>Check Login Expiration</button>
    </div>
  );
}
