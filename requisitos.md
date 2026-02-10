requisitos.md
Projeto Simulador de Esquecimento “A”

    Documento: DRF-SEA001 Versão: 1.0 Status: Especificação Inicial Autor: Analista de Requisitos (IA)

1. Contexto

    Problema: A dificuldade de estudantes em reter conteúdos a longo prazo devido à falta de revisões sistemáticas baseadas na curva do esquecimento.

    Usuários: * Estudante: Responsável por cadastrar matérias, conteúdos e marcar revisões como concluídas.

    Valor: Automatizar o cronograma de revisões utilizando a Curva de Ebbinghaus, transformando um conceito teórico em uma ferramenta prática de organização.

2. Requisitos Funcionais (RF)
RF01 - Gerenciamento de Usuários

Descrição: O sistema deve permitir a criação de conta e autenticação. Regras:

    O login deve ser feito via e-mail e senha.

    A senha deve ser armazenada com criptografia. Critério de Aceite:

    [ ] Validar se o e-mail possui formato válido.

    [ ] Impedir acesso sem autenticação.

RF02 - Gerenciamento de Matérias

Descrição: O usuário deve cadastrar as disciplinas que está estudando. Regras:

    O sistema deve impedir o cadastro de matérias com nomes duplicados para o mesmo usuário.

    Ao excluir uma matéria, todos os conteúdos vinculados devem ser removidos (Exclusão em cascata). Critério de Aceite:

    [ ] Confirmar exclusão em cascata de conteúdos.

RF03 - Cadastro de Conteúdos

Descrição: Registro do assunto estudado vinculado a uma matéria. Regras:

    Campos obrigatórios: Título, Matéria, Data do Estudo.

    Campo opcional: Observações. Critério de Aceite:

    [ ] Validar se a data inserida é válida.

RF04 - Simulador de Esquecimento (Status Visual)

Descrição: O sistema deve calcular e exibir o status de retenção do conteúdo através de cores. Regras:

    Verde: Conteúdo estudado recentemente.

    Amarelo: Conteúdo que requer atenção.

    Vermelho: Momento ideal para revisão (baseado nos gatilhos de 24h, 7 dias e 30 dias). Critério de Aceite:

    [ ] O status deve ser atualizado automaticamente com base na data do sistema.

RF05 - Registro de Revisão Concluída

Descrição: O usuário informa ao sistema que a revisão foi realizada. Regras:

    Ao clicar em "Revisão Concluída", o ciclo da curva de esquecimento deve ser reiniciado para aquele conteúdo. Critério de Aceite:

    [ ] O status do conteúdo deve voltar para "Verde" após o clique.

RF06 - Edição de Conteúdo e Recálculo

Descrição: O sistema deve permitir alterar a data original do estudo. Regras:

    Caso a data seja editada, o sistema deve recalcular o status (cor) imediatamente. Critério de Aceite:

    [ ] Verificar se a cor do status mudou após alteração da data.

3. Regras de Negócio (RN)

    RN01 (Algoritmo Fixo): O sistema utiliza estritamente os intervalos de 24 horas, 7 dias e 30 dias. Não há personalização de dificuldade pelo usuário.

    RN02 (Hierarquia): Não existem conteúdos órfãos; todo conteúdo deve obrigatoriamente pertencer a uma matéria.

    RN03 (Persistência): Os dados devem ser salvos no banco de dados para que estejam disponíveis em qualquer acesso futuro.

4. Requisitos Não-Funcionais (RNF)

    RNF01 (Segurança): Criptografia de senhas (ex: BCrypt ou similar).

    RNF02 (Usabilidade): Interface simples, clara e intuitiva, focada na visualização por cores (Semáforo).

    RNF03 (Disponibilidade): O sistema deve ser acessível via navegador (Web).

    RNF04 (Performance): O recálculo dos status deve ocorrer de forma rápida ao carregar a lista do usuário.
