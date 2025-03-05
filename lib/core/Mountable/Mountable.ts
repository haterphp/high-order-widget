export interface IMountable<TMountPayload = unknown, TUnmountPayload = unknown> {
	mount(payload?: TMountPayload): void
	unmount(payload?: TUnmountPayload): void
}