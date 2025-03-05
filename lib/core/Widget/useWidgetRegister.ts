import { useEffect } from "react";
import { IMountable } from "../Mountable/Mountable";

export const useWidgetRegister = (props: IMountable) => {
	useEffect(() => {
		props.mount()
		return () => props.unmount()
	}, [])
}