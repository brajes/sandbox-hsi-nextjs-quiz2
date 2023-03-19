const Separator = props => {
  return <div className="form-separator mt-1">
    <div className="horizontal-separator"></div>
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
  return <div className="flex-ctr">
      <FormNumberStepIndicator currentStep={ props.step } step={ 1 } />
      <FormLineStepIndicator currentStep={ props.step } step={ 1 } />
      <FormNumberStepIndicator currentStep={ props.step } step={ 2 } />
      <FormLineStepIndicator currentStep={ props.step } step={ 2 } />
      <FormNumberStepIndicator currentStep={ props.step } step={ 3 } />
      <FormLineStepIndicator currentStep={ props.step } step={ 3 } />
      <FormNumberStepIndicator currentStep={ props.step } step={ 4 } />
      <FormLineStepIndicator currentStep={ props.step } step={ 4 } />
    </div>
}

const FormTitle = (props) => {
  return <div>
    <h1>{props.title}</h1>
    <p>{props.desc}</p>
  </div>
}

const ContactTextInput = (props) => {
  const { fieldId, fieldLabel, fieldValue, fieldError, onChange, img, placeholder } = props
  
  return <div className={`form-inputs ${fieldError ? 'inputs-errors' : '' }`}>
    <label htmlFor={fieldId}>{fieldLabel}</label>
    <div className="input-container">
      <img src={img} />
      <input name={fieldId} value={fieldValue} className="form-input text-input" placeholder={placeholder} onChange={onChange} />
    </div>
    <span className="error-label">{fieldError}</span>
  </div>
}

function ContactsDetailForm({ name: defaultName, email: defaultEmail, phone: defaultPhone, company: defaultCompany, onNext, onChange }) {
  const [name, setName] = React.useState(defaultName)
  const [phone, setPhone] = React.useState(defaultPhone)
  const [email, setEmail] = React.useState(defaultEmail)
  const [company, setCompany] = React.useState(defaultCompany)
  const [nameError, setNameError] = React.useState(null)
  const [emailError, setEmailError] = React.useState(null)
  const [phoneError, setPhoneError] = React.useState(null)
  const [companyError, setCompanyError] = React.useState(null)

  const isBlank = (value) => {
    return value === undefined || value === null || value.length < 1
  }

  const onFieldChange = (event) => {
    const id = event.target.name
    const value = event.target.value
    
    if (id == 'name') {
      setName(value)
      validateName(value)
      onChange(id, value)
    } else if (id == 'email') {
      setEmail(value)
      validateEmail(value)
      onChange(id, value)
    } else if (id == 'phone') {
      setPhone(value)
      validatePhone(value)
      onChange(id, value)
    } else if (id == 'company') {
      setCompany(value)
      validateCompany(value)
      onChange(id, value)
    }
  }

  const validateName = (value) => {
    if (isBlank(value)) {
      setNameError('Name is required')
    } else {
      setNameError(null)
      return true
    }
    return false
  }

  const isEmail = (value) => {
    return value.match(/^[\w.+\-]+@gmail\.com$/)
  }

  const validateEmail = (value) => {
    if (isBlank(value)) {
      setEmailError('Email is required')
    } else if (!isEmail(value)) {
      setEmailError('Email is invalid')
    } else {
      setEmailError(null)
      return true
    }

    return false
  }

  const isPhoneNumber = (value) => {
    return value.length <= 12 && value.length >= 8 && value.match(/^08[-\s\./0-9]*$/g)
  }

  const validatePhone = (value) => {
    if (isBlank(value)) {
      setPhoneError('Phone number is required')
    } else if (!isPhoneNumber(value)){
      setPhoneError('Phone number is invalid')
    } else {
      setPhoneError(null)

      return true
    }

    return false
  }

  const validateCompany = (value) => {
    if (isBlank(value)) {
      setCompanyError('Company is required')
    } else {
      setCompanyError(null)
      return true
    }

    return false
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    const nameValidated = validateName(name)
    const emailValidated = validateEmail(email)
    const phoneValidated = validatePhone(phone)
    const companyValidated = validateCompany(company)

    if (nameValidated, emailValidated, phoneValidated, companyValidated) {
      onNext('contact', { name: name })
    }
  }

  return <div className="container">
    <FormHeader />
    <form onSubmit={onFormSubmit}>
      <div className="group form-group">
        <div className="form-group-container">
          <FormStepIndicator step={1} />
          <Separator />
          <FormTitle title="Contacts Detail" desc="Lorem ipsum dolor sit amet consectetur adipisc." />
          <div className="inputs-container mt-32">
            <ContactTextInput fieldId="name" fieldLabel="Name" img="user.png" fieldValue={name} placeholder="Name" fieldError={nameError} onChange={onFieldChange}/>
            <ContactTextInput fieldId="email" fieldLabel="Email" img="email.png" fieldValue={email} placeholder="Email" fieldError={emailError} onChange={onFieldChange}/>
            <ContactTextInput fieldId="phone" fieldLabel="Phone" img="phone.png" fieldValue={phone} placeholder="Phone" fieldError={phoneError} onChange={onFieldChange}/>
            <ContactTextInput fieldId="company" fieldLabel="Company" img="company.png" fieldValue={company} placeholder="Company" fieldError={companyError} onChange={onFieldChange}/>
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

const InputCheckbox = props => {
  const { fieldId, fieldName, fieldValue, fieldLabel, isChecked, onChange } = props

  return <div className="form-inputs">
    <div className="input-container">
      <label htmlFor={fieldId}>{fieldLabel}</label>
      <input type="radio" id={fieldId} name={fieldName} defaultChecked={isChecked} className={`form-input checkbox-input cb-input-${fieldId}`} value={fieldValue} onChange={onChange} />
    </div>
  </div>
}

const ServicesForm = ({ service, onNext, onPrev, onChange:defaultOnChange }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    onNext('service', service)
  }

  const isChecked = (value) => {
    return service == value
  }

  const onChange = (e) => {
    service = e.target.value.trim()
    defaultOnChange('service', service)
  }

  return <div className="container">
    <FormHeader />
    <form onSubmit={onSubmit}>
      <div className="group form-group">
        <div className="form-group-container">
          <FormStepIndicator step={2} />
          <Separator />
          <FormTitle title="Our services" desc="Please select which service you are interested in." />
          <div className="inputs-container mt-32 checkbox-input-container" onChange={onChange}>
            <InputCheckbox fieldId="development" fieldName="service" fieldLabel="Development" fieldValue="development" isChecked={isChecked('development')} />
            <InputCheckbox fieldId="webdesign" fieldName="service" fieldLabel="Web Design" fieldValue="web-design" isChecked={isChecked('web-design')} />
            <InputCheckbox fieldId="marketing" fieldName="service" fieldLabel="Marketing" fieldValue="marketing" isChecked={isChecked('marketing')} />
            <InputCheckbox fieldId="other" fieldName="service" fieldLabel="Other" fieldValue="other" isChecked={isChecked('other')} />
          </div>
        </div>
      </div>
      <div className="group form-footer">
        <div className="footer-container">
          <button className="button prev-button" onClick={onPrev}>Previous step</button>
          <button type="submit" className="button next-button">Next step</button>
        </div>
      </div>
    </form>
  </div>
}

