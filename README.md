# Pipeline de Integração Contínua com GitHub Actions

## Objetivo

Este projeto tem como objetivo demonstrar a implementação de uma pipeline de Integração Contínua (Continuous Integration - CI) utilizando GitHub Actions em um projeto Node.js com testes automatizados.

A solução contempla diferentes formas de execução da pipeline, geração de relatórios de testes e armazenamento dos artefatos produzidos durante a execução.

---

## Tecnologias Utilizadas

* Node.js 22
* Mocha
* mocha-junit-reporter
* GitHub Actions
* Actions Upload Artifact
* Test Reporter

---

## Conceitos Utilizados

### Integração Contínua (CI)

Integração Contínua é uma prática de desenvolvimento que consiste em integrar frequentemente alterações de código em um repositório compartilhado. A cada alteração, testes automatizados são executados para validar o funcionamento da aplicação.

Os principais benefícios são:

* Detecção antecipada de falhas;
* Redução de problemas de integração;
* Maior confiabilidade do código;
* Feedback rápido para a equipe.

### GitHub Actions

GitHub Actions é a plataforma de automação do GitHub que permite criar workflows para executar tarefas automaticamente, como compilação, testes e implantação.

Os workflows são definidos em arquivos YAML localizados na pasta:

```text
.github/workflows
```

---

## Estrutura da Solução

### 1. Execução Manual

Workflow responsável pela execução manual dos testes.

Gatilho utilizado:

```yaml
workflow_dispatch:
```

Permite que o usuário execute a pipeline diretamente pela interface do GitHub.

---

### 2. Execução Agendada

Workflow responsável pela execução automática em horários pré-definidos.

Gatilho utilizado:

```yaml
schedule:
  - cron: '*/10 * * * *'
```

A execução ocorre automaticamente conforme a expressão cron configurada.

---

### 3. Execução por Push

Workflow responsável pela execução automática após alterações no repositório.

Gatilho utilizado:

```yaml
push:
```

Sempre que um commit é enviado ao repositório, os testes são executados automaticamente.

---

## Execução dos Testes

Os testes são executados utilizando o framework Mocha.

Comando utilizado:

```bash
npm test
```

---

## Geração do Relatório de Testes

Os resultados dos testes são gerados no formato JUnit XML através do pacote:

```text
mocha-junit-reporter
```

Arquivo gerado:

```text
results.xml
```

Esse formato é amplamente utilizado por ferramentas de CI/CD para análise de resultados.

---

## Publicação dos Resultados

A Action Test Reporter é utilizada para publicar os resultados diretamente na execução da pipeline.

Benefícios:

* Visualização dos testes executados;
* Quantidade de testes aprovados;
* Quantidade de testes falhos;
* Detalhamento das falhas encontradas.

---

## Armazenamento de Artefatos

O arquivo de relatório é armazenado utilizando:

```yaml
actions/upload-artifact
```

Isso permite o download posterior dos resultados da execução.

Artefato gerado:

```text
relatorio-testes
```

---

## Fluxo de Execução

1. O workflow é iniciado por Push, Schedule ou Workflow Dispatch.
2. O código é obtido do repositório.
3. O Node.js é configurado.
4. As dependências são instaladas.
5. Os testes automatizados são executados.
6. O relatório JUnit é gerado.
7. Os resultados são publicados.
8. O relatório é armazenado como artefato.