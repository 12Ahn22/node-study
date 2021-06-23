console.log(this); // {}
console.log(this === module.exports); // true
console.log(this === exports); // true

function whatIsThis() {
  console.log('function', this === exports, this === global);
}
whatIsThis(); // function false true
