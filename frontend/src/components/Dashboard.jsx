
import Appbar from "../Helpers/Appbar"
import Users from "../Helpers/Users"
import Balance from "../Helpers/Balance"

export default function Dashboard() {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
  )
}
