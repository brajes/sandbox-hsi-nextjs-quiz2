const Separator = () => {
  return <div className="form-separator mt-1">
    <div className="horizontal-separator"></div>
  </div>
}

const FormHeader = () => {
  return <div className="multiform-header">
      <h1>Get a project quote</h1>
      <p>Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.</p>
    </div>
}

const FormLineStepIndicator = ({currentStep, step}) => {
  if (currentStep == 4) {
    return <div className="line-indicator">
      <div className="line-indicator-full"></div>
    </div>
  } else {
    return <div className="line-indicator">
    {currentStep > step &&
      <div className="line-indicator-full"></div>
    }
    {currentStep == step &&
      <div className="line-indicator-half"></div>
    }
  </div>
  }
}

const FormNumberStepIndicator = props => {
  if (props.step <= props.currentStep) {
    return <div className="number-indicator">{props.step}</div>
  } else {
    return <div className="number-indicator incomplete">{props.step}</div>
  }
}

const FormStepIndicator = props => {
  return (
    <div className="flex-ctr">
      <FormNumberStepIndicator currentStep={ props.step } step={ 1 } />
      <FormLineStepIndicator currentStep={ props.step } step={ 1 } />
      <FormNumberStepIndicator currentStep={ props.step } step={ 2 } />
      <FormLineStepIndicator currentStep={ props.step } step={ 2 } />
      <FormNumberStepIndicator currentStep={ props.step } step={ 3 } />
      <FormLineStepIndicator currentStep={ props.step } step={ 3 } />
      <FormNumberStepIndicator currentStep={ props.step } step={ 4 } />
      <FormLineStepIndicator currentStep={ props.step } step={ 4 } />
    </div>
  )
}

const FormTitle = (props) => {
  return <div>
    <h1>{props.title}</h1>
    <p>{props.desc}</p>
  </div>
}

const ContactTextInput = ({ fieldId, fieldLabel, fieldValue, fieldError, fieldRef, onChange, onBlur, img, placeholder }) => {
  return <div className={`form-inputs ${fieldError ? 'inputs-errors' : '' }`}>
    <label htmlFor={fieldId}>{fieldLabel}</label>
    <div className="input-container">
      <img src={img} />
      <input name={fieldId} value={fieldValue} ref={fieldRef} className="form-input text-input" placeholder={placeholder} onChange={onChange} onBlur={onBlur} />
    </div>
    <span className="error-label">{fieldError}</span>
  </div>
}

const onInputChange = (name, value, dispatch) => {
  const error = validateInput(name, value)

  dispatch({
    type: UPDATE_FORM,
    payload: { name, value, error }
  })
}

const onFocusOut = (name, value, dispatch) => {
  const error = validateInput(name, value)
  dispatch({
    type: UPDATE_FORM,
    payload: { name, value, error }
  })
}

const onPreviousStep = (step, dispatch) => {
  dispatch({
    type: UPDATE_STEP,
    payload: { step }
  })
}

const onNextStep = (step, dispatch) => {
  dispatch({
    type: UPDATE_STEP,
    payload: { step }
  })
}

