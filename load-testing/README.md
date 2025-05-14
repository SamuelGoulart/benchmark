# 📊 K6 Load Testing com InfluxDB + Grafana

Este projeto configura um ambiente completo para testes de carga usando o [K6](https://k6.io/), com persistência dos dados no InfluxDB e visualização no Grafana.

## 🚀 Tecnologias Utilizadas

* [K6](https://k6.io/) – ferramenta de teste de carga
* [InfluxDB](https://www.influxdata.com/) – banco de dados para métricas de séries temporais
* [Grafana](https://grafana.com/) – visualização de métricas
* [Docker Compose](https://docs.docker.com/compose/) – orquestração dos containers

---

## 📁 Estrutura

* `docker-compose.yml`: configura os serviços `k6`, `influxdb` e `grafana`.
* `k6-test.js`: script de teste que realiza requisições HTTP e registra métricas.

---

## 🛠️ Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/SamuelGoulart/benchmark
cd benchmark/load-testing
````

### 2. Suba os containers com Docker

```bash
docker-compose up
```

> Isso irá:
>
> * Iniciar o InfluxDB na porta `8086`
> * Iniciar o Grafana na porta `3000`

### 3. Execute o teste de carga com K6

Com o ambiente iniciado, rode o script de teste:

```bash
k6 run --out influxdb=http://localhost:8086/k6 k6-test.js
```

> Esse comando envia os resultados diretamente para o InfluxDB para visualização no Grafana.

---

## 📈 Acessando o Dashboard no Grafana

1. Acesse: [http://localhost:3000](http://localhost:3000)

2. Login padrão:

   * **Usuário:** `admin`
   * **Senha:** `admin`

3. Adicione a fonte de dados InfluxDB:

   * URL: `http://influxdb:8086`
   * Database: `k6`
   * Sem autenticação

4. Importe o dashboard:

   * Vá em “+” > “Import”
   * Use o [JSON do dashboard do K6](https://grafana.com/grafana/dashboards/2587-k6-load-testing-results/) (ID: `2587`)
   * Escolha a fonte de dados `InfluxDB`

---

## 🧪 Como Funciona o Teste (`k6-test.js`)

O script realiza requisições GET para um endpoint local:

```javascript
http.get('http://localhost:3050/phoenix/v1/tokens/verify', {
  headers: { authorization: '...' }
});
```

Ele mede:

* Duração da requisição (`request_duration`)
* Tamanho da resposta (`response_size`)
* Taxa de sucesso (`success_rate`)
* Contagem de erros (`error_count`)

E simula 20 usuários virtuais durante 15 segundos.

---

## 🧰 Instalação do K6 (opcional – Linux)

Se quiser executar o K6 localmente (fora do Docker), instale com:

```bash
sudo apt update
sudo apt install gnupg ca-certificates
curl -s https://dl.k6.io/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt update
sudo apt install k6
```

Mais instruções: [https://k6.io/docs/getting-started/installation/](https://k6.io/docs/getting-started/installation/)

---

## 🧹 Encerrando

Para parar os containers:

```bash
docker-compose down
```

---

## 🖼️ Exemplo de Dashboard

![Dashboard K6 no Grafana](https://github.com/user-attachments/assets/c04d4b74-0003-4bb7-986b-a8de77e24586)

---

## 📌 Observações

* <b>Lembre-se de alterar o endpoint http://localhost:3050/phoenix/v1/tokens/verify</b> no script k6-test.js para o endereço da sua aplicação local ou ambiente que estiver testando.
* Você pode editar o script `k6-test.js` conforme o seu cenário de teste.
