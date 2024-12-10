const random = (bet) => {
  const list = [];

  if (!bet) {
    return [];
  }

  if (bet && typeof bet === "string") {
    bet = parseInt(bet);
  }

  for (let x = 0; x < bet; x++) {
    const _list = [];

    while (_list.length !== 15) {
      const number = makeNumber();
  
      if (!_list.includes(number)) {
        _list.push(number);
      }
    }

    list.push(_list.sort((a, b) => a - b));
  }

  return list;
};

const makeNumber = () => {
  return Math.floor(Math.random() * (25 - 1 + 1)) + 1;
};

export { random };
