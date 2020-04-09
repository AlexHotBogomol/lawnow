const errorMessages = {
  required: "Dies ist ein Pflichtfeld",
  minLength: function (name) {
    return `Das ${name} ist zu kurz`;
  },
  incorrect: function (name) {
    return `Das Format ${name} ist falsch`;
  },
  specialChars: function () {
    return "Das Feld darf keine Sonderzeichen oder Zahlen enthalten";
  }

};

export default errorMessages;