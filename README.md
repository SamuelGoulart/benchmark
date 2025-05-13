# 📊 K6 Load Testing com InfluxDB + Grafana

Este projeto configura um ambiente completo para testes de carga usando o [K6](https://k6.io/), com persistência dos dados no InfluxDB e visualização no Grafana.

---

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
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2. Suba os containers com Docker

```bash
docker-compose up
```

> Isso irá:
>
> * Iniciar o InfluxDB na porta `8086`
> * Iniciar o Grafana na porta `3000`
> * Executar automaticamente o teste com o K6

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

## 🧹 Encerrando

Para parar os containers:

```bash
docker-compose down
```

---

## 🖼️ Exemplo de Dashboard

![Dashboard K6 no Grafana](./dashboard-preview.png)

---

## 📌 Observações

* Certifique-se de que o endpoint `http://localhost:3050/phoenix/v1/tokens/verify` esteja disponível localmente.
* Você pode alterar o script `k6-test.js` conforme necessário.

---

Se quiser, posso gerar a imagem preview do dashboard (`dashboard-preview.png`) a partir do screenshot que você me enviou. Deseja isso?
