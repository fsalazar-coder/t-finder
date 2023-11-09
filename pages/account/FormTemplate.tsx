


export default function FormTemplate({ inputData, formData, changeData, onChange, onFocus, onBlur }: any) {

  return (
    inputData?.map((inputField: any, index: any) => {
      let formValue = formData[inputField.value];
      let changeValue = changeData[inputField.value];

      const labelClassName = `${(inputField.type === 'select' || formValue || changeValue)
        ? 'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
        : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
        } w-fit h-fit absolute left-1 lg:left-2 top-3 pl-1 pr-2 transition-all`;


      return (
        <div key={index}
          className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'>
          <label htmlFor={inputField.value}>
            <h5 className={labelClassName}>
              {inputField.title}
            </h5>
          </label>
          {
            inputField.type === 'select' ?
              <select
                id={inputField.value}
                name={inputField.value}
                className={
                  `${formValue ? 'border-green-200 shadow-input'
                    : changeValue ? 'border-green-400' : 'border-slate-300'
                  } w-full h-fit pl-2 sm:pl-3 py-1 text-xs lg:text-sm bg-transparent border rounded-md outline-none transition-all z-10`
                }
                required
                value={formValue}
                onFocus={(e: any) => onFocus(e)}
                onBlur={(e: any) => onBlur(e)}
                onChange={(e: any) => onChange(e)}
              >
                {
                  inputField.options.map((option: any, index: any) => (
                    <option key={index} value={option.value}>
                      {option.title}
                    </option>
                  ))
                }
              </select>
              :
              <input
                type={inputField.type}
                id={inputField.value}
                name={inputField.value}
                className={
                  `${formValue ? 'border-green-200 shadow-input'
                    : changeValue ? 'border-green-400' : 'border-slate-300'
                  } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                }
                required
                value={formValue}
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                onChange={(e: any) => onChange(e)}
              />
          }
        </div>
      )
    })
  )
};