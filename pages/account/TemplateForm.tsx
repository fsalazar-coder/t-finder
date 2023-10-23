


export default function TemplateForm(props: any) {

  const inputData = props.inputData;
  const formData = props.formData;
  const changeData = props.changeData;


  return (
    inputData.map((element: any, index: any) => {
      const formValue = formData[element.value];
      const changeValue = changeData[element.value];
      return (
        <div
          key={`${element.title}-${index}`}
          className='w-full h-fit pt-6 relative flex flex-col justify-start items-start'
        >
          {
            element.type === 'select' ?
              <>
                <label htmlFor={element.value}>
                  <h5 className='w-fit h-fit absolute left-1 lg:left-2 top-3 pl-1 pr-2 text-gray-600 text-xs lg:text-sm font-normal bg-white transition-all z-20'>
                    {element.title}
                  </h5>
                </label>
                <select
                  id={element.value}
                  name={element.value}
                  className={
                    `${formValue ?
                      'border-green-200 shadow-input'
                      : changeValue ?
                        'border-green-400'
                        : 'border-slate-300'
                    } w-full h-fit pl-2 sm:pl-3 py-1 text-xs lg:text-sm bg-transparent border rounded-md outline-none transition-all z-10`
                  }
                  required
                  value={formValue}
                  onFocus={(e: any) => props.onFocus(e)}
                  onBlur={(e: any) => props.onBlur(e)}
                  onChange={(e: any) => props.onChange(e)}
                >
                  {
                    element.options.map((option: any, index: any) => (
                      <option value={option.value}>
                        {option.title}
                      </option>
                    )
                    )
                  }
                </select>
              </>
              :
              <>
                <label htmlFor={element.value}>
                  <h5
                    className={
                      `${formValue ?
                        'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                        : changeValue ?
                          'top-3 text-gray-600 text-xs lg:text-sm bg-white z-20'
                          : 'top-[1.80rem] lg:top-[1.80rem] text-gray-400 text-sm lg:text-base bg-none z-0'
                      } w-fit h-fit absolute left-1 lg:left-2 pl-1 pr-2 font-normal transition-all`
                    }
                  >
                    {element.title}
                  </h5>
                </label>
                <input
                  type={element.type}
                  id={element.value}
                  name={element.value}
                  className={
                    `${formValue ?
                      'border-green-200 shadow-input'
                      : changeValue ?
                        'border-green-400'
                        : 'border-slate-300'
                    } w-full h-fit pl-2 sm:pl-3 py-1 text-sm lg:text-base bg-transparent border rounded-md outline-none transition-all z-10`
                  }
                  required={element.value === 'birthday' ? false : true}
                  value={formValue}
                  onFocus={(e) => props.onFocus(e)}
                  onBlur={(e) => props.onBlur(e)}
                  onChange={(e: any) => props.onChange(e)}
                />
              </>
          }
        </div>
      )
    })
  )
};

