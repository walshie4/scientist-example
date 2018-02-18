const Promise = require('bluebird');
const Scientist = require('scientist');


const scientist = new Scientist();

scientist.on('skip', (experiment) => console.log(experiment));
scientist.on('result', (res) => console.log(res));
scientist.on('error', (err) => console.error(err));

const scientistFunc = scientist.science.bind(scientist);


const control = (a, b) => Promise.resolve().then(() => a * b);
const replacement = (a, b) => Promise.resolve().then(() => Math.floor(a * b));

const exampleTest = (a, b) => scientistFunc('example', (experiment) => {
  experiment.async(true);
  experiment.use(() => control(a,b));
  experiment.try(() => replacement(a, b));
});


exampleTest(2, 3);
exampleTest(3, 2);
exampleTest(2.5, 4.1);
