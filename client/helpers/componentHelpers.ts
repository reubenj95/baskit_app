import { PantryItemNoId } from '../../models/pantryItems'

export function parseFridgeInput(input: string): PantryItemNoId {
  const inputArray = input.split(',')
  const name =
    inputArray[0].charAt(0).toUpperCase() +
    inputArray[0].substring(1).toLowerCase()
  const quantity = isNaN(Number(inputArray[1])) ? 1 : Number(inputArray[1])
  const bestBefore = Date.now() + 604800000
  const parsedObject = {
    quantity,
    name,
    category: null,
    brand: null,
    best_before: bestBefore,
    is_fav: false,
    created_by: 1234,
  }

  return parsedObject
}