const ContactsDetailForm = () => {
  const {formData, dispatch} = React.useContext(FormContext)
  const nameTextInputRef = React.useRef(null);
  const phoneTextInputRef = React.useRef(null);
  const emailTextInputRef = React.useRef(null);
  const companyTextInputRef = React.useRef(null);
  const inputRefs = { name: nameTextInputRef, phone: phoneTextInputRef, email: emailTextInputRef, company: companyTextInputRef }

  const onSubmit = (e) => {
    e.preventDefault()
    let isFormValid = true
    let isFocused = false

    for(const name in formData) {
      const item = formData[name]
      const { value } = item
      if (typeof item === 'object') {
        const error = validateInput(name, value)
        if (error) {
          isFormValid = false
          if (isFocused === false) {
            inputRefs[name].current?.focus()
            isFocused = true
          }
        }
        dispatch({
          type: UPDATE_FORM,
          payload: { name, value, error }
        })
      }
    }

    if (isFormValid) {
      onNextStep(2, dispatch)
    }
  }

  return <div className="container">
    <FormHeader />
    <form onSubmit={onSubmit}>
      <div className="group form-group">
        <div className="form-group-container">
          <FormStepIndicator step={1} />
          <Separator />
          <FormTitle title="Contacts Detail" desc="Lorem ipsum dolor sit amet consectetur adipisc." />
          <div className="inputs-container mt-32">
            <ContactTextInput
              fieldId="name"
              fieldLabel="Name"
              img="user.png"
              fieldValue={formData.name.value}
              placeholder="Name"
              fieldError={formData.name.error}
              fieldRef={nameTextInputRef}
              onChange={(e) => {onInputChange('name', e.target.value, dispatch)}}
              onBlur={(e) => {onFocusOut('name', e.target.value, dispatch)}} />

            <ContactTextInput
              fieldId="email"
              fieldLabel="Email"
              img="email.png"
              fieldValue={formData.email.value}
              placeholder="Email"
              fieldError={formData.email.error}
              fieldRef={emailTextInputRef}
              onChange={e => {onInputChange('email', e.target.value, dispatch)}}
              onBlur={(e) => {onFocusOut('email', e.target.value, dispatch)}} />

            <ContactTextInput
              fieldId="phone"
              fieldLabel="Phone"
              img="phone.png"
              fieldValue={formData.phone.value}
              placeholder="Phone"
              fieldError={formData.phone.error}
              fieldRef={phoneTextInputRef}
              onChange={e => {onInputChange('phone', e.target.value, dispatch)}}
              onBlur={(e) => {onFocusOut('phone', e.target.value, dispatch)}} />

            <ContactTextInput
              fieldId="company"
              fieldLabel="Company"
              img="company.png"
              fieldValue={formData.company.value}
              placeholder="Company"
              fieldError={formData.company.error}
              fieldRef={companyTextInputRef}
              onChange={e => {onInputChange('company', e.target.value, dispatch)}}
              onBlur={(e) => {onFocusOut('company', e.target.value, dispatch)}} />
          </div>
        </div>
      </div>
      <div className="group form-footer">
        <div className="flex-end">
        <button className="button next-button">Next step</button>
        </div>
      </div>
    </form>
  </div>
}

const InputCheckbox = ({ fieldId, fieldName, fieldValue, fieldLabel, isChecked, onChange }) => {
  return <div className="form-inputs">
    <div className="input-container">
      <label htmlFor={fieldId}>{fieldLabel}</label>
      <input type="radio" id={fieldId} name={fieldName} defaultChecked={isChecked} className={`form-input checkbox-input cb-input-${fieldId}`} value={fieldValue} onChange={onChange} />
    </div>
  </div>
}

const RadioInput = ({ fieldId, fieldName, fieldValue, fieldLabel, isChecked, onChange }) => {
  return <div className="form-inputs">
    <div className="input-container rd-input">
      <input type="radio" id={fieldId} name={fieldName} defaultChecked={isChecked} className="form-input radio-input" value={fieldValue} onChange={onChange} />
      <label htmlFor={fieldId}>{fieldLabel}</label>
    </div>
  </div>
}

const ServicesForm = () => {
  const {formData, dispatch} = React.useContext(FormContext)

  const onSubmit = (e) => {
    e.preventDefault()
    onNextStep(formData.step + 1, dispatch)
  }

  const isChecked = (value) => {
    return formData.service.value == value
  }

  return <div className="container">
    <FormHeader />
    <form onSubmit={onSubmit}>
      <div className="group form-group">
        <div className="form-group-container">
          <FormStepIndicator step={2} />
          <Separator />
          <FormTitle title="Our services" desc="Please select which service you are interested in." />
          <div className="inputs-container mt-32 checkbox-input-container" onChange={(e) => {onInputChange('service', e.target.value, dispatch)}}>
            <InputCheckbox fieldId="development" fieldName="service" fieldLabel="Development" fieldValue="development" isChecked={isChecked('development')} />
            <InputCheckbox fieldId="webdesign" fieldName="service" fieldLabel="Web Design" fieldValue="web-design" isChecked={isChecked('web-design')} />
            <InputCheckbox fieldId="marketing" fieldName="service" fieldLabel="Marketing" fieldValue="marketing" isChecked={isChecked('marketing')} />
            <InputCheckbox fieldId="other" fieldName="service" fieldLabel="Other" fieldValue="other" isChecked={isChecked('other')} />
          </div>
        </div>
      </div>
      <div className="group form-footer">
        <div className="footer-container">
          <button className="button prev-button" onClick={() => {onPreviousStep(1, dispatch)}}>Previous step</button>
          <button type="submit" className="button next-button">Next step</button>
        </div>
      </div>
    </form>
  </div>
}

