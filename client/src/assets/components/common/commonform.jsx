import React from 'react';

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText, isButtondis }) {
  
  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] ?? ""; // Proper handling of undefined values
    let element = null;

    switch (getControlItem.componentType) {
      case "input":
  element = (
    <input
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700 bg-gray-700 text-white placeholder-gray-400"
      name={getControlItem.name}
      placeholder={getControlItem.placeholder}
      id={getControlItem.name}
      type={getControlItem.type || "text"} // Default type if not provided
      value={value}
      onChange={(event) => setFormData({ ...formData, [getControlItem.name]: event.target.value })}
    />
  );
        element = (
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700 "
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type || "text"} // Default type if not provided
            value={value}
            onChange={(event) => setFormData({ ...formData, [getControlItem.name]: event.target.value })}
          />
        );
        break;

      case "select":
        element = (
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name={getControlItem.name}
            value={value}
            onChange={(event) => setFormData({ ...formData, [getControlItem.name]: event.target.value })}
          >
            <option value="" disabled>{getControlItem.placeholder}</option>
            {getControlItem.options?.map((optionItem) => (
              <option key={optionItem.id || optionItem.value} value={optionItem.id || optionItem.value}>
                {optionItem.label}
              </option>
            ))}
          </select>
        );
        break;

      case "textarea":
        element = (
          <textarea
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) => setFormData({ ...formData, [getControlItem.name]: event.target.value })}
          />
        );
        break;

      default:
        element = (
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type || "text"}
            value={value}
            onChange={(event) => setFormData({ ...formData, [getControlItem.name]: event.target.value })}
          />
        );
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <label className="mb-1 font-medium">{controlItem.label}</label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <button
        disabled={isButtondis}
        type="submit"
        className={`mt-2 w-full text-white py-2 rounded-md transition ${
          isButtondis ? "bg-gray-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"
        }`}
      >
        {buttonText || "Submit"}
      </button>
    </form>
  );
}

export default CommonForm;