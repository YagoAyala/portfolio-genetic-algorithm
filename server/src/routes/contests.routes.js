const express = require("express");
const router = express.Router();
const contentsController = require("../controllers/contents.controller");

router.get("/get_contests", contentsController.getContests);
router.post("/get_contests", contentsController.getContests);
router.get("/betting_history", contentsController.getBettingHistory);
router.post("/start_neural_network", contentsController.startNeuralNetwork);
router.post("/start_genetic_algorithm", contentsController.startGeneticAlgorithm);
router.get("/get_last_contest", contentsController.getLastContest);
router.post("/validate_bet", contentsController.validateBet);
router.post("/save_bet", contentsController.saveBet);
router.get("/get_bets", contentsController.getBets);
router.post("/get_contest", contentsController.getContest);
router.get("/get_last_three_contest", contentsController.getLastThreeContest);

module.exports = router;
