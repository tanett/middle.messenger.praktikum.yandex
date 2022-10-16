import InputFileTmpl from './InputFileTmpl.hbs'
import styles from './style.css'
import Block from '../../utils/Block'


interface IInputTextValidate {
  message: string
  id: string;
  name: string;
  label: string;
  value: File;
  placeholder: string;
  errorMessage: string;
  disabled: boolean;
  classInput: string;
  classLabel: string;
  onUpload: (e: Event, file: File)=>void
  pathAvatar: string
}

export class InputFile extends Block<IInputTextValidate> {
  static componentName: string='InputFile'
 private inputValue: File= this.props.value
 private valid: boolean = true

  constructor(props: IInputTextValidate) {
    super('InputFile', props)
  }


 private onChangeHandler(e: Event): void {

    const file = ( e.target as HTMLInputElement ).files![0]

    if (!file) {
      this.setProps({ message: this.props.errorMessage.toString() })
    } else {
      this.setProps({ message: '', value: file })
      this.props.onUpload(e, file)
    }
  }

 public getValue(){
    return this.inputValue
  }

  public  isValid(){
    return this.props.message === ''
  }

  render() {

    return this.compile(InputFileTmpl, {
      id: this.props.id,
      name: this.props.name,
      label: this.props.label,
      type: 'file',
      placeholder: this.props.placeholder,
      disabled: this.props.disabled,

      errorMessage: this.props.message,
      value: this.props.value,
      classInput: this.props.classInput,
      classLabel: this.props.classLabel,
      onChange: ( (e: Event) => this.onChangeHandler(e) ).bind(this),
      children: this.children,
      pathAvatar:this.props.pathAvatar,
      styles
    })
  }
}
