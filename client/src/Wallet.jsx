import server from "./server";
import fakewallet from './FakeWallet';


function Wallet({ user, setUser, balance, setBalance }) {

  async function onPickedUser(evt) {
    const pickedUser = evt.target.value;
    setUser(pickedUser);
    
    if (pickedUser) {
      const address = fakewallet.getAddress(pickedUser);
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
      Wallet Address
        <select onChange={onPickedUser} value={user}>
          <option value="">
            Please choose a user wallet
          </option>
          {fakewallet.USERS.map((u, i) => (
            <option key={i} value={u}>
              {u}
            </option>
          ))}

        </select>
      </label>

      <div className="balance">Address: {fakewallet.getAddress(user)}</div>
      <div className="balance">Balance: {balance}</div>



    </div>
  );
}

export default Wallet;
