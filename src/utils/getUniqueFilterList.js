export const uniqueFilterList = (data) => {
  const filterSet = new Set();

  data.length > 0 && data.forEach((i) => filterSet.add(i.category));
  const optionList = [...filterSet];
  return optionList;
};
