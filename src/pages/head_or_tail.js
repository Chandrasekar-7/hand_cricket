import { useNavigate } from "react-router-dom"
import Header from "../components/header"

const Head = () => {
  const navigate = useNavigate()
  function onsubmit() {
    navigate("/toss")
  }
  return (
    <div>
      <Header />
      <h1>head or tail</h1>
      <button onClick={onsubmit}>Head</button>
      <button onClick={onsubmit}>Tail</button>
    </div>
  )
}

export default Head