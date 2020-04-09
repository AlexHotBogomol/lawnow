const clearNumericMaskInput = (value) => {
  return value.replace(/[^0-9]/g, "");
};

const customValidations = {
  isIncorrectTel:  value => {
    if(!value) return;
    const clearedTel = clearNumericMaskInput(value);
    return clearedTel.length < 12 ? "Incorrect telephone format" : undefined;
  },
  isIncorrectPLZ: value => {
    if(!value) return;
    const clearedPLZ = clearNumericMaskInput(value);
    return clearedPLZ.length < 5 ? "Incorrect PLZ" : undefined;
  }
};

export default customValidations;