const errorMessages = {
  required: "This field is required",
  minLength: function (name) {
    return `The ${name} is too short`;
  },
  incorrect: function (name) {
    return `The ${name} format is incorrect`;
  }

};

export default errorMessages;