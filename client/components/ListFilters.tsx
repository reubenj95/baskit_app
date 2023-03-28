// const handleCheckboxChange = () => {
//   if (ascDesc === 'fa-arrow-down-a-z') {
//     setAscDesc('fa-arrow-up-z-a')
//   } else {
//     setAscDesc('fa-arrow-down-a-z')
//   }
// }
// useEffect(() => {
//   getPantryItems()
//     .then((pantryItems) => {
//       const sortedItems = arraySort(pantryItems, [groupBy, sortBy])
//       if (ascDesc === 'fa-arrow-up-z-a') {
//         sortedItems.reverse()
//         setPantryItems(sortedItems)
//       } else {
//         setPantryItems(sortedItems)
//       }
//       setPantryItems(sortedItems)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }, [groupBy, sortBy, ascDesc])

// <label htmlFor="groupBy">Group by </label>
// <select
//   name="groupBy"
//   id="groupBy"
//   onChange={(event) => {
//     setGroupBy(event.target.value)
//   }}
// >
//   {' '}
//   <option value=""></option>
//   <option value="category">Category</option>
//   <option value="brand">Brand</option>
// </select>
// <label htmlFor="sortBy">Sort by</label>
// <select
//   name="sortBy"
//   id="sortBy"
//   onChange={(event) => {
//     setSortBy(event.target.value)
//   }}
// >
//   <option value=""></option>
//   <option value="name">Name</option>
//   <option value="date added">Date added</option>
//   <option value="best before">Best before</option>
// </select>
// <AscDesc icon={ascDesc} handleChange={handleCheckboxChange} />
