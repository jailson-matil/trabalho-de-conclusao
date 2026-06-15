# Pipeline de Integração Contínua com GitHub Actions

## Objetivo

Este projeto tem como objetivo demonstrar a implementação de uma pipeline de Integração Contínua (Continuous Integration - CI) utilizando GitHub Actions em um projeto Node.js com testes automatizados.

A solução contempla diferentes formas de execução da pipeline, geração de relatórios de testes, armazenamento de artefatos e uma etapa de deploy simulado para demonstrar o fluxo completo de validação e entrega contínua.

---

## Tecnologias Utilizadas

* Node.js 22
* Mocha
* mocha-junit-reporter
* ESLint
* GitHub Actions
* actions/upload-artifact
* dorny/test-reporter

---

## Conceitos Utilizados

### Integração Contínua (CI)

Integração Contínua (Continuous Integration - CI) é uma prática de desenvolvimento que consiste em integrar frequentemente alterações de código em um repositório compartilhado. A cada alteração realizada, processos automatizados são executados para validar a qualidade e o funcionamento da aplicação.

Os principais benefícios são:

* Detecção antecipada de falhas;
* Redução de problemas de integração;
* Maior confiabilidade do código;
* Feedback rápido para os desenvolvedores;
* Automatização das validações de qualidade.

---

### GitHub Actions

GitHub Actions é a plataforma de automação do GitHub que permite criar workflows para executar tarefas automaticamente, como inspeção de código, testes, geração de relatórios e implantação.

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
    - master
```

Sempre que um commit é enviado para a branch principal, a pipeline é executada automaticamente.

---

## Inspeção de Código

A primeira etapa da pipeline consiste na inspeção estática do código utilizando ESLint.

Comando executado:

```bash
npm run lint
```

Objetivos da inspeção:

* Identificar erros de sintaxe;
* Garantir padronização do código;
* Detectar problemas antes da execução dos testes;
* Melhorar a qualidade geral da aplicação.

A etapa de testes somente é executada caso a inspeção seja concluída com sucesso.

---

## Execução dos Testes

Os testes automatizados são executados utilizando o framework Mocha.

Comando utilizado:

```bash
npm test
```

Os testes têm como objetivo validar o comportamento esperado da aplicação e garantir que alterações no código não introduzam falhas.

---

## Dependência entre Jobs

A pipeline foi estruturada utilizando múltiplos jobs e dependências através da propriedade `needs`.

Fluxo implementado:

1. Inspeção de Código (Lint)
2. Testes Unitários
3. Deploy Simulado

A etapa seguinte somente é executada quando a etapa anterior é concluída com sucesso.

Essa estratégia evita que código com falhas de qualidade ou testes reprovados avance para etapas posteriores.

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
* Detalhamento das falhas encontradas;
* Melhor acompanhamento da qualidade da aplicação.

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

O armazenamento dos artefatos possibilita auditoria, rastreabilidade e análise posterior dos resultados.

---

## Deploy Simulado

Após a aprovação das etapas de inspeção de código e testes automatizados, a pipeline executa uma etapa de deploy simulado.

Objetivos:

* Demonstrar o conceito de Continuous Delivery (CD);
* Validar o fluxo completo da pipeline;
* Garantir que apenas código aprovado avance para implantação.

Nesta atividade foi utilizada uma simulação através do comando:

```bash
echo "Deploy sendo realizado..."
```

Em um ambiente real, essa etapa poderia realizar publicações em servidores, containers Docker, ambientes de homologação ou serviços em nuvem.

---

## Fluxo de Execução

```text
Push na branch master
          │
          ▼
   Inspeção de Código
       (ESLint)
          │
          ▼
    Testes Unitários
          │
          ▼
 Geração do results.xml
          │
          ├──► Publicação do Relatório
          │
          └──► Armazenamento do Artifact
          │
          ▼
    Deploy Simulado
```
