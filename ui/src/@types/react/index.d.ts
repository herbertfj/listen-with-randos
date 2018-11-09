import * as React from "react"

declare module "react" {
  type StateSetter<T> = T | (() => T)

  export function useState<T>(
    initialState: StateSetter<T>
  ): [T, (newState: StateSetter<T>) => void]

  export function useEffect(
    create: () => void | (() => void),
    inputs?: any[]
  ): void
}