const BudgetForm = () => {
  const {formData, dispatch} = React.useContext(FormContext)

  const isChecked = (value) => {
    return formData.budget.value == value
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onNextStep(formData.step + 1, dispatch)
  }

  return <div className="container">
    <FormHeader />
    <form onSubmit={onSubmit}>
      <div className="group form-group">
        <div className="form-group-container">
          <FormStepIndicator step={3} />
          <Separator />
          <FormTitle title="What's your project budget?" desc="Please select the project budget range you have in mind." />
          <div className="inputs-container mt-32 checkbox-input-container" onChange={(e) => { onInputChange('budget', e.target.value, dispatch) }}>
            <RadioInput fieldId="b5000_100000" fieldName="budget" fieldLabel="$5000 - $10.000" isChecked={isChecked("5000-10000")} fieldValue="5000-10000" />
            <RadioInput fieldId="b10000_200000" fieldName="budget" fieldLabel="$10.000 - $20.000" isChecked={isChecked("10000-20000")} fieldValue={"10000-20000"} />
            <RadioInput fieldId="b20000_500000" fieldName="budget" fieldLabel={"$20.000 - $50.000"} isChecked={isChecked("20000-50000")} fieldValue={"20000-50000"} />
            <RadioInput fieldId="b50000p" fieldName="budget" fieldLabel={"$50.000 +"} isChecked={isChecked("50000+")} fieldValue={"50000+"} />
          </div>
        </div>
      </div>
      <div className="group form-footer">
        <div className="footer-container">
          <button className="button prev-button" onClick={()=>{onPreviousStep(2, dispatch)}}>Previous step</button>
          <button type="submit" className="button next-button">Next step</button>
        </div>
      </div>
    </form>
  </div>
}

const FinalConfirmationForm = () => {
  const {formData, dispatch} = React.useContext(FormContext)
  
  const onSubmit = (e) => {
    e.preventDefault()
    let data = {
      name: formData.name.value,
      email: formData.email.value,
      phone: formData.phone.value,
      company: formData.company.value,
      service: formData.service.value,
      budget: formData.budget.value
    }
    alert(JSON.stringify(data))
  }

  return <div className="container">
    <FormHeader />
    <form onSubmit={onSubmit}>
      <div className="group form-group">
        <div className="form-group-container">
          <FormStepIndicator step={4} />
          <Separator />
          <div className="submit-box mt-32">
            <img src="submit.png" />
            <h1>Submit your quote request</h1>
            <p>Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote in 24 - 48 hours.</p>
            <button type="submit" className="button next-button mt-18">Submit</button>
          </div>
        </div>
      </div>
      <div className="group form-footer">
        <div className="footer-container">
          <button className="button prev-button" onClick={()=>{onPreviousStep(3, dispatch)}}>Previous step</button>
        </div>
      </div>
    </form>
  </div>
}

const initialState = {
  name: { value: '', error: '' },
  phone: { value: '', error: '' },
  email: { value: '', error: '' },
  company: { value: '', error: '' },
  service: { value: 'development' },
  budget: { value: '50000+' },
  step: 1
};

const UPDATE_FORM = "UPDATE_FORM";
const UPDATE_STEP = "UPDATE_STEP";

const formReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, error } = action.payload
      return {
        ...state,
        [name]: { ...state[name], value, error }
      }
      break;
    case UPDATE_STEP:
      return {
      ...state,
        step: action.payload.step
      }
    default:
      return state
  }
};

const isEmail = (value) => {
  return value.match(/^[\w.+\-]+@gmail\.com$/)
}

const isPhoneNumber = (value) => {
  return value.length <= 12 && value.length >= 8 && value.match(/^08[-\s\./0-9]*$/g)
}

const validateInput = (name, value) => {
  let error = ''
  value = value.trim()

  switch (name) {
    case 'name':
      if (value === '') {
        error = 'Name is required'
      }
      break;
    case 'email':
      if (value === '') {
        error = 'Email is required'
      }
      if (error === '') {
        if (!isEmail(value)) {
          error = 'Email is invalid'
        }
      }
      break;
    case 'phone':
      if (value === '') {
        error = 'Phone is required'
      }
      if (error === '') {
        if (!isPhoneNumber(value)) {
          error = 'Phone is invalid'
        }
      }
      break;
    case 'company':
      if (value === '') {
        error = 'Company is required'
      }
      break;
  }
  return error
}

const FormContext = React.createContext(null);

const FormProvider = ({children}) => {
  const [formData, dispatch] = React.useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{formData, dispatch}}>
      {children}
    </FormContext.Provider>
  )
}

const MultiForm = () => {
  const {formData} = React.useContext(FormContext)

  switch (formData.step) {
    case 1:
      return <ContactsDetailForm />
    case 2:
      return <ServicesForm />
    case 3:
      return <BudgetForm />
    case 4:
      return <FinalConfirmationForm />
  }
}

const App = () => {
  return (
    <FormProvider>
      <MultiForm />
    </FormProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));