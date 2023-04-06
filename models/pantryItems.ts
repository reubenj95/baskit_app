export interface PantryItem {
  id: number
  quantity: number
  name: string
  category?: number | null
  brand?: number | null
  image?: string | null
  best_before?: number | null
  is_fav: boolean
  created_by: number
  targetQuantity: number
}

export type PantryItemNoId = {
  id?: number
  quantity: number
  name: string
  category?: number | null
  brand?: number | null
  image?: string | null
  best_before?: number | null
  is_fav: boolean
  created_by: number
  target_quantity: number
}

export type FridgeItem = Partial<PantryItem>

export interface Category {
  id: number
  name: string
  icon?: string
  colour?: string
  created_by: number
}
