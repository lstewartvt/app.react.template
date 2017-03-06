const props = includes('properties'); // application constant values

module.exports = {
  get_error_message: (message) => {
    return message || props.messages.error.default;
  }
};
