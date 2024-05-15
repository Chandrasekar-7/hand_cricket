import { useNavigate } from "react-router-dom"
import Header from "../components/header"

const Play = () => {
  const navigate = useNavigate()
  function onsubmit() {
    navigate("/head_or_tail")
  }
  return (
    <div>
      <Header />
      <h1>play</h1>
      <button onClick={onsubmit}>Play</button>
    </div>
  )
}

export default Play
