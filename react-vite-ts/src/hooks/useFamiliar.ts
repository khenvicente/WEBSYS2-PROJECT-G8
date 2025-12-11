import { useEffect, useState } from "react"
import { api } from "../api/axiosClient"

export interface Familiar {
  FamiliarID: number
  GroupID?: number
  name: string
  image?: string
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

  const getAllFamiliars = async () => {
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

  const createFamiliar = async (payload: Omit<Familiar, "FamiliarID">) => {
    try {
      const res = await api.post("/api/familiars", payload)
      await getAllFamiliars()
      return res.data
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.error || err.message || "Unknown error")
      throw err
    }
  }

  const editFamiliar = async (id: number, payload: Partial<Familiar>) => {
    try {
      const res = await api.put(`/api/familiars/${id}`, payload)
      await getAllFamiliars()
      return res.data
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.error || err.message || "Unknown error")
      throw err
    }
  }

  const deleteFamiliar = async (id: number) => {
    try {
      const res = await api.delete(`/api/familiars/${id}`)
      await getAllFamiliars()
      return res.data
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.error || err.message || "Unknown error")
      throw err
    }
  }

  useEffect(() => {
    getAllFamiliars()
  }, [])

  return {
    data,
    loading,
    error,
    getAllFamiliars,
    createFamiliar,
    editFamiliar,
    deleteFamiliar
  }
}
