# LotoAI - Modelagem de Padrões da Lotofácil com Algoritmos Evolutivos e Redes Neurais

## Índice

- [Objetivo](#objetivo)
- [Escopo](#escopo)
- [Contexto](#contexto)
- [Restrições](#restrições)
- [Trade-offs](#trade-offs)
- [Diagramas](#diagramas)
- [Requisitos de Software](#requisitos-de-software)
  - [Requisitos Funcionais](#requisitos-funcionais)
  - [Requisitos Não Funcionais](#requisitos-não-funcionais)
- [Modelagem e Organização](#modelagem-e-organização)
- [Observabilidade](#observabilidade)
- [Stacks e Ferramentas](#stacks-e-ferramentas)
- [Testes](#testes)
- [Modelo de Rede Neural Convolucional](#modelo-de-rede-neural-convolucional)
- [Instruções de Uso](#instruções-de-uso)
- [Considerações Finais](#considerações-finais)

---

## Objetivo

O projeto visa desenvolver um sistema capaz de otimizar sequências numéricas complexas utilizando algoritmos genéticos (AG) combinados a Redes Neurais (RN) para análise estatística avançada. Tendo como foco a Engenharia de Software, a solução reforça princípios de modularidade, escalabilidade, qualidade de código, e uso de Web Workers para processamento assíncrono. A proposta pode ser aplicada em cenários de otimização combinatória, análise de padrões e suporte a decisões baseadas em dados.

---

## Escopo

1. *Otimização Combinatória:*  
   Uso de AG para gerar conjuntos numéricos, ajustar parâmetros (tamanho da população, taxa de mutação, crossover) e avaliar resultados segundo múltiplos critérios estatísticos.

2. *Análise via Redes Neurais:*  
   Emprego de um modelo de Rede Neural Convolucional, pré-treinado e adaptado ao domínio numérico, para classificar padrões, identificar tendências e fornecer métricas de confiança.

3. *Processamento Assíncrono (Web Workers):*  
   Delegação de tarefas computacionalmente intensivas (AG e RN) a Web Workers no frontend, garantindo fluidez na interface e responsividade ao usuário.

4. *Visualização e Histórico:*  
   Exibição de relatórios, gráficos estatísticos, histórico de sequências geradas e avaliações qualitativas dos resultados, permitindo análise comparativa e iterações rápidas.

---

## Contexto

Este projeto se insere no contexto de aplicações acadêmicas e industriais que exigem análise estatística avançada, técnicas de IA e otimização. Não se limita a um domínio específico, podendo apoiar decisões informadas em ambientes lotéricos, análise de portfólios, seleção combinatória ou outras situações em que a busca por padrões numéricos complexos seja relevante.

---

## Restrições

1. *Recursos Computacionais Limitados:*  
   Execução local (tanto no servidor quanto no cliente) pode ser limitada por CPU e memória, exigindo uso criterioso de otimizações e threads dedicadas (Web Workers).

2. *Qualidade dos Dados de Treino da RN:*  
   Resultados da RN dependem da qualidade e variedade do dataset utilizado.  
   
3. *Parâmetros do AG:*  
   Ajustar parâmetros de população, número de gerações, limites de tempo, pode exigir experimentação e monitoramento.

---

## Trade-offs

- *Precisão vs. Desempenho:*  
  Parâmetros mais rigorosos no AG e RN oferecem melhor qualidade, mas aumentam o tempo de execução.

- *Generalização vs. Especialização:*  
  Uma RN mais especializada no conjunto de dados atual pode ter acurácia alta neste domínio, porém menor capacidade de generalização para novos contextos.

- *Complexidade vs. Manutenibilidade:*  
  Recursos como Web Workers, monitoramento e CI/CD tornam o sistema mais robusto, mas aumentam a complexidade de manutenção.

---

## Diagramas

- *Diagrama de Caso de Uso:*  
  Mostra interações como: Solicitar geração via AG, validar resultados com RN, visualizar estatísticas, histórico e exportar dados.

- *Diagrama de Arquitetura (Containers):*  
  Detalha Frontend (React + Web Workers), Backend (Node.js/Express), Datastore (GCP), e interações com serviços externos e modelos de IA.

---

## Requisitos de Software

### Requisitos Funcionais

- *RF01:* Permitir a geração de sequências numéricas por Algoritmos Genéticos.  
- *RF02:* Avaliar sequências utilizando a Rede Neural, filtrando resultados com base em thresholds pré-definidos.  
- *RF03:* Exibir estatísticas (médias, frequências, distribuição de primos/pares/ímpares) e resultados históricos.  
- *RF04:* Permitir o usuário definir parâmetros do AG (população, gerações) e visualizar métricas de desempenho.  
- *RF05:* Oferecer funcionalidades de busca e filtragem no histórico de sequências geradas.  
- *RF06:* Executar processamento intensivo (AG, RN) de modo assíncrono, não bloqueando a interface.  
- *RF07:* Suportar autenticação e autorização de usuários por meio de tokens e serviços de terceiros (ex.: Firebase).  
- *RF08:* Enviar feedback e logs de erros à interface de observabilidade ou dashboards.  
- *RF09:* Armazenar configurações do usuário, preferências e limites de análises mensais.  
- *RF10:* Integrar pagamento ou módulos premium (se aplicável), garantindo que certos recursos sejam acessíveis mediante autenticação e quitação de licença.

### Requisitos Não Funcionais

- *RNF01 (Desempenho):* Operações críticas devem ocorrer em <2s de média na maioria dos cenários.  
- *RNF02 (Segurança):* Dados sensíveis devem ser protegidos (HTTPS, tokens JWT, restrições de acesso).  
- *RNF03 (Usabilidade):* Interface responsiva, intuitiva e acessível, independente do tamanho da tela.  
- *RNF04 (Escalabilidade):* Arquitetura modular, permitindo aumentar a capacidade do backend ou adicionar novos algoritmos de IA sem comprometer a estabilidade.  
- *RNF05 (Manutenibilidade):* Código comentado, testes abrangentes, uso de linting e padronização (ESLint, SonarLint).  
- *RNF06 (Observabilidade):* Monitoramento de métricas (CPU, latência, erros) via Prometheus/Grafana, logs centralizados e alerta de falhas.  
- *RNF07 (Portabilidade):* Deploy simplificado em múltiplos ambientes (Docker, GCP).  
- *RNF08 (Confiabilidade):* Testes unitários, integração contínua (CI) e pipelines que impeçam a entrada de código quebrado no repositório principal.  
- *RNF09 (Privacidade):* Cumprir normas de privacidade, protegendo informações do usuário conforme leis aplicáveis.

---

## Modelagem e Organização

- *Backend (MVC+Services):*  
  Camadas separadas: Controllers, Routers, Services, Datastore. Facilita troca do modelo RN, ajustes no AG, ou mudança de base de dados.

- *Frontend (Clean Architecture):*  
  Três camadas (Apresentação, Domínio, Dados) asseguram modularidade. Web Workers são isolados, interagindo via mensagens, simplificando a manutenção do código de IA e AG.

- *Gestão de Tarefas (Kanbanize):*  
  O fluxo de desenvolvimento, atribuição de tarefas, acompanhamento de sprints e priorização de funcionalidades foram organizados no *Kanbanize*, permitindo rastreabilidade e histórico de decisões. Itens de backlog, tarefas em andamento (Doing) e concluídas (Done) são monitoradas, garantindo visibilidade e controle de prazos.

---

## Observabilidade

- *Logs, Métricas e Alertas:*  
  Prometheus coleta métricas de uso de CPU, memória e tempo de resposta; Grafana visualiza dados em dashboards customizados; alertas automáticos para identificação rápida de gargalos.
- *Qualidade de Código:*  
  Integração com SonarLint e ESLint no pipeline, assegurando legibilidade e detectando vulnerabilidades cedo.

---

## Stacks e Ferramentas

- *Frontend:* React.js, Web Workers, Axios  
- *Backend:* Node.js + Express  
- *IA:* TensorFlow.js / Brain.js (CNN), Algoritmo Genético (JS puro)  
- *Banco de Dados:* Google Cloud Datastore  
- *Observabilidade:* Prometheus, Grafana  
- *CI/CD:* GitHub Actions  
- *Kanbanize:* Gestão ágil das tarefas e backlog

---

## Testes

- *Testes Unitários:*  
  Cobrem funções do AG (crossover, mutação, fitness) e camadas do backend.
  
- *Testes de Integração:*  
  Garantem comunicação entre frontend, backend, Web Workers e modelo RN.

- *Testes de Desempenho:*  
  Avaliam tempo médio de execução do AG e RN sob diferentes parâmetros.

- *CI/CD:*  
  Pipelines no GitHub Actions executam testes a cada commit na branch de desenvolvimento, rejeitando merges se a cobertura for insuficiente ou se testes falharem.

---

## Modelo de Rede Neural Convolucional

- *Dataset e Pré-Processamento:*  
  Dados numéricos normalizados (valores entre 0 e 1), possibilidade de augmentations (permutações controladas) para melhorar robustez.
  
- *Estrutura da CNN:*  
  Camadas convolucionais, pooling e densas otimizadas para detecção de padrões estatísticos.
  
- *Treinamento e Validação:*  
  Uso de sets de validação, early stopping e análise de métricas (acurácia, loss), garantindo que o modelo seja confiável antes da integração.

---

## Instruções de Uso

*Backend:*
1. Configurar .env com chaves para Datastore, tokens de autenticação.
2. npm install  
3. npm start  
4. Acessar API na porta definida, p.ex. http://localhost:8080.

*Frontend:*
1. npm install  
2. npm start  
3. Acessar http://localhost:3000 para utilizar a UI.  

Parâmetros do AG e RN podem ser ajustados via interface. Acompanhamento de status e logs em dashboards de observabilidade (Prometheus/Grafana).

---

## Considerações Finais

O projeto demonstra a sinergia entre algoritmos genéticos, redes neurais e engenharia de software, aliando performance, modularidade e qualidade. O uso de Web Workers garante responsividade e bom UX, enquanto observabilidade, testes e CI/CD fornecem confiabilidade e mantenabilidade. O acompanhamento no Kanbanize assegurou organização e visibilidade no ciclo de desenvolvimento. A solução, assim, constitui uma base sólida para trabalhos futuros que desejem aplicar técnicas de IA e otimização a problemas combinatórios complexos.
