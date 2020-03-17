type numericalRating = 1 | 2 | 3;

interface Target {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: numericalRating;
  ratingDescription: string;
}

interface Rating {
  rating: numericalRating;
  ratingDescription: string;
  success: boolean;
}
interface Arguments {
  diced: number[];
  target: number;
}

const getFeedback = (actual: number, expected: number): Rating => {
  const howGoodWereYou = actual / expected;
  if (howGoodWereYou >= 1) {
    return { ratingDescription: "Good Job!", rating: 3, success: true };
  } else if (howGoodWereYou >= 0.5) {
    return {
      ratingDescription: "not too bad but could be better",
      rating: 2,
      success: false,
    };
  } else {
    return {
      ratingDescription: "That was pretty bad",
      rating: 1,
      success: false,
    };
  }
};

export const calculateExercises = (data: number[], target: number): Target => {
  if (target < 0) {
    throw new Error("target must be non-negative");
  }

  if (data.length < 2) {
    throw new Error("data must have at least one day and a target value");
  }
  let trainingDays = 0;
  let average = 0;

  data.forEach(d => {
    if (d > 0) {
      trainingDays++;
    }
    average += d;
  });
  average /= data.length;

  const ratingDescription = getFeedback(average, target);

  const result = {
    periodLength: data.length,
    average,
    trainingDays,
    target,
    ...ratingDescription,
  };
  return result;
};

const parseArgs = (): Arguments => {
  const sliced = process.argv.slice(2, process.argv.length - 1);
  console.log("sliced:", sliced);
  const diced = sliced.map(s => {
    const parsed = Number.parseInt(s);
    if (Number.isNaN(parsed) || parsed < 0) {
      throw new Error("error in training data input");
    }
    return parsed;
  });
  const targetString = process.argv[process.argv.length - 1];
  const target = Number.parseInt(targetString);
  console.log("target:", target);
  if (Number.isNaN(target) || target < 0) {
    throw new Error("error in target input");
  }
  return { diced, target };
};

try {
  const args = parseArgs();
  console.log(calculateExercises(args.diced, args.target));
} catch (error) {
  console.log(error);
}
