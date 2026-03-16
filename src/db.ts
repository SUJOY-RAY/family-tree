import type { Member } from "./types"

const DB_NAME = "FamilyTreeDB"
const DB_VERSION = 1
const STORE = "members"

export function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION)

        req.onupgradeneeded = () => {
            const db = req.result

            if (!db.objectStoreNames.contains(STORE)) {
                const store = db.createObjectStore(STORE, {
                    keyPath: "id",
                    autoIncrement: true
                })

                store.createIndex("father_id", "father_id")
                store.createIndex("mother_id", "mother_id")
            }
        }

        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
    })
}

export async function addMember(member: Member) {
    const db = await openDB()

    const tx = db.transaction(STORE, "readwrite")
    const store = tx.objectStore(STORE)

    store.add(member)

    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true)
        tx.onerror = () => reject(tx.error)
    })
}

export async function getMembers(): Promise<Member[]> {
    const db = await openDB()

    const tx = db.transaction(STORE, "readonly")
    const store = tx.objectStore(STORE)

    return new Promise((resolve, reject) => {
        const req = store.getAll()

        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
    })
}