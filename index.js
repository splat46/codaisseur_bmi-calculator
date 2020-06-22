if (process.argv.length !== 7) {
    console.log(`
      You gave ${process.argv.length - 2} arguments(s) to the program
  
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age (years), 
      wether you exercise daily (yes or no)
      and your gender (m or f)
      
      Example:
  
      $ node index.js 82 1.79 32 yes m
    `);
  
    process.exit();
}

//console.log("What does process.argv contain?", process.argv);
let weightInKg = parseInt(process.argv[2]); 
let heightinM = parseFloat(process.argv[3]);
let age = parseInt(process.argv[4]);
let dailyExercise = process.argv[5];
let gender = process.argv[6];

if (isNaN(weightInKg) || isNaN(heightinM) || isNaN(age)) {
    console.log(`
      Please make sure weight, height and age are numbers:
  
      weight (kg) example: 82 | your input: ${process.argv[2]}
      height (m) example 1.79 | your input: ${process.argv[3]}
      age (years) example 32  | your input: ${process.argv[4]} 
  
      $ node index.js 82 1.79 32 yes m
    `);
  
    process.exit();
  }

// Calculcate BMI by using weight in KG and height in M
let BMI = weightInKg / (heightinM * heightinM);

// Ideal BMI is 22.5
// A BMI under 18.5 is considered underweight
// A BMI above 25 is considered overweight
// Formula for idealWeight is 22.5 x heightInM x heightInM
let idealWeight = 22.5 * heightinM * heightinM;

// Calculate BMR 10x weightinKg + 6.25 x heightinCM - 5 * age (man + 50, woman - 150) 
let heightinCm = heightinM * 100;
let BMR = gender === 'm' ? 10 * weightInKg + 6.25 * heightinCm - 5 * age + 50 : 10 * weightInKg + 6.25 * heightinCm - 5 * age - 150;

// Calculate daily calories by daily exercise or not
let dailyCalories = dailyExercise === 'yes' ? 1.6 * BMR : 1.4 * BMR;

// Calculate weight to lose to reach ideal weight
let weightToLose = weightInKg - idealWeight;

// Calculate how many weeks for ideal weight
let dietWeeks = Math.abs(weightToLose / 0.5);

// Calculate how many calories i have to consume
let dietCalories = weightToLose < 0 ? dailyCalories + 500 : dailyCalories - 500;

// Validation: Age
if (age < 20) {
    console.log('This BMI calculator is designed for people over 20');

    process.exit();
}

// Validation: Weight in KG more than 30 or less than 300
if (weightInKg < 30 || weightInKg > 300) {
    console.log('Please provide a number of weight in kilograms between 30 and 300, like 31 or 299');

    process.exit();
}

// Validation: Daily exercise
if (dailyExercise !== 'yes' && dailyExercise !== 'no') {
    console.log('Please specify if you exercise daily with "yes" or "no"');

    process.exit();
}

console.log(`
**************
BMI CALCULATOR
**************

age: ${age} years
height: ${heightinM} m
weight: ${weightInKg} kg
do you exercise daily? ${dailyExercise}

****************
FACING THE FACTS
****************

Your BMI is ${Math.round(BMI)}

A BMI under 18.5 is considered underweight
A BMI above 25 is considered overweight


**********
DIET PLAN
**********

If you want to reach your ideal weight of ${Math.round(idealWeight)} kg:

Eat ${Math.round(dietCalories)} calories a day
For ${Math.round(dietWeeks)} weeks
`)