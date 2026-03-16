import type { Member } from "../types"
import { bufferToImage } from "../utils"

export default function FamilyTree({ members }: { members: Member[] }) {

  const roots = members.filter(
    (m) => m.father_id == null && m.mother_id == null
  )

  function children(id?: number) {
    return members.filter(
      (m) => m.father_id === id || m.mother_id === id
    )
  }

  function renderNode(member: Member) {
    const kids = children(member.id)

    return (
      <li key={member.id}>
        <div className="card">
          {member.photo && (
            <img src={bufferToImage(member.photo)} />
          )}
          <div>{member.name}</div>
          <small>{member.age}</small>
        </div>

        {kids.length > 0 && (
          <ul>
            {kids.map((k) => renderNode(k))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <div className="tree">
      <ul>
        {roots.map((r) => renderNode(r))}
      </ul>
    </div>
  )
}