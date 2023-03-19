export interface PantryItem {
  quantity: number
  name: string
  category: number | null
  brand: number | null
  image: string | null
  best_before: number | null
  is_fav: boolean
  created_by: number
}
