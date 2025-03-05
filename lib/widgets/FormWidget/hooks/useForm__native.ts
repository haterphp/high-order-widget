import { FormWidgetState, IFormWidgetState } from "../FormWidgetState"
import { IFormWidgetViewProps } from "../FormWidget"
import { useSyncState } from "../../../core/State/useSyncState"

type InputElement = HTMLInputElement | HTMLTextAreaElement

export interface UseFormRegisterReturns {
	value?: any
	checked?: any
	onChangeText: (value: string) => void
}

export interface IUseFormReturns<TFormFields extends object> {
	register: <TKey extends keyof TFormFields>(key: TKey) => UseFormRegisterReturns
	onSubmit: () => void
}

export const useForm = <
	TFormFields extends object,
	TState extends FormWidgetState<TFormFields> = FormWidgetState<TFormFields> ,
	TWidgetViewProps extends IFormWidgetViewProps<TFormFields, TState> = IFormWidgetViewProps<TFormFields, TState>
>(props: TWidgetViewProps): IUseFormReturns<TFormFields> => {
	const getStateValue = useSyncState<IFormWidgetState<TFormFields>, TState>(props.state)

	const handleOnChange = <TKey extends keyof TFormFields,>(key: TKey, value: string) => {
		props.state.updateFormField(key, value as TFormFields[TKey])
	}

	const register = <TKey extends keyof TFormFields,>(key: TKey) => {
		return {
			value: getStateValue(key),
			checked: getStateValue(key),
			onChangeText: handleOnChange.bind(null, key)
		}
	}

	return { onSubmit: () => props.onSubmit(), register }
}