const verifyStorage = (item) => {
  const date = new Date();
  const dateString = date.toLocaleDateString("pt-BR");

  const storage = localStorage.getItem(item);

  if (storage) {
    const data = JSON.parse(storage);

    if (data?.dateString === dateString) {
      return data?.value;
    }

    return false;
  }
};

export { verifyStorage };
