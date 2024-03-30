const {processCallback} = require('./index')

const vm = require('node:vm');

// This defines our process function in a different VM
const script_code = `
function process(input, output) {
	// Just to show we can write the value
	output[0] = input[0]*1337;

	return true;
};

register(process);
`;


// The processor in the VM is stored here
var processor = null;
function register(proc) {
	processor = proc;
}

// Run the VM, which populates the processor
const processor_context = {register};
vm.createContext(processor_context);
const script = new vm.Script(script_code);
script.runInContext(processor_context);

// Run the processor in rust side
output = processCallback(processor);
console.log(output); // Float32Array(3) [ 1337, 0, 0 ]


