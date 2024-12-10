const { uuid } = require("uuidv4");

const datastore = require("../datastore");
const contestsService = require("../services/contents.service");

const { neuralNetwork, geneticAlgorithm } = require("../utils/utils");

const config = require("../config/config.json");

const namespace = config.NAMESPACE;

const getBets = async (req, res) => {
  try {
    const userId = req?.query?.userId;

    if (!userId) {
      return res.status(500).send({ Error: "X", ErrorMessage: "userId not found" });
    }

    const list = await datastore.getEntitiesWithFilter(namespace, "Bet", "userId", parseInt(userId));

    res.status(200).json({ list });
  } catch (error) {
    res.status(500).send({ Error: "X", ErrorMessage: error.message });
  }
};

const saveBet = async (req, res) => {
  try {
    const bet = req?.body?.bet;
    const mode = req?.body?.mode;
    const userId = req.headers["userid"];

    if (!userId) {
      return res.status(500).send({ Error: "X", ErrorMessage: "userId not found" });
    }

    bet.mode = mode;
    bet.userId = parseInt(userId);

    await datastore.createEntity(namespace, "Bet", bet);

    res.status(200).json(bet);
  } catch (error) {
    res.status(500).send({ Error: "X", ErrorMessage: error.message });
  }
};

const startGeneticAlgorithm = async (req, res) => {
  try {
    const mode = req?.body?.mode;
    const allContests = req?.body?.allContests;
    const best = req?.body?.best?.best ? req.body.best.best : req.body.best;

    if (!best?.length || !allContests?.length) {
      return res.status(500).send({ Error: "X", ErrorMessage: "Data not found" });
    }

    const result = await geneticAlgorithm(allContests, best, mode);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ Error: "X", ErrorMessage: error.message });
  }
};

const startNeuralNetwork = async (req, res) => {
  try {
    const mode = req?.body?.mode;
    const contests = req?.body?.contests;
    const allContests = req?.body?.allContests

    if (!contests?.length || !allContests?.length) {
      return res.status(500).send({ Error: "X", ErrorMessage: "Data not found" });
    }

    const best = await neuralNetwork(contests, allContests, mode);
    res.status(200).json({ best });
  } catch (error) {
    res.status(500).send({ Error: "X", ErrorMessage: error.message });
  }
};

const getBettingHistory = async (req, res) => {
  try {
    const all = req.query?.all;
    const history = await contestsService.getAllContents(all);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).send({ Error: "X", ErrorMessage: error.message });
  }
};

const getContests = async (req, res) => {
  try {
    const contests = await contestsService.getContentsService();
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).send({ Error: "X", ErrorMessage: error.message });
  }
};

const getContest = async (req, res) => {
  try {
    const contest = req?.body?.contest;
    const contests = await contestsService.getContestService(contest);
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).send({ Error: "X", ErrorMessage: error.message });
  }
};

const getLastContest = async (req, res) => {
  try {
    const lastContests = await contestsService.getLastContestService();
    res.status(200).json({
      result: lastContests.dezenas || [],
      contest: lastContests.concurso || 0,
    });
  } catch (error) {
    res.status(500).send({ Error: "X", ErrorMessage: error.message });
  }
};

const getLastThreeContest = async (req, res) => {
  try {
    const list = await contestsService.getLastThreeContest();
    res.status(200).json({ list });
  } catch (error) {
    res.status(500).send({ Error: "X", ErrorMessage: error.message });
  }
};

const validateBet = async (req, res) => {
  try {
    const bet = req?.body?.bet;
    const allContests = req?.body?.allContests;
    const validationResult = await contestsService.validateBetService(bet, allContests);

    const json = {
      success: false,
    };

    if (validationResult?.Success) {
      const date = new Date();

      json.success = true;
      json.bet = bet;
      json.date = date;
      json.formattedDate = date.toLocaleString("pt-BR");
      json.uuid = uuid();
    }

    res.status(200).json(json);
  } catch (error) {
    res.status(500).send({ Error: "X", ErrorMessage: error.message });
  }
};

module.exports = {
  getContests,
  getLastContest,
  validateBet,
  startNeuralNetwork,
  getBettingHistory,
  startGeneticAlgorithm,
  saveBet,
  getContest,
  getBets,
  getLastThreeContest,
};
