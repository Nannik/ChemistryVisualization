interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T
}

type Optional<T> = {
  [P in keyof T]?: T[P]
}
