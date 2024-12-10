const modifyJson = (list) => {
  const date = new Date();
  const atomicDate = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  const key = `${atomicDate}_${date.getTime()}`;

  return {
    [key]: list,
  };
};

export { modifyJson };
