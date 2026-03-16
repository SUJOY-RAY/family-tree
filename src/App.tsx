import { useEffect, useState } from "react"
import { getMembers } from "./db"
import type { Member } from "./types"
import AddMember from "./components/AddMember"
import FamilyTree from "./components/FamilyTree"
import "./tree.css"

export default function App() {
  const [members, setMembers] = useState<Member[]>([])

  async function load() {
    const data = await getMembers()
    setMembers(data)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="container">
      <h1>Family Tree</h1>

      <AddMember refresh={load} />

      <FamilyTree members={members} />
    </div>
  )
}