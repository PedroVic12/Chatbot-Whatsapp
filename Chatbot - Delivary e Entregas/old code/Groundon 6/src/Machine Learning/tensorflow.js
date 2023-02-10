//npm install @tensorflow/tfjs

const tf = require('@tensorflow/tfjs');

// Carregue o modelo pré-treinado
const model = await tf.loadLayersModel('http://meusite.com/modelo/modelo.json');

// Prepare os dados de entrada
const entrada = tf.tensor2d([[0.5, 0.5]]);

// Faça a previsão
const previsao = model.predict(entrada);

// Imprima a previsão
console.log(previsao.dataSync());
