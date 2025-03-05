import { useSyncExternalStore } from "react";
import { AbstractState } from "./AbstractState";

export const useSyncState = <
	TStateObject extends object = object,
	TState extends AbstractState<TStateObject> = AbstractState<TStateObject>
>(state: TState): <TKey extends keyof TStateObject>(key: TKey) => TStateObject[TKey] => {
	return <TKey extends keyof TStateObject>(key: TKey) => {
		const onSubscribe = (listener: Function) => {
			const unsubscribe = state.subscribe(key, listener as any)
			return unsubscribe.bind(state)
		}

		return useSyncExternalStore(onSubscribe, state.getSnapshot.bind(state, key)) as TStateObject[TKey]
	}
}