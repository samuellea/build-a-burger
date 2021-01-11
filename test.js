const obj = { salad: 1, cheese: 0 };
Object.entries(obj).map(el => console.log(el))

const ingredients = {};
for (let param of Object.entries(obj)) {
  ingredients[param[0]] = param[1];
}

console.log(ingredients);