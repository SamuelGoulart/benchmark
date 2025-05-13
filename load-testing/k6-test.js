import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Counter, Gauge, Rate } from 'k6/metrics';

// 📊 Define métricas personalizadas
export let requestDuration = new Trend('request_duration');     // Tempo da requisição
export let responseSize = new Gauge('response_size');           // Tamanho da resposta
export let errorCount = new Counter('error_count');             // Total de erros
export let successRate = new Rate('success_rate');              // Taxa de sucesso (respostas 200)

export let options = {
    vus: 20,               // Quantidade de usuários virtuais simultâneos
    duration: '15s',       // Tempo total do teste
};

export default function () {
    const res = http.get('http://localhost:3050/phoenix/v1/tokens/verify', {
        headers: {
            authorization: "iExthsCte4W+f4Dctbtgzbwn6EMjov3+0+yVqGaDPkRjoAe8DWNejqXYS+jMM1CjGtEF/K+uZSlAq6/5inMDI3zUUmJWV/cXJnwH+QoQJDUL1hmydZPQJ2CEKdyHq+bnlRWw9PGLLWJ+A+lroAG5YjYDyGNX0bPJpGLDgTPzbjIMpkr9jzMNqLCwhyWkMEJXOSuQjtT/QJExNYLQPYs3jQFsJxt17m9WqyMXrEvjeehohsVzm0m3au/tOlYRMaWCEo3SAU5UJaVIZSKOpAPzPF03vu5SIOTR1Cdj4ysIR6IbGApB5xxG3a8+BJBhWnLqGom9NdmOWDeg5ax14liXy86M+35Pl1Ny6qT+RdzC9sk="
        }
    });


    // ⏱️ Adiciona o tempo de resposta à métrica
    requestDuration.add(res.timings.duration);

    // 📦 Adiciona o tamanho da resposta à métrica
    responseSize.add(res.body.length);

    // ✅ Marca a taxa de sucesso (1 = sucesso, 0 = erro)
    successRate.add(res.status === 200);

    // ❌ Incrementa o contador de erros se o status não for 200
    if (res.status !== 200) {
        errorCount.add(1);
    }

    // 💤 Simula tempo de espera entre requisições
    sleep(1);
}
