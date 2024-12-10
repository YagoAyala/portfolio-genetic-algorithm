const RANGE_MIN = 1;
const RANGE_MAX = 25;
const LIST_LENGTH = 15;
const GENERATIONS = 1000;
const TOURNAMENT_SIZE = 5;
const POPULATION_SIZE = 100;
const POPULAR_NUMBERS = [20, 10, 25, 11, 14, 3, 5, 13, 24, 4];
const NO_POPULAR_NUMBERS = [8, 16, 6, 7, 23, 21];
const PRIME_NUMBERS = [2, 3, 5, 7, 11, 13, 17, 19, 23];

const makeNumber = () => {
  return PRIME_NUMBERS[Math.floor(Math.random() * PRIME_NUMBERS.length)];
};

const isPrime = (number) => {
  if (number <= 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};

const findSequence = (lista) => {
  const sequences = [];
  let current = [lista[0]];

  for (let i = 1; i < lista.length; i++) {
    if (lista[i] === lista[i - 1] + 1) {
      current.push(lista[i]);
    } else {
      if (current.length >= 2) {
        sequences.push(current);
      }
      current = [lista[i]];
    }
  }

  if (current.length >= 2) {
    sequences.push(current);
  }

  return sequences;
};

// CALCULAR APTIDÃO
const calculateFitness = (list, targetList) => {
  let odd = 0;
  let pair = 0;
  let fitness = 0;
  let totalPrimeNumbers = 0;

  for (let i = 0; i < LIST_LENGTH; i++) {
    if (targetList.length) {
      fitness -= Math.abs(list[i] - targetList[i]);

      if (targetList.includes(list[i])) {
        fitness += 2000;
      }
    } else {
      fitness -= Math.abs(list[i] - (i + 1));
    }

    if (isPrime(list[i])) {
      totalPrimeNumbers++;
    }

    if (list[i] % 2 === 0) {
      pair++;
    } else {
      odd++;
    }

    if (POPULAR_NUMBERS.includes(list[i])) {
      fitness += 100;
    }

    if (NO_POPULAR_NUMBERS.includes(list[i])) {
      fitness -= 100;
    }
  };

  const sequences = findSequence(list) || [];

  for (const item of sequences) {
    if (item.length > 9) {
      fitness -= 100;
    }

    if ([4, 5].includes(item.length)) {
      fitness += 100;
    }
  }

  if ([4, 7].includes(totalPrimeNumbers)) {
    fitness += 100;
  }

  if ([5, 6].includes(totalPrimeNumbers)) {
    fitness += 1000;
  }

  if ([8, 9].includes(pair)) {
    fitness += 500;
  }

  if ([7, 6].includes(odd)) {
    fitness += 500;
  }

  return fitness;
};

// SELEÇÃO DE NATURAL
const selectParents = (population, targetList) => {
  let parents = [];

  for (let i = 0; i < TOURNAMENT_SIZE; i++) {
    parents.push(population[Math.floor(Math.random() * population.length)]);
  }

  parents.sort((a, b) => calculateFitness(b, targetList) - calculateFitness(a, targetList));
  return parents.slice(0, 2);
};

// REPRODUÇÃO CRUZADA
const crossover = (parent1, parent2) => {
  const crossoverPoint = Math.floor(Math.random() * LIST_LENGTH);
  const child = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));
  return child.sort((a, b) => a - b);
};

// MUTAÇÃO
const mutate = (list) => {
  const mutationFirstPoint = Math.floor(Math.random() * LIST_LENGTH);
  const mutationSecondPoint = Math.floor(Math.random() * LIST_LENGTH);

  list[mutationFirstPoint] = makeNumber();
  list[mutationSecondPoint] = makeNumber();

  let uniqueNumbers = new Set(list);

  while (uniqueNumbers.size < LIST_LENGTH) {
    for (let i = 0; i < LIST_LENGTH; i++) {
      if (list.filter((num) => num === list[i]).length > 1) {
        const duplicateIndex = list.findIndex((num, index) => num === list[i] && index !== i);
        list[duplicateIndex] = Math.floor(Math.random() * (RANGE_MAX - RANGE_MIN + 1)) + RANGE_MIN;
      }
    }

    uniqueNumbers = new Set(list);
  }

  return list.sort((a, b) => a - b);
};

// CRIA NOVA POPULAÇÃO
const createNewGeneration = (population, targetList, mode) => {
  const newPopulation = [];

  let population_size = POPULATION_SIZE;

  if (mode === "ADVANCED") {
    population_size = 400;
  }

  while (newPopulation.length < population_size) {
    const [parent1, parent2] = selectParents(population, targetList);

    let child = crossover(parent1, parent2);
    child = mutate(child);

    newPopulation.push(child);
  }

  return newPopulation;
};

const geneticAlgorithm = async (allContests, best, mode) => {
  const targetList = best || [];
  let population = allContests || [[]];

  let generations = GENERATIONS;

  if (mode === "ADVANCED") {
    generations = 2000;
  }

  for (let generation = 0; generation < generations; generation++) {
    population = createNewGeneration(population, targetList, mode);
  }

  population.sort((a, b) => calculateFitness(b, targetList) - calculateFitness(a, targetList));
  const result = population[0].sort((a, b) => a - b);
  return result;
};

module.exports = geneticAlgorithm;
