import { useState } from "react"
import { addMember } from "../db"
import type { Member } from "../types"

export default function AddMember({ refresh }: { refresh: () => void }) {
  const [name, setName] = useState("")
  const [age, setAge] = useState<number>(0)
  const [photo, setPhoto] = useState<ArrayBuffer | undefined>()
  const [fatherId, setFatherId] = useState<number | null>(null)
  const [motherId, setMotherId] = useState<number | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const buffer = await file.arrayBuffer()
    setPhoto(buffer)
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const member: Member = {
      name,
      age,
      photo,
      father_id: fatherId,
      mother_id: motherId
    }

    await addMember(member)

    setName("")
    setAge(0)
    setPhoto(undefined)
    setFatherId(null)
    setMotherId(null)

    refresh()
  }

  return (
    <form className="form" onSubmit={submit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />

      <input type="file" accept="image/*" onChange={handleFile} />

      <input
        type="number"
        placeholder="Father ID"
        value={fatherId ?? ""}
        onChange={(e) => setFatherId(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Mother ID"
        value={motherId ?? ""}
        onChange={(e) => setMotherId(Number(e.target.value))}
      />

      <button>Add Member</button>
    </form>
  )
}