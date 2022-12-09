export var formatInformation = function formatInformation(str, head, tail) {
  var reg = new RegExp("^([\\w\\W]{".concat(head, "})[\\w\\W]*([\\w\\W]{").concat(tail, "})$"));
  return str.replace(reg, "$1****$2");
};