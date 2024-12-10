// Generate

const middleware = (data) => {
  if (data?.not_authorized && data?.reload) {
    return true;
  }

  return false;
};

const ruleOfFourteen = async (worker) => {
  const response = await fetch(
    `${worker.baseUrl}/contests/get_contests`,
    {
      headers: {
        authorization: worker?.token,
        userid: worker?.userId,
      },
    },
  );

  if (response) {
    const contests = await response.json();

    if (middleware(contests)) {
      sendMessage({ reload: true });
    }

    const date = new Date();
    const dateString = date.toLocaleDateString("pt-BR");

    const data = {
      dateString,
      value: contests,
    };

    sendMessage({
      result: {
        step: "ruleOfFourteen",
        saveStorage: JSON.stringify(data),
        terminationNotice: "Jogos separados",
      },
    });

    return contests;
  }

  return [];
};

const bettingHistory = async (worker) => {
  const response = await fetch(
    `${worker.baseUrl}/contests/betting_history`,
    {
      headers: {
        authorization: worker?.token,
        userid: worker?.userId,
      },
    },
  );

  if (response) {
    const contests = await response.json();

    if (middleware(contests)) {
      sendMessage({ reload: true });
    }

    const date = new Date();
    const dateString = date.toLocaleDateString("pt-BR");

    const data = {
      dateString,
      value: contests,
    };

    sendMessage({
      result: {
        step: "bettingHistory",
        saveStorage: JSON.stringify(data),
        terminationNotice: "Treinando IA",
      },
    });

    return contests;
  }

  return [];
};

const neuralNetwork = async (worker, payload) => {
  if (payload?.best?.length) {
    sendMessage({
      result: {
        terminationNotice: "Executando algoritmo genético",
      },
    });

    return payload.best;
  }

  const body = {
    mode: payload?.mode,
    contests: payload?.contests || [],
    allContests: payload?.allContests || [],
  };

  const response = await fetch(`${worker.baseUrl}/contests/start_neural_network`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "authorization": worker?.token,
      "userid": worker?.userId,
    },
  });

  if (response) {
    const best = await response.json();

    if (middleware(best)) {
      sendMessage({ reload: true });
    }

    const date = new Date();
    const dateString = date.toLocaleDateString("pt-BR");

    const data = {
      dateString,
      value: best.best,
    };

    sendMessage({
      result: {
        step: "neuralNetwork",
        saveStorage: JSON.stringify(data),
        terminationNotice: "Executando algoritmo genético",
      },
    });

    return best;
  }

  return [];
};

const geneticAlgorithm = async (worker, payload) => {
  const body = {
    mode: payload?.mode,
    best: payload?.best || [],
    allContests: payload?.allContests || [],
  };

  const response = await fetch(`${worker.baseUrl}/contests/start_genetic_algorithm`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "authorization": worker?.token,
      "userid": worker?.userId,
    },
  });

  if (response) {
    const newBet = await response.json();

    if (middleware(newBet)) {
      sendMessage({ reload: true });
    }

    sendMessage({
      result: { terminationNotice: "Validando aposta" },
    });

    return newBet;
  }

  return [];
};

const validateBet = async (worker, payload) => {
  const body = {
    bet: payload?.bet || [],
    allContests: payload?.allContests || [],
  };

  const response = await fetch(`${worker.baseUrl}/contests/validate_bet`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "authorization": worker?.token,
      "userid": worker?.userId,
    },
  });

  if (response) {
    const bet = await response.json();

    if (middleware(bet)) {
      sendMessage({ reload: true });
    }

    const result = {
      terminationNotice: "Aposta gerada",
    };

    if (!bet?.success) {
      result.restart = true;
      result.terminationNotice = "Reavalidando aposta...";
    }

    sendMessage({ result });

    return bet;
  }

  return {};
};

const saveBet = async (worker, payload) => {
  const body = {
    mode: payload?.mode,
    bet: payload?.bet || [],
  };

  if (!body?.bet?.success) {
    return { success: false };
  }

  const response = await fetch(`${worker.baseUrl}/contests/save_bet`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "authorization": worker?.token,
      "userid": worker?.userId,
    },
  });

  if (response) {
    const bet = await response.json();

    if (middleware(bet)) {
      sendMessage({ reload: true });
    }

    sendMessage({
      result: { terminationNotice: "Aposta salva" },
    });

    return bet;
  }

  return {};
};

