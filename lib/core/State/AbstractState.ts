import { IMountable } from "../Mountable/Mountable"
import { StateObserver, StateObserverNotifyFunction, StatePublisher } from "./AbstractStateObservable"

type ValueFactory<TStateObject, TKey extends keyof TStateObject> = (value: TStateObject[TKey]) => TStateObject[TKey]

export abstract class AbstarctState<TStateObject extends object> implements IMountable {
	private __stateObject: TStateObject

	private __publisher: StatePublisher<TStateObject>

	constructor (initialStateObject: TStateObject) {
		this.__stateObject = Object.assign({}, initialStateObject)
		this.__publisher = new StatePublisher()
	}

	protected get stateObject(): TStateObject {
		return this.__stateObject
	}

	public mount(): void {}

	public unmount(): void {}

	public getSnapshot<TKey extends keyof TStateObject>(key: TKey): TStateObject[TKey] {
		return this.__stateObject[key]
	}

	public subscribe<TKey extends keyof TStateObject>(key: TKey, callback: StateObserverNotifyFunction<TStateObject, TKey>): () => void {
		const observer = new StateObserver<TStateObject>(key, callback as StateObserverNotifyFunction<TStateObject>)
		this.__publisher.subscribe(observer)
		return () => this.__publisher.unsubscribe(observer)
	}

	public removeAllObservers(): void {
		this.__publisher.removeAllObservers()
	}

	protected updateStateObject<TKey extends keyof TStateObject>(key: TKey, value: TStateObject[TKey]): void
	protected updateStateObject<TKey extends keyof TStateObject>(key: TKey, value: ValueFactory<TStateObject, TKey>): void
	protected updateStateObject<TKey extends keyof TStateObject>(key: TKey, value: unknown): void {
		const previousValue = this.__stateObject[key]
		this.__stateObject[key] = typeof value === 'function' ? value(previousValue) : value

		const notifyPayload = this.getSnapshot(key)
		this.__publisher.notify({ key, value: notifyPayload })
	}
}