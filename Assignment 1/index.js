console.log("============== Part 1: Coding Questions ==============");

console.log("============== Question 1 ==============");

// Convert the string "123" to a number and add 7. (0.5 Grade)
// • Output Example: 130
const a = "123";
const result = parseInt(a, 10) + 7;
console.log("The result is:", result);

console.log("============== Question 2 ==============");

// Check if the given variable is falsy and return "Invalid" if it is. (0.5 Grade)
// • Input Example: 0
// •  Output Example: "Invalid"

// [false , 0 ,-0 ,0n ,"" ,null ,undefined ,NaN] False values in JavaScript

// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Enter a number: ", (input) => {
//   const value = Number(input);

//   if (!value) {
//     console.log("Invalid");
//   } else {
//     console.log("Valid");
//   }

//   rl.close();
// });

let value = 0;

if (!value) {
  console.log("Invalid");
} else {
  console.log("Valid");
}

console.log("============== Question 3 ==============");

// Use for loop to print all numbers between 1 and 10, skipping even numbers using continue (0.5 Grade)
// • Output Example:1, 3, 5, 7, 9

for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;
  }
  console.log(i);
}

console.log("============== Question 4 ==============");

// Create an array of numbers and return only the even numbers using filter method. (0.5 Grade)
// • Input Example: [1, 2, 3, 4, 5]
// • Output Example: [2,4]

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNumbers = arr.filter((num) => num % 2 === 0);

console.log("Even numbers:", evenNumbers);

console.log("============== Question 5 ==============");

// Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade)
// • Input Example: [1, 2, 3], [4, 5, 6]
// • Output Example: [1, 2, 3, 4, 5, 6]

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];

const allNumbers = [...arr1, ...arr2];
console.log("All numbers:", allNumbers);

console.log(
  "============== Question 6 uncomment the fun. call to test ==============",
);

// Use a switch statement to return the day of the week given a number (1 = Sunday …., 7 = Saturday). (0.5 Grade)
// • Input Example: 2
// • Output Example: “Monday”

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askDay() {
  rl.question("Select Number Between 1 to 7: ", (input) => {
    const dayNumber = parseInt(input, 10);

    switch (dayNumber) {
      case 1:
        console.log("Sunday");
        break;
      case 2:
        console.log("Monday");
        break;
      case 3:
        console.log("Tuesday");
        break;
      case 4:
        console.log("Wednesday");
        break;
      case 5:
        console.log("Thursday");
        break;
      case 6:
        console.log("Friday");
        break;
      case 7:
        console.log("Saturday");
        break;
      default:
        console.log("Invalid input. Please enter a number between 1 and 7.\n");
        return askDay();
    }

    rl.close();
  });
}

// askDay();

console.log("============== Question 7 ==============");

// Create an array of strings and return their lengths using map method (0.5 Grade)
// • Input: ["a", "ab", "abc"]
// • Output Example: [1, 2, 3]

const input = ["a", "ab", "abc"];

const newResult = input.map((str) => str.length);

console.log("Lengths of strings:", newResult);

console.log("============== Question 8 ==============");

// Write a function that checks if a number is divisible by 3 and 5. (0.5 Grade)
// • Input Example: 15
// • Output Example: “Divisible by both”

const num = 15;

if (num % 3 === 0 && num % 5 === 0) {
  console.log("Divisible by both");
} else {
  console.log("Not divisible by both");
}

console.log("============== Question 9 ==============");

// Write a function using arrow syntax to return the square of a number (0.5 Grade)
// • Input Example: 5
// • Output Example: 25

const newNum = 5;
const square = newNum ** 2;
console.log(`The square of ${newNum} is:`, square);

console.log("============== Question 10 ==============");

// Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade)
// • Input Example: const person = {name: 'John', age: 25}
// • Output Example: 'John is 25 years old'

const user = {
  name: "Abdelrahman",
  age: 23,
};

function print({ name, age }) {
  return `${name} is ${age} years old.`;
}

console.log(print(user));

console.log("============== Question 11 ==============");

//  Write a function that accepts multiple parameters (two or more) and returns their sum. (0.5 Grade)
// • Input Example: 1, 2, 3, 4, 5
// • Output Example: 15

