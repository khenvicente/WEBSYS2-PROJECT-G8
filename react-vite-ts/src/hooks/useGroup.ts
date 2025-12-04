import axios from "axios"
import { useState } from "react"

export function useGroup() {
    const [groups, setGroups] = useState<any[]>([])
    // const BASE_URL = BACKEND_BASE_PORT

    // async function getAllGroups() {
    //     const groups = await axios.get(`${BASE_URL}/groups/`)
    //     setGroups(groups.data)
    // }

    // async function getAllGroupFamiliar() {
    //     const groups = await axios.get(`${BASE_URL}/groups/familiar`)
    //     setGroups(groups.data)
    // }

    // async function createGroup() {
    //     const response = await axios.post(`${BASE_URL}/groups/create`)
    //     setGroups(prev => [...prev, response.data])
    // }

    // async function deleteGroup() {
    //     const response = await axios.post(`${BASE_URL}/groups/delete`)
    //     setGroups(prev => {
    //         return prev.filter(group => group.id !== response.data.id)
    //     })
    // }

    // return {
    //     groups,
    //     getAllGroups,
    //     getAllGroupFamiliar,
    //     createGroup,
    //     deleteGroup
    // }
}