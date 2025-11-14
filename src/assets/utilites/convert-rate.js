const convertRate = (data) => {
  console.log(data);
  if (data == "1") return "G";
  else if (data == "2") return "PG";
  else if (data == "3") return "PG-13";
  else if (data == "4") return "R";
  else if (data == "5") return "NC-17";
};
export default convertRate;
