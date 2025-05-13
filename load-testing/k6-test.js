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
            authorization: ""
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
