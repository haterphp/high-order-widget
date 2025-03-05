export abstract class Observer<TPayload = unknown> {
	public abstract onNotified(payload: TPayload): void
}