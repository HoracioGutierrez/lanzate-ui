export type UseControllableValueOptions<T> = {
  value: T | undefined
  defaultValue: T
  onValueChange: ((value: T) => void) | undefined
}
