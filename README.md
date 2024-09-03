# GETNET

1. Validação de Máquina de Cartão

   Plano de Testes:
   - Identificação das Bandeiras e Tipos de Transação:
     - Bandeiras: Visa, Master, Elo, Amex, Hiper.
     - Tipos de Transação: Débito e Crédito.

   Casos de Teste:
   - Cada bandeira pode ser testada para ambos os tipos de transação (débito e crédito), resultando em 10 combinações (5 bandeiras × 2 tipos de transação).
   - Para cada combinação, seriam considerados casos de teste positivos (transações bem-sucedidas) e negativos (transações recusadas devido a fundos insuficientes, cartão inválido, etc.).

   Técnica de Teste:
   - Partição de Equivalência: Dividir os cenários de teste em classes de equivalência para cobrir casos normais e anômalos.
   - Análise de Valor Limite: Testar os limites, como valores mínimos e máximos permitidos para transações.

   Quantidade de Casos de Teste:
   - Mínimo de 20 casos de teste: 10 para transações bem-sucedidas (positivos) e 10 para transações falhas (negativos).

2. Ferramentas de Automação de Testes

   Ferramentas:
   - Web: Selenium, Cypress.
     - Selenium: Amplamente utilizado para automação de testes de interfaces web; suporta múltiplas linguagens de programação.
     - Cypress: Excelente para testes end-to-end, com uma sintaxe simples em JavaScript e execução rápida.
   - APIs: Postman, RestAssured.
     - Postman: Facilita a criação e execução de testes automatizados de APIs; integra-se com CI/CD.
     - RestAssured: Ferramenta específica para testes de APIs em Java; permite a validação fácil de respostas de API.
   - Mobile: Appium.
     - Appium: Suporta automação de testes em aplicativos móveis, tanto para Android quanto iOS, e é multiplataforma.

   Justificativa:
   - A escolha das ferramentas depende da plataforma-alvo, da equipe e da integração com outras ferramentas no pipeline de CI/CD.

3. Automação de Testes em Ambientes Complexos

   Estratégia:
   - Estrutura de Microserviços:
     - Implementar testes unitários robustos para cada microserviço, garantindo que eles funcionem de forma isolada.
   - Testes de Integração:
     - Criar testes de integração para verificar a comunicação entre os microserviços.
   - Testes de Contrato (Contract Testing):
     - Utilizar frameworks como Pact para garantir que as interações entre microserviços sejam mantidas conforme o contrato.
   - Monitoramento Contínuo:
     - Monitorar continuamente a integração e a comunicação entre serviços com ferramentas como Prometheus e Grafana.

4. Integração Contínua e Automação de Testes

   Explicação:
   - Integração Contínua (CI): Integração frequente do código na base de código principal com execução automática de testes a cada commit.
   - Benefícios da CI com Automação de Testes:
     - Feedback rápido: A CI, quando combinada com testes automatizados, oferece feedback imediato sobre a qualidade do código, permitindo a correção rápida de bugs.
     - Qualidade do Software: A CI com testes automatizados garante que novos códigos sejam testados continuamente, mantendo a estabilidade do software.
     - Eficiência: Automatizar os testes reduz o tempo necessário para verificar a funcionalidade do software, permitindo lançamentos mais frequentes e confiáveis.
