import { JSX, useMemo } from "react";
import { IRouterWidgetState, RouterWidgetState } from "./RouterWidgetState";
import { IWidgetViewProps } from "../../core/Widget/Widget";
import { useWidgetRegister } from "../../core/Widget/useWidgetRegister";
import { useSyncState } from "../../core/State/useSyncState";

export interface IRouterWidgetViewProps extends IWidgetViewProps<IRouterWidgetState, RouterWidgetState> {}

export default function RouteWidgetView(props: IRouterWidgetViewProps): JSX.Element | null {
	useWidgetRegister(props)

	const currentRoute = useSyncState<IRouterWidgetState>(props.state)('currentRoute')
	const widget = useMemo(() => currentRoute.widget, [currentRoute])

	return widget.render()
}