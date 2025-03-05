import { AbstarctState } from "../../core/State/AbstractState"

type FormFieldsKeys<TFormFields extends object> = (keyof TFormFields)[]

interface IBaseFormWidgetStatePayload {}

export type IFormWidgetState<TFormFields> = TFormFields & IBaseFormWidgetStatePayload
export type IFormWidgetStatePayload<TFormFields extends object> = { formFields: TFormFields } & IBaseFormWidgetStatePayload

export class FormWidgetState<TFormFields extends object> extends AbstarctState<TFormFields> {
	private __formKeys: FormFieldsKeys<TFormFields>

	constructor(payload: IFormWidgetStatePayload<TFormFields>) {
		const { formFields, ...rest } = payload
		super({ ...formFields, ...rest })

		this.__formKeys = FormWidgetState.getFormKeys<TFormFields>(formFields)
	}

	public getFormFields(): TFormFields {
		return this.__formKeys.map((key) => [key, this.stateObject[key]])
							.reduce((prev, [key, value]) => ({ ...prev, [key as keyof TFormFields]: value }), {} as TFormFields)
	}

	public updateFormField<TKey extends keyof TFormFields>(key: TKey, value: TFormFields[TKey]) {
		if (!this.__formKeys.includes(key)) {
			throw new Error(`Key ${key.toString()} not found in ${this.constructor.name}`)
		}
		this.updateStateObject(key, value)
	}

	private static getFormKeys<TFormFields extends object>(formFields: TFormFields): FormFieldsKeys<TFormFields> {
		return Object.keys(formFields) as FormFieldsKeys<TFormFields>
	}
}