import { Observer } from "../Observable/Observer"
import { Publisher } from "../Observable/Publisher"

interface IStateObserverPayload<TStateObject extends object, TKey extends keyof TStateObject = keyof TStateObject> {
	key: TKey
	value: TStateObject[TKey]
}

export type StateObserverNotifyFunction<TStateObject extends object, TKey extends keyof TStateObject = keyof TStateObject> = (value: TStateObject[TKey]) => void

export class StateObserver<TStateObject extends object, TKey extends keyof TStateObject = keyof TStateObject> extends Observer<IStateObserverPayload<TStateObject, TKey>> {

	private __key: TKey

	private __executeFunction: StateObserverNotifyFunction<TStateObject, TKey>

	public get key(): TKey {
		return this.__key
	}

	constructor (key: TKey, executeFunction: StateObserverNotifyFunction<TStateObject, TKey>) {
		super()
		this.__key = key
		this.__executeFunction = executeFunction
	}

	public onNotified(payload: IStateObserverPayload<TStateObject, TKey>): void {
		this.__executeFunction(payload.value)
	}
}

export class StatePublisher<TStateObject extends object> extends Publisher<IStateObserverPayload<TStateObject>, StateObserver<TStateObject>> {
	protected _getListOfObservers(payload: IStateObserverPayload<TStateObject, keyof TStateObject>): StateObserver<TStateObject>[] {
		return this.observersList.filter(item => item.key === payload.key)
	}
}