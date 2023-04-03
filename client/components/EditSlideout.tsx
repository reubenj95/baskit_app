// import { useAppSelector } from '../hooks'
// import { LoadingOverlay, Button, Group, Box } from '@mantine/core'
// import { useDisclosure } from '@mantine/hooks'
// import { useEffect } from 'react'
// interface ItemId {
//   itemId: number
// }

// export default function EditSlideout() {
//   const [visible, { toggle }] = useDisclosure(true)

//   const { isLoading, error, data } = useAppSelector((state) => state.pantryList)

//   if (isLoading) {
//     return <LoadingOverlay visible={visible} overlayBlur={2} />
//   }
//   if (error) {
//     return <div>Something went wrong retrieving your fridge list</div>
//   }
//   if (data) {
//     return (
//       <>
//         <h2>{data.name}</h2>
//         <p>{data.quantity}</p>
//       </>
//     )
//   }
//   return <p>Something went wrong...</p>
// }
