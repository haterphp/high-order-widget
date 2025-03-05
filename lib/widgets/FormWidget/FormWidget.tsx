import { IWidgetViewProps, Widget } from "../../core/Widget/Widget";
import { FormWidgetState, IFormWidgetState } from "./FormWidgetState";

interface IFormWidgetPayload<
	TFormFields extends object,
	TFormWidgetState extends FormWidgetState<TFormFields>
> {
	state: TFormWidgetState
}

export interface IFormWidgetViewProps<
	TFormFields extends object,
	TFormWidgetState extends FormWidgetState<TFormFields> = FormWidgetState<TFormFields>
> extends IWidgetViewProps<IFormWidgetState<TFormFields>, TFormWidgetState> {
	onSubmit(): void
}

export abstract class FormWidget<
	TFormFields extends object,
	TFormWidgetState extends FormWidgetState<TFormFields> = FormWidgetState<TFormFields>
> extends Widget<IFormWidgetState<TFormFields>, TFormWidgetState> {
	constructor(payload: IFormWidgetPayload<TFormFields, TFormWidgetState>) {
		super({ state: payload.state })
	}

	protected _getWidgetViewProps(): IFormWidgetViewProps<TFormFields, TFormWidgetState> {
		return {
			...super._getWidgetViewProps(),
			onSubmit: this._onSubmit.bind(this)
		}
	}

	protected abstract _onSubmit(): void
}