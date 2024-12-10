// const fs = require("fs");
const brain = require("brain.js");

const NO_POPULAR_LIST = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
  [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
  [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
  [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
  [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 18],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 19],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 20],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 21],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 22],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 23],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 24],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 25],
  [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  [1, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  [2, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  [3, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  [4, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  [5, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  [6, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  [7, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  [8, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  [9, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  [10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
];

const POPULAR_LIST = [
  [1, 10, 11, 13, 14, 16, 18, 20, 21, 22, 23, 24, 25, 7, 8],
  [1, 2, 4, 6, 7, 10, 11, 13, 15, 16, 20, 22, 23, 24, 25],
  [1, 2, 4, 7, 9, 10, 11, 13, 14, 16, 18, 20, 23, 24, 25],
  [1, 4, 6, 7, 10, 11, 13, 14, 16, 20, 21, 22, 23, 24, 25],
  [1, 2, 3, 5, 6, 7, 10, 13, 16, 18, 20, 22, 23, 24, 25],
  [1, 2, 4, 6, 7, 10, 11, 13, 14, 16, 20, 21, 22, 24, 25],
  [1, 2, 7, 10, 11, 13, 14, 15, 16, 18, 20, 22, 23, 24, 25],
  [1, 3, 5, 7, 10, 11, 13, 16, 18, 20, 21, 22, 23, 24, 25],
  [1, 2, 3, 5, 7, 10, 11, 13, 14, 16, 20, 21, 23, 24, 25],
  [1, 2, 4, 5, 6, 7, 10, 11, 13, 15, 16, 20, 22, 23, 24],
];

const configNormal = {
  activation: "sigmoid",
  hiddenLayers: [16, 8, 4],
};

const configAdvanced = {
  activation: "sigmoid",
  hiddenLayers: [64, 32, 16],
};

const initial = async (allContests, mode) => {
  const history = allContests || [];

  let iterations = 50;
  let config = {...configNormal};

  if (mode === "ADVANCED") {
    iterations = 2500;
    config = {...configAdvanced};
  }

  const net = new brain.NeuralNetwork(config);

  const trainingData = history.map((bet) => ({
    input: bet.map((number) => number / 25),
    output: [1],
  }));

  const popular = POPULAR_LIST.map((bet) => ({
    input: bet.map((number) => number / 25),
    output: [0.5],
  }));

  const noPopular = NO_POPULAR_LIST.map((bet) => ({
    input: bet.map((number) => number / 25),
    output: [0],
  }));

  net.train([
    ...trainingData,
    ...popular,
    ...noPopular,
  ], {
    errorThresh: 0.01,
    // log: true,
    iterations,
  });

  // try {
  //   const modelJSON = net.toJSON();
  //   fs.writeFileSync("./model.json", JSON.stringify(modelJSON));

  //   let savedModelJSON;

  //   savedModelJSON = fs.readFileSync("./model.json", "utf-8");
  // } catch (error) {
  //   console.log("error: ", error);
  // }

  // const loadedModel = new brain.NeuralNetwork(config).fromJSON(JSON.parse(savedModelJSON));

  return net;
};

const generateBet = async (contests, allContests, mode) => {
  const model = await initial(allContests, mode);

  const result = [];
  const population = contests.map((inner) => inner.map((number) => number / 25));

  for (const item of population) {
    const prediction = model.run(item);

    // if (prediction[0] >= 0.9) {
    result.push({ bet: item, output: prediction[0] });
    // }
  }

  const best = result.sort((a, b) => b.output - a.output);
  return best?.[0]?.bet?.map((number) => Math.round(number * 25)) || [];
};

const start = async (contests, allContests, mode) => {
  try {
    const result = await generateBet(contests, allContests, mode);
    return result;
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = start;