function sum(...numbers) {
  let total = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (typeof numbers[i] !== "number" || Number.isNaN(numbers[i])) {
      return "Invalid";
    }

    total += numbers[i];
  }

  return total;
}

console.log(sum(5, 3, 10));
console.log(sum(5, 3, "10"));
console.log(sum(5, 3, NaN));

console.log("============== Question 12 ==============");

// Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade)
// • Output Example: “Success”

console.log("new Promise - UnComment Fun.");

// function delay(msg, ms) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(msg);
//     }, ms);
//   });
// }

// delay("Success", 3000).then((result) => {
//   console.log(result);
// });

// ================================ OR ===========================================

// function delay(msg, counter) {
//   return new Promise((resolve) => {
//     let count = counter;

//     const timer = setInterval(() => {
//       console.log(count);

//       count--;

//       if (count === 0) {
//         clearInterval(timer);
//         setTimeout(() => {
//           resolve(msg);
//         }, 1000);
//       }
//     }, 1000);
//   });
// }

// delay("Success", 3).then((result) => {
//   console.log(result);
// });

console.log("============== Question 13 ==============");

// Write a function to find the largest number in an array. (0.5 Grade)
// •  Input Example: [1, 3, 7, 2, 4]
// • Output Example: 7

const numbers = [5, 12, 8, 20, 3];

const max = numbers.reduce((acc, current) => {
  return current > acc ? current : acc;
});

console.log(max);

// ======================= OR ========================

// const maxNumber = Math.max(...numbers);

// console.log(maxNumber);

// ======================= OR ========================

// function maxNum(numbers) {
//   if (!numbers) {
//     return "Invalid";
//   }

//   let max = numbers[0];

//   for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] > max) {
//       max = numbers[i];
//     }
//   }

//   return max;
// }

// console.log(maxNum(numbers));

console.log("============== Question 14 ==============");

// Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)
// •  Input Example: name: "John", age: 30}
// •  Output Example: ["name", "age"]

function objectKeys(obj) {
  return Object.keys(obj);
}

const newUser = {
  name: "Abdelrahman",
  age: 23,
  country: "Egypt",
};

console.log(objectKeys(newUser));

console.log("============== Question 15 ==============");

// Write a function that splits a string into an array of words based on spaces. (0.5 Grade)
// • Input: "The quick brown fox"
// • Output: ["The", "quick", "brown", "fox"]

const txt = "The quick brown fox";

const newWords = txt.split(" ");
console.log(newWords);

// =================================================================================

console.log("============== Part 2: Essay Questions ==============");

// 1. What is the difference between forEach and for...of? When would you use each?
// 2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples.
// 3. What are the main differences between == and ===?
// 4. Explain how try-catch works and why it is important in async operations.
// 5. What’s the difference between type conversion and coercion? Provide examples of each.

const questionsOne = `forEach i can use it only in arr method , for .. of in any iterable.
   in forEach i cannot use break and continue and doesn't return (undefined) in opposed of for .. of.
  `;

const questionsTwo = `Hoisting means declarations are moved to the top of their scope at compile time. var is hoisted and initialized as undefined. let/const are hoisted too, but stay uninitialized in the Temporal Dead Zone — accessing them before their declaration line throws a ReferenceError.:`;

const questionsTree = `== is loose equality operator, it performs type coercion if the operands are of different types. === is strict equality operator, it checks for both value and type equality without performing type coercion.`;

const questionsFour = `try-catch is a mechanism for handling exceptions in JavaScript. The code inside the try block is executed, and if an error occurs, control is transferred to the catch block where the error can be handled gracefully. This is important in async operations to prevent unhandled promise rejections and maintain application stability.`;

const questionsFive = `Type conversion is the explicit process of converting a value from one type to another using functions like Number(), String(), or Boolean(). For example, Number("123") converts the string "123" to the number 123. Type coercion is the implicit conversion that JavaScript performs automatically when it encounters values of different types in expressions. For example, "5" + 2 results in the string "52" due to coercion.`;

// =============== EXample ===============

console.log("============== Question 2 Ex. ==============");

// console.log(a); // undefined
// var a = 1;

// console.log(b); // ReferenceError
// let b = 2;

console.log("============== Question 5 Ex. ==============");

const num = Number("42"); // 42
const str = String(123); // "123"
const bool = Boolean(1); // true
const int = parseInt("42px"); // 42
