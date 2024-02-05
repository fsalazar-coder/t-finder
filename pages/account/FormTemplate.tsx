interface InputField {
  value: string;
  type: string;
  title: string;
  options?: Option[];
}

interface Option {
  value: string;
  title: string;
}

interface FormFieldPros {
  field: InputField,
  formValue: string,
  changeValue: boolean,
  onChange: FormTemplateProps['onChange'],
  onFocus: FormTemplateProps['onFocus'],
  onBlur: FormTemplateProps['onBlur']
}

interface FormTemplateProps {
  inputData: InputField[];
  formData: { [key: string]: any };
  changeData: { [key: string]: any };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormField = ({ field, formValue, changeValue, onChange, onFocus, onBlur }: FormFieldPros) => {
  const { value, type, title, options } = field;
  const isSelect = type === 'select';

  const labelClass = `top-${isSelect || formValue || changeValue ? '3' : '[1.80rem]'} 
  text-gray-${isSelect || formValue || changeValue ? '600' : '400'} text-${isSelect || formValue || changeValue ? 'xs' : 'sm'} 
  lg:text-${isSelect || formValue || changeValue ? 'sm' : 'base'} bg-${isSelect || formValue || changeValue ? 'white' : 'none'}`;

  const inputClass = formValue ? 'border-color-highlighted-clear shadow-input' :
    changeValue ? 'border-color-highlighted' : 'border-color-border';

  return (
    <div className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
      <label
        htmlFor={value}
        className={`${labelClass} w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 transition-all z-20`}>
        {title}
      </label>
      {
        isSelect ?
          <select
            id={value} name={value} value={formValue}
            className={`${inputClass} w-full h-fit pl-2 sm:pl-3 py-1 text-xs lg:text-sm bg-transparent border rounded-md outline-none transition-all z-10`}
            onFocus={onFocus} onBlur={onBlur} onChange={onChange}
            required
          >
            {options?.map((option, idx) => <option key={idx} value={option.value}>{option.title}</option>)}
          </select>
          :
          <input
            id={value} type={type} name={value} value={formValue}
            className={`${inputClass} w-full h-fit pl-2 sm:pl-3 py-1 text-xs lg:text-sm bg-transparent border rounded-md outline-none transition-all z-10`}
            onFocus={onFocus} onBlur={onBlur} onChange={onChange}
            required
          />
      }
    </div>
  );
};

export default function FormTemplate({ inputData, formData, changeData, onChange, onFocus, onBlur }: FormTemplateProps) {
  return (
    <>
      {inputData?.map((field, index) => (
        <FormField
          key={index} field={field}
          formValue={formData[field.value]}
          changeValue={!!changeData[field.value]}
          onChange={onChange} onFocus={onFocus} onBlur={onBlur}
        />
      ))}
    </>
  );
}


///export default function FormTemplate({ inputData, formData, changeData, onChange, onFocus, onBlur }: FormTemplateProps) {
///
///  return (
///    inputData?.map(({value, type, title, options }: any, index: any) => {
///      const formValue: any = formData[value];
///      const changeValue: any = changeData[value];
///
///      const labelClassName: string = `${(type === 'select' || formValue || changeValue) ?
///        'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20' : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
///        } w-fit h-fit absolute left-1 lg:left-2 top-3 pl-1 pr-2 transition-all`;
///
///      const inputSelectClassName: string = `${formValue ? 'border-color-highlighted-clear shadow-input' :
///        changeValue ? 'border-color-highlighted' : 'border-color-border'
///        } w-full h-fit pl-2 sm:pl-3 py-1 text-xs lg:text-sm bg-transparent border rounded-md outline-none transition-all z-10`;
///
///
///      return (
///        <div key={index}
///          className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
///          <label htmlFor={value}>
///            <h5 className={labelClassName}>
///              {title}
///            </h5>
///          </label>
///          {
///            type === 'select' ?
///              <select
///                id={value}
///                name={value}
///                className={inputSelectClassName}
///                required
///                value={formValue}
///                onFocus={(e: any) => onFocus(e)}
///                onBlur={(e: any) => onBlur(e)}
///                onChange={(e: any) => onChange(e)}
///              >
///                {
///                  options.map(({value, title}: any, index: any) => (
///                    <option key={index} value={value}>
///                      {title}
///                    </option>
///                  ))
///                }
///              </select>
///              :
///              <input
///                id={value}
///                type={type}
///                name={value}
///                className={inputSelectClassName}
///                required
///                value={formValue}
///                onFocus={(e) => onFocus(e)}
///                onBlur={(e) => onBlur(e)}
///                onChange={(e: any) => onChange(e)}
///              />
///          }
///        </div>
///      )
///    })
///  )
///};