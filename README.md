# Pipeline de Integração Contínua com GitHub Actions

## Objetivo

Este projeto tem como objetivo demonstrar a implementação de uma pipeline de Integração Contínua (Continuous Integration - CI) utilizando GitHub Actions em um projeto Node.js com testes automatizados.

A solução contempla diferentes formas de execução da pipeline, geração de relatórios de testes, armazenamento de artefatos e uma etapa de deploy simulado para demonstrar o fluxo de validação e entrega contínua.

---

## Tecnologias Utilizadas

* Node.js 22
* Mocha
* mocha-junit-reporter
* GitHub Actions
* actions/upload-artifact
* dorny/test-reporter

---

## Conceitos Utilizados

### Integração Contínua (CI)

Integração Contínua (Continuous Integration - CI) é uma prática de desenvolvimento que consiste em integrar frequentemente alterações de código em um repositório compartilhado.

Sempre que uma alteração é realizada, processos automatizados são executados para verificar se a aplicação continua funcionando corretamente.

Principais benefícios:

* Detecção antecipada de falhas;
* Redução de problemas de integração;
* Maior confiabilidade do código;
* Feedback rápido para os desenvolvedores;
* Automatização da validação do software.

---

### GitHub Actions

GitHub Actions é a plataforma de automação do GitHub que permite criar workflows para executar tarefas automaticamente, como compilação, testes e implantação.

Os workflows são definidos em arquivos YAML localizados na pasta:

```text
.github/workflows
```

---

## Estrutura da Solução

O projeto possui workflows independentes para atender aos requisitos da atividade.

### 1. Execução Manual

Workflow responsável pela execução manual da pipeline.

Gatilho utilizado:

```yaml
workflow_dispatch:
```

Permite que o usuário execute o workflow diretamente pela interface do GitHub Actions.

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
  branches:
    - main
```

Sempre que um commit é enviado para a branch principal, a pipeline é executada automaticamente.

---

## Execução dos Testes

Os testes automatizados são executados utilizando o framework Mocha.

Comando utilizado:

```bash
npm test
```

Os testes verificam se as funcionalidades da aplicação continuam funcionando conforme o esperado.

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

Esse formato é amplamente utilizado por ferramentas de CI/CD para análise e publicação dos resultados de testes automatizados.

---

## Publicação dos Resultados

A Action `dorny/test-reporter` é utilizada para publicar os resultados dos testes diretamente na execução da pipeline.

Benefícios:

* Visualização dos testes executados;
* Quantidade de testes aprovados;
* Quantidade de testes reprovados;
* Detalhamento das falhas encontradas.

---

## Armazenamento de Artefatos

O arquivo de relatório é armazenado utilizando:

```yaml
actions/upload-artifact
```

Isso permite que o relatório seja disponibilizado para download após a execução da pipeline.

Artefato gerado:

```text
relatorio-testes
```

O armazenamento dos artefatos possibilita a consulta posterior dos resultados da execução.

---

## Deploy Simulado

Após a execução bem-sucedida dos testes automatizados, a pipeline executa uma etapa de deploy simulado.

Objetivos:

* Demonstrar o conceito de Continuous Delivery (CD);
* Representar uma etapa de implantação;
* Garantir que apenas código validado avance para as etapas finais do processo.

Nesta atividade foi utilizada uma simulação através do comando:

```bash
echo "Deploy sendo realizado..."
```

Em cenários reais, essa etapa poderia realizar publicações em servidores, containers Docker, ambientes de homologação ou serviços em nuvem.

---

## Fluxo de Execução

```text
Push / Schedule / Manual
          │
          ▼
   Instala Dependências
          │
          ▼
    Executa Testes
          │
          ▼
 Gera results.xml
          │
          ├──► Publica Relatório
          │
          └──► Salva Artifact
          │
          ▼
    Deploy Simulado
```
