const formatPhone = (phone) => {
  if (!phone) {
    return "";
  }

  const digits = phone.replace(/\D/g, '');
  const isElevenDigits = digits.length === 11;
  const ddd = digits.slice(0, 2);
  const firstBlock = digits.slice(2, isElevenDigits ? 7 : 6);
  const secondBlock = digits.slice(isElevenDigits ? 7 : 6, isElevenDigits ? 11 : 10);

  let formattedPhone = '';

  if (ddd) {
    formattedPhone += `(${ddd}`;
  }

  if (firstBlock) {
    formattedPhone += `) ${firstBlock}`;

    if (secondBlock) {
      formattedPhone += `-${secondBlock}`;
    }
  }

  return formattedPhone;
};

export { formatPhone };
