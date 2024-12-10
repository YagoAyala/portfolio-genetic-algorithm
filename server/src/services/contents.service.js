const axios = require("axios");
const _ = require("lodash");

const { checkIfIsPrime, isFibonacci, sumArrayNumbers } = require("../utils/utils");

const api = "https://loteriascaixa-api.herokuapp.com/api/lotofacil";

const templateUrlLotoFacil = `${api}/`;
const endpointLastContestUrl = `${api}/latest`;
const lotofacilTemplate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const lotofacilStructure = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];
const lotoFacilLineLength = 5;
const lotoFacilColumnLength = 5;

const getContestService = (contest) => {
  const url = templateUrlLotoFacil + contest;
  return axios.get(url).then((response) => response.data);
};

const getLastContestService = () => {
  return axios.get(endpointLastContestUrl).then((response) => response.data);
};

const makeNumber = () => {
  return Math.floor(Math.random() * (25 - 1 + 1)) + 1;
};

const createElevenContest = (numbers) => {
  const remainingNumbers = lotofacilTemplate.filter(
    (templateNumber) =>
      !numbers.some((selectedNumber) => selectedNumber === templateNumber)
  );

  const listOfLists = remainingNumbers.map((number) => {
    return [...numbers, number].sort((a, b) => a - b);
  });

  return [...listOfLists];
};

const getFiveRandomNumbers = async (nineNumberMostUsed) => {
  const quantity = 5;
  const rightNumbers = [];
  const lastContest = await getLastContestService().then(
    (res) => res?.dezenas || []
  );

  let count = 0;

  for (let i = 0; i < quantity; i++) {
    let approve = true;
    count++;

    const randomNumber = makeNumber();

    if (nineNumberMostUsed.some((number) => number === randomNumber)) {
      approve = false;
    }

    if (count < 10 ) {
      if (lastContest.some((number) => number == randomNumber)) {
        approve = false;
      }
    }

    if (rightNumbers.some((number) => number === randomNumber)) {
      approve = false;
    }

    if (approve) {
      rightNumbers.push(randomNumber);
      continue;
    }

    i--;
  }

  return createElevenContest([...rightNumbers, ...nineNumberMostUsed]);
};

const getTheNineMostUsedNumbers = (contests) => {
  if (!Array.isArray(contests)) {
    throw new Error("Input is not an array.");
  }

  const contestNumbersArray = contests
    .flat()
    .map((contestNumber) => parseInt(contestNumber));

  const counts = {};
  const maxNumber = 25;

  for (let i = 1; i <= maxNumber; i++) {
    counts[`number${i}`] = contestNumbersArray.filter(
      (contestNumber) => contestNumber === i
    ).length;
  }

  const arrayOfLength = Object.entries(counts)
    .map(([key, value]) => ({
      Key: parseInt(key.replace("number", "")),
      Value: value,
    }))
    .sort((a, b) => a.Value - b.Value);

  const nineNumberMostUsed = arrayOfLength.slice(-9).map((data) => data.Key);
  return getFiveRandomNumbers(nineNumberMostUsed);
};

const getTheLastHundredContest = async (latestContest) => {
  const quantity = 10;
  const promises = [];

  for (let i = quantity; i > 0; i--) {
    const contest = axios
      .get(`${templateUrlLotoFacil}${latestContest.concurso - i}`)
      .then((res) => res.data.dezenas);
    promises.push(contest);
  }

  const resolvedPromises = await Promise.all(promises);
  return getTheNineMostUsedNumbers(resolvedPromises);
};

const getLatestLotofacilContest = async () => {
  const latestContest = await getLastContestService();
  return getTheLastHundredContest(latestContest);
};

const getContentsService = async () => {
  const contests = await getLatestLotofacilContest();
  return contests;
};

const checkIfHasTheMostRepeatedNumbers = async (myGame) => {
  const latestContest = await getLastContestService().then((res) =>
    res.dezenas.map((responseNumber) => parseInt(responseNumber))
  );
  const equalsNumbers = myGame.filter((myNumber) =>
    latestContest.includes(myNumber)
  ).length;

  if (equalsNumbers > 11) {
    return {
      Error: "X",
      Message: "Your game has more than 11 equals numbers with the last game",
    };
  }
  if (equalsNumbers < 7) {
    return {
      Error: "X",
      Message: "Your game has less than 7 equals numbers with the last game",
    };
  }
  // ADICIONAR MAIS VERIFICAÇÃO
  // FAZER UMA API COM A PARTE EM PYTHON
  return { Success: "X" };
};

