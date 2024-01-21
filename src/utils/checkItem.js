export const checkItem = (items, id) => {
  const data = JSON.parse(JSON.stringify(items.get()));

  for (const item of data) {
    if (item.id === id) {
      return true;
    }
  }
  return false;
  //   return true;
};
