# Simulador de Esquecimento "A"

Este projeto foi desenvolvido como parte de uma atividade acadêmica para ajudar estudantes a organizarem suas revisões baseadas na **Curva de Esquecimento de Ebbinghaus**.

## Funcionalidades

- **Cadastro de matérias:** Registre o que estudou com nome, tópico, resumo e data.
- **Curva de Ebbinghaus:** O sistema calcula automaticamente as datas de revisão (24h, 7 dias, 30 dias).
- **Semáforo visual:** Cada matéria recebe uma cor de status:
  - **Verde** — Conteúdo em dia, dentro do prazo.
  - **Amarelo** — A revisão está se aproximando.
  - **Vermelho** — Revisão atrasada, hora de revisar!
  - **Roxo** — Conteúdo dominado após as 3 revisões.
- **Barra de progresso:** Acompanhe visualmente o avanço em cada conteúdo (24h → 7d → 30d).
- **Revisão Concluída:** Botão para marcar que a revisão foi feita, reiniciando o ciclo.
- **Exclusão de matérias:** Remova conteúdos que não precisa mais acompanhar.
- **Persistência local:** Dados salvos no IndexedDB do navegador, sem necessidade de servidor.
- **Validação de campos:** HTML5 garante que os dados sejam preenchidos corretamente.
- **Design responsivo:** Interface adaptável a celulares e desktops.

## Tecnologias Utilizadas

- **HTML5 Semântico**
- **CSS3** (Flexbox, animações, design responsivo)
- **JavaScript** (ES6+, async/await, IndexedDB)
- **Git & GitHub** para controle de versão

## Como utilizar

1. Abra o arquivo `index.html` em qualquer navegador.
2. Preencha o nome da matéria, o tópico, o resumo e a data do estudo.
3. Clique em **"Salvar Matéria"**.
4. Acesse **"Minhas Matérias"** para ver o status de esquecimento de cada conteúdo.
5. Quando revisar, clique em **"Revisão Concluída"** para avançar no ciclo.
6. Complete as 3 revisões (24h, 7d, 30d) para dominar o conteúdo!

## Algoritmo da Curva de Esquecimento

O sistema utiliza intervalos fixos baseados na teoria de Ebbinghaus:

| Ciclo | Intervalo | Quando revisar |
|-------|-----------|----------------|
| 1ª Revisão | 24 horas | 1 dia após o estudo |
| 2ª Revisão | 7 dias | 7 dias após a 1ª revisão |
| 3ª Revisão | 30 dias | 30 dias após a 2ª revisão |

Ao completar os 3 ciclos, o conteúdo é marcado como **dominado**.

---
Feito por **Ludmilla e Lucas** - 2026
