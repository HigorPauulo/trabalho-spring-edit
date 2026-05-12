# Projeto Integração React + Spring Boot

Aplicação de cadastro de endereços com back-end em Spring Boot e front-end em React.

## Estrutura

```
projeto-integracao-react-spring/
├── back-end/   API REST Spring Boot
└── front-end/  Aplicação React
```

## Requisitos

- Java 17+
- Node.js 18+
- Maven (usa o wrapper `mvnw` incluso)

## Executando o back-end

```bash
cd back-end
./mvnw spring-boot:run
```

A API sobe em `http://localhost:8080`.

## Executando o front-end

Em outro terminal:

```bash
cd front-end
npm install   # só na primeira vez
npm start
```

A interface abre em `http://localhost:3000`. O `package.json` tem `"proxy": "http://localhost:8080"` para encaminhar as chamadas ao back-end.

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/address` | Lista todos os endereços |
| GET | `/address/{cep}` | Busca endereço por CEP |
| GET | `/address/cidade/{cidade}` | Lista endereços de uma cidade |
| GET | `/address/count` | Retorna `{ "total": n }` com o total cadastrado |
| POST | `/address` | Cadastra um novo endereço |
| PUT | `/address/{cep}` | Atualiza rua, bairro e cidade pelo CEP |
| DELETE | `/address/{cep}` | Remove um endereço pelo CEP |

## Observações

- Os dados ficam em memória (lista no controller). Ao reiniciar o back-end, volta aos 3 endereços iniciais.
- Não foi adicionada persistência em banco — não está no escopo da atividade.