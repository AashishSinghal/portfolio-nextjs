import type React from "react"
declare module "@radix-ui/react-slot" {
  interface SlotProps {
    children?: React.ReactNode
  }

  const Slot: React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<HTMLElement>>

  export { Slot }
}