const checkGameDozens = (myGame) => {
  const dozenRanges = [
    { min: -Infinity, max: 3 },
    { min: -Infinity, max: 5 },
    { min: -Infinity, max: 7 },
    { min: -Infinity, max: 9 },
    { min: -Infinity, max: 11 },
    { min: 7, max: 13 },
    { min: 8, max: 15 },
    { min: 10, max: 16 },
    { min: 11, max: 18 },
    { min: 13, max: 19 },
    { min: 15, max: 21 },
    { min: 17, max: 22 },
    { min: 19, max: 23 },
    { min: 21, max: Infinity },
    { min: 23, max: Infinity },
  ];

  for (let i = 0; i < myGame.length; i++) {
    const dozenValue = myGame[i];
    const range = dozenRanges[i];

    if (dozenValue > range.max) {
      return {
        Error: "X",
        Message: `The ${i + 1} dozen is higher than ${range.max}`,
      };
    }

    if (dozenValue < range.min) {
      return {
        Error: "X",
        Message: `The ${i + 1} dozen is lower than ${range.min}`,
      };
    }
  }
  return checkIfHasTheMostRepeatedNumbers(myGame);
};

const checkGameColumns = (myGame) => {
  for (let i = 0; i < lotoFacilColumnLength; i++) {
    let emptyColumn = 0;
    for (let j = 0; j < lotoFacilLineLength; j++) {
      if (!myGame.includes(lotofacilStructure[j][i])) {
        emptyColumn++;
      }
      if (emptyColumn === lotoFacilColumnLength) {
        return { Error: "X", Message: "Your game has a column line blank" };
      }
    }
  }
  return checkGameDozens(myGame);
};

const checkGameLines = (myGame) => {
  for (let i = 0; i < lotoFacilColumnLength; i++) {
    let emptyLinePerColumn = 0;
    for (let j = 0; j < lotoFacilLineLength; j++) {
      if (!myGame.includes(lotofacilStructure[i][j])) {
        emptyLinePerColumn++;
      }
      if (emptyLinePerColumn === lotoFacilColumnLength) {
        return { Error: "X", Message: "Your game has a entire line blank" };
      }
    }
  }
  return checkGameColumns(myGame);
};

const checkTheSumOfNumbers = (myGame) => {
  const sumOfTheNumbers = sumArrayNumbers(myGame);
  if (sumOfTheNumbers < 164) {
    return { Error: "X", Message: "Your game sum is lower than 164!" };
  }

  if (sumOfTheNumbers > 227) {
    return { Error: "X", Message: "Your game sum is higher than 227" };
  }
  return checkGameLines(myGame);
};

const checkIfGameHasFibonacciNumber = (myGame) => {
  const fibonacciNumberOnGame = myGame.filter((numberGame) =>
    isFibonacci(numberGame)
  );

  if (fibonacciNumberOnGame < 3) {
    return {
      Error: "X",
      Message: "Your game has less than 3 fibonacci numbers!",
    };
  }

  if (fibonacciNumberOnGame > 5) {
    return {
      Error: "X",
      Message: "Your game has more than 5 fibonacci numbers!",
    };
  }
  return checkTheSumOfNumbers(myGame);
};

const checkIfGameHasPrimeNumber = (myGame) => {
  const primeNumberOnGame = myGame.filter((numberGame) =>
    checkIfIsPrime(numberGame)
  );
  if (primeNumberOnGame < 4) {
    return { Error: "X", Message: "Your game has less than 4 prime numbers!" };
  }

  if (primeNumberOnGame > 7) {
    return { Error: "X", Message: "Your game has more than 7 prime numbers!" };
  }
  return checkIfGameHasFibonacciNumber(myGame);
};

const checkIfGameHasMultiplesOfEight = (myGame) => {
  const multipleOfEightOnGame = myGame.filter(
    (numberGame) => numberGame % 8 === 0
  ).length;
  if (multipleOfEightOnGame < 1) {
    return {
      Error: "X",
      Message: "Your game has less than 1 numbers multiple of eight!",
    };
  }
  return checkIfGameHasPrimeNumber(myGame);
};

