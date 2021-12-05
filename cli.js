const prompts = require('prompts');
const fs = require('fs');
const { spawn, exec, execSync } = require("child_process");

const questions = [
  {
    type: 'select',
    name: 'command',
    message: 'Pick a script',
    choices: [],
  },
];

(async () => {

    let packageOptions = fs.readFileSync('./package.json')
    packageOptions = JSON.parse(packageOptions)

    const choices = Object.keys(packageOptions.scripts).map((value) => ({
        title: value,
        value: packageOptions.scripts[value]
    }))

    questions[0].choices = choices;
    const response = await prompts(questions);


    
    const output = exec(`${response.command} -la`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
    });

    output.stdout.pipe(process.stdout);
 
})();


