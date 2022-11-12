export const formatInformation = (str: string, head: number, tail: number) => {
  const reg = new RegExp(`^([\\w\\W]{${head}})[\\w\\W]*([\\w\\W]{${tail}})$`);
  return str.replace(reg, "$1****$2");
};
