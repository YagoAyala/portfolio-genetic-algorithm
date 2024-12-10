import { beGet } from "../api/api";

const parseNumbers = (data) => {
  const result = [];

  (data || []).forEach((number) => {
    if (number) {
      result.push(parseInt(number));
    }
  });

  return result.sort((a, b) => a - b);
};

const getLastContest = async () => {
  try {
    const current = new Date();
    const lastContest = JSON.parse(localStorage.getItem("lastContest"));

    if (lastContest) {
      const date = new Date(lastContest.date);

      if (
        current.getDate() === date.getDate() &&
        current.getMonth() === date.getMonth() &&
        current.getFullYear() === date.getFullYear()
      ) {
        return lastContest;
      }
    }

    const res = await beGet("/contests/get_last_contest");
    const result = parseNumbers(res?.data?.result);

    const obj = {
      date: current,
      result,
      contest: res?.data?.contest || 0,
    };

    localStorage.setItem("lastContest", JSON.stringify(obj));
    return obj;
  } catch (e) {
    return {};
  }
};

export { getLastContest };
