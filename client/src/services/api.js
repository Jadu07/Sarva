const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export const getAllOs = async (categoryId) => {
  const url = categoryId ? `${BASE_URL}/os?categoryId=${categoryId}` : `${BASE_URL}/os`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch OS distributions')
  return res.json()
}