const steps = {
  "ruleOfFourteen": ruleOfFourteen,
  "bettingHistory": bettingHistory,
  "neuralNetwork": neuralNetwork,
  "geneticAlgorithm": geneticAlgorithm,
  "validateBet": validateBet,
  "saveBet": saveBet,
};

// Statistics

const countNumberOccurrences = (list, number) => {
  let count = 0;

  (list || [])?.forEach((result) => {
    if (result?.includes(number)) {
      count++;
    }
  });

  return count;
};

const calculateAveragePercentages = (list, mostCommonNumbers) => {
  const totalGames = list?.length;

  let evenTotal = 0;
  let oddTotal = 0;
  let primeTotal = 0;

  (list || []).forEach((result) => {
    const evenCount = result.filter((num) => num % 2 === 0).length;
    const oddCount = result.filter((num) => num % 2 !== 0).length;
    const primeCount = result.filter((num) => isPrime(num)).length;

    evenTotal += evenCount;
    oddTotal += oddCount;
    primeTotal += primeCount;
  });

  const evenPercentage = (evenTotal / (totalGames * 15)) * 100;
  const oddPercentage = (oddTotal / (totalGames * 15)) * 100;
  const primePercentage = (primeTotal / (totalGames * 15)) * 100;

  mostCommonNumbers?.sort((a, b) => b?.occurrences - a?.occurrences);
  const popularNumbers = mostCommonNumbers?.slice(0, 10);

  mostCommonNumbers?.sort((a, b) => a?.occurrences - b?.occurrences);
  const noPopularNumbers = mostCommonNumbers?.slice(0, 10);

  return { evenPercentage, oddPercentage, primePercentage, popularNumbers, noPopularNumbers };
};

const isPrime = (num) => {
  if (num <= 1) {
    return false;
  }

  if (num <= 3) {
    return true;
  }

  if (num % 2 === 0 || num % 3 === 0) {
    return false;
  }

  let i = 5;

  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }

    i += 6;
  }

  return true;
};

const averageSumNumbers = (list) => {
  const sum = (list || [])?.map((item) => {
    return item?.reduce((total, value) => total + value, 0);
  });

  const sumTotal = sum?.reduce((total, value) => total + value, 0);
  return sumTotal / sum?.length;
};

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener("message", async (res) => {
  const { data } = res;

  const worker = {
    error: undefined,
    result: undefined,
    token: data?.token,
    userId: data?.userId,
    baseUrl: "http://localhost:3001",
  };

  /* eslint-disable-next-line no-restricted-globals */
  if (self.location.hostname !== "localhost") {
    worker.baseUrl = "https://lotoai.com.br";
  }

  if (data?.statistics) {
    const allContests = data?.bettingHistory;

    const mostCommonNumbers = [...Array(25).keys()]?.map((num) => ({
      number: num + 1,
      occurrences: countNumberOccurrences(allContests, num + 1),
    }));

    const {
      evenPercentage,
      oddPercentage,
      primePercentage,
      popularNumbers,
      noPopularNumbers,
    } = calculateAveragePercentages(allContests, mostCommonNumbers);

    const avgSum = averageSumNumbers(allContests);

    sendMessage({
      error: worker.error,
      result: {
        avgSum,
        oddPercentage,
        popularNumbers,
        evenPercentage,
        primePercentage,
        noPopularNumbers,
      },
    });
  }

  if (data?.start) {
    try {
      const mode = data?.mode;

      let contests = data?.ruleOfFourteen;
      let allContests = data?.bettingHistory;
      let best = data?.neuralNetwork;

      if (!contests?.length) {
        contests = await steps.ruleOfFourteen(worker);
      }

      if (!allContests?.length) {
        allContests = await steps.bettingHistory(worker);
      }

      // if (!best?.length) {
      best = await steps.neuralNetwork(worker, { contests, allContests, mode, best });
      // }

      const bet = await steps.geneticAlgorithm(worker, { allContests, best, mode });
      const validate = await steps.validateBet(worker, { allContests, bet });
      const save = await steps.saveBet(worker, { bet: validate, mode });

      if (save?.success) {
        worker.result = save;
      } else {
        worker.error = true;
      }
    } catch (error) {
      worker.error = error;
    } finally {
      sendMessage({
        error: worker.error,
        result: worker.result,
      });
    }
  }
});

const sendMessage = (obj) => {
  /* eslint-disable-next-line no-restricted-globals */
  self.postMessage(obj);
};
