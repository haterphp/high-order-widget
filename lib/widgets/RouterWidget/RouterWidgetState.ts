import { AbstractState } from "../../core/State/AbstractState";
import { Route, RouteID } from "./Route";

export interface IRouterWidgetState {
	currentRouteId: RouteID
	currentRoute: Route
	routes: Route[]
}

interface IRouterWidgetStatePayload {
	defaultRouteId?: RouteID
	routes: Route[]
}

export class RouterWidgetState extends AbstractState<IRouterWidgetState> {
	constructor(payload: IRouterWidgetStatePayload) {
		const currentRouteId = RouterWidgetState.getDefaultRoute(payload.defaultRouteId, payload.routes)
		const currentRoute = RouterWidgetState.getRouteByRouteId(currentRouteId, payload.routes)

		super({
			currentRouteId,
			currentRoute,
			routes: payload.routes
		})
	}

	public mount(): void {
		this.subscribe('currentRouteId', this.__syncCurrentRouteById.bind(this))
	}

	public updateRouteId(routeId: RouteID): void {
		this.updateStateObject('currentRouteId', routeId)
	}

	private __syncCurrentRouteById(routeId: RouteID): void {
		const route = RouterWidgetState.getRouteByRouteId(routeId, this.stateObject.routes)
		this.updateStateObject('currentRoute', route)
	}

	private static getRouteByRouteId(routeId: RouteID, routes: Route[]): Route {
		// TODO: Must be optimized
		const findedRoute = routes.find((r) => r.routeId === routeId)

		if (findedRoute === undefined) {
			throw new Error(`Route ${routeId} not found`)
		}

		return findedRoute
	}

	private static getDefaultRoute(currentRouteId: RouteID | undefined, routes: Route[]): RouteID {
		if (currentRouteId) return currentRouteId
		return routes[0].routeId ?? ''
	}
}