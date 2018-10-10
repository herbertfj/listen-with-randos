import * as React from "react"

declare module "react" {
  type StateSetter<T> = T | (() => T)

  declare function useState<T>(
    initialState: StateSetter<T>
  ): [T, (newState: StateSetter<T>) => void]

  declare function useEffect(
    create: () => void | (() => void),
    inputs?: any[]
  ): void
}
