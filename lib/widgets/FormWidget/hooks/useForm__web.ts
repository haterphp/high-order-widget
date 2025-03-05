import { ChangeEvent, ChangeEventHandler, FormEvent } from "react"
import { FormWidgetState, IFormWidgetState } from "../FormWidgetState"
import { IFormWidgetViewProps } from "../FormWidget"
import { useSyncState } from "../../../core/State/useSyncState"

type InputElement = HTMLInputElement | HTMLTextAreaElement
export interface UseFormRegisterReturns {
	value?: any
	checked?: any
	onChange: ChangeEventHandler<InputElement>
}

export interface IUseFormReturns<TFormFields extends object> {
	register: <TKey extends keyof TFormFields>(key: TKey) => UseFormRegisterReturns
	onSubmit: (e: FormEvent) => void
}

export const useForm = <
	TFormFields extends object,
	TState extends FormWidgetState<TFormFields> = FormWidgetState<TFormFields> ,
	TWidgetViewProps extends IFormWidgetViewProps<TFormFields, TState> = IFormWidgetViewProps<TFormFields, TState>
>(props: TWidgetViewProps): IUseFormReturns<TFormFields> => {
	const getStateValue = useSyncState<IFormWidgetState<TFormFields>, TState>(props.state)

	const handleOnSubmit = (e: FormEvent) => {
		e.preventDefault()
		props.onSubmit()
	}

	const getValueByInputType = (input: InputElement): 'checked' | 'value' => {
		switch(input.type) {
			case 'checkbox': return 'checked'
			default: return 'value'
		}
	}

	const handleOnChange = <TKey extends keyof TFormFields,>(key: TKey, event: ChangeEvent<InputElement>) => {
		const $input = event.target as InputElement
		const inputValueKey = getValueByInputType($input)
		const value = $input[inputValueKey as keyof InputElement]
		props.state.updateFormField(key, value as TFormFields[TKey])
	}

	const register = <TKey extends keyof TFormFields,>(key: TKey) => {
		return {
			value: getStateValue(key),
			checked: getStateValue(key),
			onChange: handleOnChange.bind(null, key)
		}
	}

	return { onSubmit: handleOnSubmit, register }
}