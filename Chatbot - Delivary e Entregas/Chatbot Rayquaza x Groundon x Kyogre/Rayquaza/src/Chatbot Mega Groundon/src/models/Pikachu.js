const { Client } = require('@googlemaps/google-maps-services-js');

class Pikachu {
    constructor(apiKey) {
        this.client = new Client({ apiKey });
    }

    async calcularTrajeto(origem, destino, modo = 'driving') {
        try {
            const response = await this.client.directions({
                origin: origem,
                destination: destino,
                mode: modo,
            });

            // A resposta conterá informações sobre o trajeto.
            const rota = response.data.routes[0];
            return {
                distancia: rota.legs[0].distance.text,
                duracao: rota.legs[0].duration.text,
            };
        } catch (error) {
            throw new Error('Erro ao calcular o trajeto: ' + error.message);
        }
    }

    async obterInformacoesDeLocalizacao(endereco) {
        try {
            const response = await this.client.geocode({
                address: endereco,
            });

            // A resposta conterá informações sobre o local.
            const resultados = response.data.results;
            if (resultados.length > 0) {
                const localizacao = resultados[0].geometry.location;
                return {
                    latitude: localizacao.lat,
                    longitude: localizacao.lng,
                };
            } else {
                throw new Error('Endereço não encontrado.');
            }
        } catch (error) {
            throw new Error('Erro ao obter informações de localização: ' + error.message);
        }
    }
}

// Exemplo de uso:
const apiKey = 'SUA_CHAVE_DE_API';
const pikachu = new Pikachu(apiKey);

// Calcular o trajeto entre dois locais
pikachu.calcularTrajeto('Copacabana', 'Botafogo')
    .then((info) => {
        console.log('Informações de trajeto:');
        console.log('Distância:', info.distancia);
        console.log('Duração:', info.duracao);
    })
    .catch((error) => {
        console.error(error.message);
    });

// Obter informações de localização a partir de um endereço
pikachu.obterInformacoesDeLocalizacao('Copacabana, Rio de Janeiro')
    .then((localizacao) => {
        console.log('Informações de localização:');
        console.log('Latitude:', localizacao.latitude);
        console.log('Longitude:', localizacao.longitude);
    })
    .catch((error) => {
        console.error(error.message);
    });
