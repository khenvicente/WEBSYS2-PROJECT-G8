import axios from "axios"
import { useState } from "react"
import { BACKEND_BASE_PORT } from "../baseURL"

export function useContract() {
    const [contracts, setContracts] = useState<any[]>([])
    const BASE_URL = BACKEND_BASE_PORT

    async function getAllContracts() {
        const contracts = await axios.get(`${BASE_URL}/contracts/`)
        setContracts(contracts.data)
    }

    async function getAllContractFamiliar() {
        const contracts = await axios.get(`${BASE_URL}/contracts/familiar`)
        setContracts(contracts.data)
    }

    async function createContract() {
        const response = await axios.post(`${BASE_URL}/contract/create`)
        setContracts(prev => [...prev, response.data])
    }

    async function deleteContract() {
        const response = await axios.post(`${BASE_URL}/contracts/delete`)
        setContracts(prev => {
            return prev.filter(contract => contract.id !== response.data.id)
        })
    }

    return {
        contracts,
        getAllContracts,
        getAllContractFamiliar,
        createContract,
        deleteContract
    }
}