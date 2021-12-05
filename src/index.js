const prompts = require('prompts');
const fs = require('fs');
const { spawn, exec, execSync } = require("child_process");

const questions = [
  {
    type: 'select',
    name: 'command',
    message: 'Pick a script',
    choices: [
      {
        title: 'createss',
        value: 'ltl'
      }
    ],
  },
];

(async () => {

    let packageOptionsFile = fs.readFileSync('./package.json')
    let packageOptionsParsed = JSON.parse(packageOptions)

    const choices = Object.keys(packageOptionsParsed.scripts).map((value) => ({
        title: value,
        value: packageOptionsParsed.scripts[value]
    }))

    choices.map(value => questions[0].choices.push(value))
    const response = await prompts(questions);
    if (response.command === 'ltl') {
      //create custom scripts
      console.log('create', packageOptionsParsed.scripts)
      return;
    }

    
    const output = exec(`${response.command} -la`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
    });

    output.stdout.pipe(process.stdout);
 
})();


