/* eslint-disable react/prop-types */
const Input = ({value,  inputName , errors , onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.name , event.target.value)
  }

  const handleErrors = () => {

    if (inputName == 'city') {
       return errors['address,city']
    } else if (inputName == 'street') {
      return errors['address,street']
    }else if (inputName == 'company') {
      return errors['company,name']
    } else {
      return errors[inputName]
    }
    
  }

  return (
    <div className="mb-3">
      <label htmlFor="forname" className="form-label">
        {inputName.charAt(0).toUpperCase() + inputName.slice(1)}
      </label>
      <input
        name={inputName}
        value={value || ''}
        onChange={handleChange}
        type="text"
        className="form-control"
        id={`for${inputName}`}
        aria-describedby="titleHelp"
      />
      <div id="titleHelp" className="form-text text-danger fw-bold">
        {handleErrors()}
      </div>
    </div>
  );
};

export default Input;
