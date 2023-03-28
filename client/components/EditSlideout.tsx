import { getOnePantryItem } from '../../db'
import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button, Group } from '@mantine/core'
interface ItemId {
  itemId: number
}

export default function EditPantryItem() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Authentication">
        {/* Drawer content */}
      </Drawer>

      <Group position="center">
        <Button onClick={open}>Open Drawer</Button>
      </Group>
    </>
  )
}
