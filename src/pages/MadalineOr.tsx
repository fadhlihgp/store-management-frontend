import React, { useState } from 'react';

interface MadalineProps {}

const MadalineOr: React.FC<MadalineProps> = () => {
  const [inputs, setInputs] = useState<number[]>([0, 0]);
  const [output, setOutput] = useState<number>(0);

  const weights1 = [
    [0.5, 0.5], // weights for first neuron
    [0.5, 0.5]  // weights for second neuron
  ];
  const weights2 = [1, 1]; // weights for output neuron
  const threshold = 0.5;

  const activationFunction = (sum: number) => (sum >= threshold ? 1 : 0);

  const handleInputChange = (index: number, value: number) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const calculateOutput = () => {
    const hiddenLayerOutputs = weights1.map(weights =>
      activationFunction(inputs.reduce((acc, input, i) => acc + input * weights[i], 0))
    );
    const finalOutput = activationFunction(hiddenLayerOutputs.reduce((acc, output, i) => acc + output * weights2[i], 0));
    setOutput(finalOutput);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold">Madaline OR Gate</h1>
        <div>
            {inputs.map((input, index) => (
            <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Input {index + 1}</label>
                <input
                type="number"
                value={input}
                onChange={e => handleInputChange(index, Number(e.target.value))}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                />
            </div>
            ))}
        </div>
        <button
            onClick={calculateOutput}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
        >
            Calculate
        </button>
        <div>
            <h2 className="text-xl font-bold">Output: {output}</h2>
        </div>
        </div>
    </div>
  );
};

export default MadalineOr;
