const calculateBmi = (height: number, weight: number): string => {
  console.log("height:", height)
  console.log("weight:", weight)
  if (weight <= 0 || height <= 0) {
    console.log("paska")

    throw new Error("Invalid parameters")
  }
  const bmi: number = (height * height) / weight
  if (bmi < 15) {
    return "Very severely underweight"
  } else if (bmi < 16) {
    return "Severely underweight"
  } else if (bmi < 18.5) {
    return "Underweight"
  } else if (bmi < 25) {
    return "Normal (healthy weight)"
  } else if (bmi < 30) {
    return "Overweight"
  } else if (bmi < 35) {
    return "Obese Class I (Moderately obese)"
  } else if (bmi < 40) {
    return "Obese Class II (Severely obese)"
  } else {
    return "Obese Class III (Very severely obese)"
  }
}

try {
  console.log(
    calculateBmi(
      Number.parseInt(process.argv[2]),
      Number.parseInt(process.argv[3])
    )
  )
} catch (error) {
  console.log(error)
}

console.log(process.argv)
