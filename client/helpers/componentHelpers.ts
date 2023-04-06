import { Category, PantryItem, PantryItemNoId } from '../../models/pantryItems'

function parseFridgeInput(input: string): PantryItemNoId {
  const inputArray = input.split(',')
  const name =
    inputArray[0].charAt(0).toUpperCase() +
    inputArray[0].substring(1).toLowerCase()
  const targetQuantity = isNaN(Number(inputArray[1]))
    ? 1
    : Number(inputArray[1])
  const bestBefore = Date.now() + 604800000
  const parsedObject = {
    quantity: 0,
    name,
    category: 0,
    brand: null,
    best_before: bestBefore,
    is_fav: false,
    created_by: 1234,
    target_quantity: targetQuantity,
  }

  return parsedObject
}

function filterCategories(
  categoryId: number,
  categories: Category[]
): Category {
  let filtered
  if (categories) {
    filtered = categories.find((item) => item.id === categoryId)
  }
  return filtered
}

function filterItemsByCategory(items: PantryItem[], category: Category) {
  return items.filter((item) => item.category === category.id)
}

export default {
  parseFridgeInput,
  filterCategories,
  filterItemsByCategory,
}
