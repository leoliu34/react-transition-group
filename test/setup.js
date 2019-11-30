
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-preact-pure').default;

Enzyme.configure({ adapter: new Adapter() })
