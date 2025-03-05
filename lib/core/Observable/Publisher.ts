import { Observer } from "./Observer";

export class Publisher<TPayload = unknown, TObserver extends Observer<TPayload> = Observer<TPayload>> {
	private __observers: TObserver[]

	constructor() {
		this.__observers = []
	}

	public get observersList(): TObserver[] {
		return this.__observers
	}

	public notify(payload: TPayload) {
		const listOfObservers = this._getListOfObservers(payload)
		for (const o of listOfObservers) {
			o.onNotified(payload)
		}
	}

	public subscribe(observer: TObserver) {
		this.__observers.push(observer)
	}

	public unsubscribe(observer: TObserver) {
		this.__observers = this.__observers.filter(o => o !== observer)
	}

	public removeAllObservers(): void {
		this.__observers.forEach(this.unsubscribe.bind(this))
		this.__observers = []
	}

	protected _getListOfObservers(_: TPayload): TObserver[] {
		return this.__observers
	}
}