const checkIfGameHasMultiplesOfSeven = (myGame) => {
  const multipleOfSevenOnGame = myGame.filter(
    (numberGame) => numberGame % 7 === 0
  ).length;
  if (multipleOfSevenOnGame < 1) {
    return {
      Error: "X",
      Message: "Your game has less than 1 numbers multiple of seven!",
    };
  }
  return checkIfGameHasMultiplesOfEight(myGame);
};

const checkIfGameHasMultiplesOfSix = (myGame) => {
  const multipleOfSixOnGame = myGame.filter(
    (numberGame) => numberGame % 6 === 0
  ).length;
  if (multipleOfSixOnGame < 1) {
    return {
      Error: "X",
      Message: "Your game has less than 1 numbers multiple of six!",
    };
  }
  return checkIfGameHasMultiplesOfSeven(myGame);
};

const checkIfGameHasMultiplesOfFive = (myGame) => {
  const multipleOfFiveOnGame = myGame.filter(
    (numberGame) => numberGame % 5 === 0
  ).length;
  if (multipleOfFiveOnGame < 1) {
    return {
      Error: "X",
      Message: "Your game has less than 1 numbers multiple of five!",
    };
  }
  return checkIfGameHasMultiplesOfSix(myGame);
};

const checkIfGameHasMultiplesOfFour = (myGame) => {
  const multipleOfFourOnGame = myGame.filter(
    (numberGame) => numberGame % 4 === 0
  ).length;
  if (multipleOfFourOnGame < 2) {
    return {
      Error: "X",
      Message: "Your game has less than 2 numbers multiple of four!",
    };
  }
  if (multipleOfFourOnGame > 5) {
    return {
      Error: "X",
      Message: "Your game has more than 5 numbers multiple of four!",
    };
  }
  return checkIfGameHasMultiplesOfFive(myGame);
};

const checkIfGameHasMultiplesOfThree = (myGame) => {
  const multipleOfThreeOnGame = myGame.filter(
    (numberGame) => numberGame % 3 === 0
  ).length;
  if (multipleOfThreeOnGame < 3) {
    return {
      Error: "X",
      Message: "Your game has less than 3 numbers multiple of three!",
    };
  }
  if (multipleOfThreeOnGame > 7) {
    return {
      Error: "X",
      Message: "Your game has more than 7 numbers multiple of three!",
    };
  }
  return checkIfGameHasMultiplesOfFour(myGame);
};

const checkIfGameHasTheNecessaryEvenNumbers = (myGame) => {
  const evenNumbersOnGame = myGame.filter(
    (numberGame) => numberGame % 2 === 0
  ).length;

  if (evenNumbersOnGame < 5) {
    return { Error: "X", Message: "Your game has less than 5 even numbers!" };
  }
  if (evenNumbersOnGame > 9) {
    return { Error: "X", Message: "Your game has more than 9 even numbers!" };
  }
  return checkIfGameHasMultiplesOfThree(myGame);
};

const checkIfYourGameHasAlredyBeenSelected = async (bet = [], allContests = []) => {
  let allGames = allContests;

  if (!allGames || !allGames?.length) {
    allGames = await axios.get(api).then((res) =>
      (res.data || []).map((game) => game.dezenas.sort((a, b) => a - b))
    );
  }

  const gameEqualMine = allGames.filter((game) => _.isEqual(game, bet));

  if (gameEqualMine.length) {
    return { Error: "X", Message: "Your game already been selected before!" };
  }

  return checkIfGameHasTheNecessaryEvenNumbers(bet);
};

const validateBetService = async (bet, allContests) => {
  return await checkIfYourGameHasAlredyBeenSelected(bet, allContests);
};

const getAllContents = async (all) => {
  const { data } = await axios.get(api);

  if (all) {
    return data;
  }

  const list = (data || []).map((obj) => {
    return obj.dezenas.map((number) => parseInt(number));
  });

  return list;
};

const getLastThreeContest = async () => {
  const last = await getLastContestService();
  const last2 = await axios.get(`${api}/${last?.concurso - 1}`).then((response) => response.data);
  const last3 = await axios.get(`${api}/${last?.concurso - 2}`).then((response) => response.data);

  const list = [];

  list.push(last);
  list.push(last2);
  list.push(last3);

  const format = (list || []).map((item) => {
    return {
      date: item?.data,
      bet: item?.dezenas,
      contest: item?.concurso,
    };
  });

  return format;
};

module.exports = {
  getContentsService,
  getLastContestService,
  validateBetService,
  getAllContents,
  getContestService,
  getLastThreeContest,
};
