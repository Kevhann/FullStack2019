export const calculateBmi = (height: number, weight: number): string => {
  console.log("height:", height);
  console.log("weight:", weight);

  if (Number.isNaN(height) || weight <= 0 || Number.isNaN(weight) || height <= 0) {
    throw new Error("Invalid parameters");
  }
  const metres = height / 100;
  const bmi: number = weight / (metres * metres);

  console.log("bmi:", bmi);
  if (bmi < 15) {
    return "Very severely underweight";
  } else if (bmi < 16) {
    return "Severely underweight";
  } else if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else if (bmi < 35) {
    return "Obese Class I (Moderately obese)";
  } else if (bmi < 40) {
    return "Obese Class II (Severely obese)";
  } else {
    return "Obese Class III (Very severely obese)";
  }
};

try {
  if (process.argv.length !== 4) {
    throw new Error("Must have four arguments");
  }
  console.log(calculateBmi(Number.parseInt(process.argv[2]), Number.parseInt(process.argv[3])));
} catch (error) {
  console.log(error);
}

console.log(process.argv);
