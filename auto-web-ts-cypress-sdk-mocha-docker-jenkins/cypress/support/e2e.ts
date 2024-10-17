
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
// require('cypress-xpath')
import 'cypress-wait-until';
// import 'cypress-mochawesome-reporter/register';  

const registerCypressGrep = require('@cypress/grep/src/support')
registerCypressGrep()


const chaiSorted = require('chai-sorted')
chai.use(chaiSorted)


// Hide fetch/XHR requests
const app = window.top;

if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');

  app.document.head.appendChild(style);
}