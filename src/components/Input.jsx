/* eslint-disable react/prop-types */
const Input = ({ user, inputName , Change }) => {

  const handleChange = (event) => {
    Change(event.target.name , event.target.value)
  }

  return (
    <div className="mb-3">
      <label htmlFor="forname" className="form-label">
        {inputName.charAt(0).toUpperCase() + inputName.slice(1)}
      </label>
      <input
        name={inputName}
        value={user.inputName}
        onChange={handleChange}
        type="text"
        className="form-control"
        id={`for${name}`}
        aria-describedby="titleHelp"
      />
      <div id="titleHelp" className="form-text text-danger fw-bold">
        {/* {user.errors.title} */}
      </div>
    </div>
  );
};

export default Input;
