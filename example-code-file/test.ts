const array1 = [
  {
    name: "Hoang",
    isEnoughAge: false,
  }, 
  {
    name: "Huong",
    isEnoughAge: false
  }
];

array1.forEach(people => people.isEnoughAge = true);
console.log(array1)