const RadioInput = props => {
  const { fieldId, fieldName, fieldValue, fieldLabel, isChecked, onChange } = props

  return <div className="form-inputs">
    <div className="input-container rd-input">
      <input type="radio" id={fieldId} name={fieldName} defaultChecked={isChecked} className="form-input radio-input" value={fieldValue} onChange={onChange} />
      <label htmlFor={fieldId}>{fieldLabel}</label>
    </div>
  </div>
}

const BudgetForm = ({budget, onChange: defaultOnChange, onNext, onPrev}) => {
  const isChecked = (value) => {
    return value == budget
  }

  const onChange = (e) => {
    budget = e.target.value.trim()
    defaultOnChange('budget', budget)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onNext('budget', budget)
  }

  return <div className="container">
    <FormHeader />
    <form onSubmit={onSubmit}>
      <div className="group form-group">
        <div className="form-group-container">
          <FormStepIndicator step={3} />
          <Separator />
          <FormTitle title="What's your project budget?" desc="Please select the project budget range you have in mind." />
          <div className="inputs-container mt-32 checkbox-input-container" onChange={onChange}>
            <RadioInput fieldId="b5000_100000" fieldName="budget" fieldLabel="$5000 - $10.000" isChecked={isChecked("5000-10000")} fieldValue="5000-10000" />
            <RadioInput fieldId="b10000_200000" fieldName="budget" fieldLabel="$10.000 - $20.000" isChecked={isChecked("10000-20000")} fieldValue={"10000-20000"} />
            <RadioInput fieldId="b20000_500000" fieldName="budget" fieldLabel={"$20.000 - $50.000"} isChecked={isChecked("20000-50000")} fieldValue={"20000-50000"} />
            <RadioInput fieldId="b50000p" fieldName="budget" fieldLabel={"$50.000 +"} isChecked={isChecked("50000+")} fieldValue={"50000+"} />
          </div>
        </div>
      </div>
      <div className="group form-footer">
        <div className="footer-container">
          <button className="button prev-button" onClick={onPrev}>Previous step</button>
          <button type="submit" className="button next-button">Next step</button>
        </div>
      </div>
    </form>
  </div>
}

const FinalConfirmationForm = props => {
  const { onSubmit, onPrev } = props

  const onFormSubmitted = (e) => {
    e.preventDefault()
    onSubmit({})
  }

  return <div className="container">
    <FormHeader />
    <form onSubmit={onFormSubmitted}>
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
          <button className="button prev-button" onClick={onPrev}>Previous step</button>
        </div>
      </div>
    </form>
  </div>
}

const FormHeader = () => {
  return <div className="multiform-header">
      <h1>Get a project quote</h1>
      <p>Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.</p>
    </div>
}

const MultiForm = () => {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [service, setService] = React.useState("development")
  const [budget, setBudget] = React.useState("50000+")

  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [company, setCompany] = React.useState('')

  const onPrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const onNext = (id, value) => {
    setCurrentStep(currentStep + 1)
  }

  const onChange = (id, value) => {
    if (id == 'budget') {
      setBudget(value)
    } else if (id == 'service') {
      setService(value)
    } else if (id == 'contact') {
      setName(value.name)
      setPhone(value.phone)
      setEmail(value.email)
      setCompany(value.company)
    } else if (id == 'name') {
      setName(value)
    } else if (id == 'phone') {
      setPhone(value)
    } else if (id == 'email') {
      setEmail(value)
    } else if (id == 'company') {
      setCompany(value)
    }
  }

  const onSubmit = () => {
    alert(JSON.stringify({name, email, phone, company, service, budget}))
  }

  switch (currentStep) {
    case 1:
      return <ContactsDetailForm name={name} email={email} phone={phone} company={company} onChange={onChange} onNext={onNext}/>
    case 2:
      return <ServicesForm service={service} onNext={onNext} onPrev={onPrev} onChange={onChange}/>
    case 3:
      return <BudgetForm budget={budget} onNext={onNext} onPrev={onPrev} onChange={onChange}/>
    case 4:
      return <FinalConfirmationForm onSubmit={onSubmit} onPrev={onPrev}/>
  }
}

const App = () => {
  return <MultiForm />
}

ReactDOM.render(<App />, document.getElementById('root'));