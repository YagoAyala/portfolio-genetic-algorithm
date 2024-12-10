import React, { useRef } from "react";

const InputCode = ({ onChange }) => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (value.length === 1) {
      if (index < 3) {
        inputRefs[index + 1].current.focus();
      } else {
        inputRefs[index].current.blur();
      }
    }

    if (onChange) {
      const code = inputRefs.map((ref) => ref.current.value).join("");
      onChange(code, "code");
    }
  };

  return (
    <div id="input-code">
      {inputRefs.map((inputRef, index) => (
        <input
          key={index}
          ref={inputRef}
          maxLength={1}
          onChange={(e) => handleInputChange(e, index)}
          style={{ width: "2em", margin: "0.2em" }}
        />
      ))}
    </div>
  );
};

export default InputCode;
