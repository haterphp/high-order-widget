import { AbstarctState } from "../../core/State/AbstractState"
import {Widget} from "../../core/Widget/Widget"

export type RouteID = string | number

export type WidgetFactory<
	TStateObject extends object = any,
	TState extends AbstarctState<TStateObject> = AbstarctState<TStateObject>,
	TWidget extends Widget<TStateObject, TState> = Widget<TStateObject, TState>
> = () => TWidget

export class Route<
	TStateObject extends object = any,
	TState extends AbstarctState<TStateObject> = AbstarctState<TStateObject>,
	TWidget extends Widget<TStateObject, TState> = Widget<TStateObject, TState>
> {
	private __routeId: RouteID

	private __widgetFactory: WidgetFactory<TStateObject, TState, TWidget>

	public get routeId(): RouteID {
		return this.__routeId
	}

	public get widget(): TWidget {
		return this.__widgetFactory()
	}

	private constructor(routeId: RouteID, widget: WidgetFactory<TStateObject, TState, TWidget>) {
		this.__routeId = routeId
		this.__widgetFactory = widget
	}

	public static new<
		TStateObject extends object = any,
		TState extends AbstarctState<TStateObject> = AbstarctState<TStateObject>,
		TWidget extends Widget<TStateObject, TState> = Widget<TStateObject, TState>
	>(routeId: string, widget: WidgetFactory<TStateObject, TState, TWidget>): Route<TStateObject, TState, TWidget> {
		return new Route(routeId, widget)
	}
}