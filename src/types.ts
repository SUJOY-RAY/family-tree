export interface Member {
    id?: number
    name: string
    age: number
    photo?: ArrayBuffer
    father_id?: number | null
    mother_id?: number | null
}