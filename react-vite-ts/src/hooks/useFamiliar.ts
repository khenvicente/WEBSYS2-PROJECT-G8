import { useEffect, useState } from "react"
import { api } from "../api/axiosClient"

export interface Familiar {
  FamiliarID: number
  name: string
  img?: string
  species?: string
  size?: string
  color?: string
  pattern?: string
  personality?: string
  rarity?: string
  typing?: string[]
}

export function useFamiliar() {
  const [data, setData] = useState<Familiar[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch ALL
  const getFamiliars = async () => {
    setLoading(true)
    try {
      const res = await api.get("/api/familiars")
      setData(res.data)
      setError(null)
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.error || err.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  // Fetch ONE by ID
  const getFamiliar = async (id: number): Promise<Familiar | null> => {
    try {
      const res = await api.get(`/api/familiars/${id}`)
      return res.data
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.error || err.message || "Unknown error")
      return null
    }
  }

  // Create Familiar
  const createFamiliar = async (payload: Omit<Familiar, "FamiliarID">) => {
    try {
      const res = await api.post("/api/familiars", payload)
      // Optional: refresh list after adding
      await getFamiliars()
      return res.data
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.error || err.message || "Unknown error")
      throw err
    }
  }

  // load on mount
  useEffect(() => {
    getFamiliars()
  }, [])

  return {
    data,
    loading,
    error,
    getFamiliars,
    getFamiliar,
    createFamiliar,
  }
}
