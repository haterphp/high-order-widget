import { JSX } from "react";
import { IRouterWidgetState, RouterWidgetState } from "./RouterWidgetState";
import RouterWidgetView, { IRouterWidgetViewProps } from "./RouterWidget.view";
import { Route, RouteID } from "./Route";
import {Widget} from "../../core/Widget/Widget";

type OnRouteChanged = (route: Route) => void

export class RouterWidget extends Widget<IRouterWidgetState, RouterWidgetState> {
	public updateRouteId(routeId: RouteID): void {
		this._state.updateRouteId(routeId)
	}

	public onRouteChanged(callback: OnRouteChanged): () => void {
		return this._state.subscribe('currentRoute', callback)
	}

	protected _getWidget(props: IRouterWidgetViewProps): JSX.Element {
		return <RouterWidgetView {...props} />
	}
}