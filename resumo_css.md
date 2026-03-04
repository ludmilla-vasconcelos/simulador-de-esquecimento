📚 Resumo – Introdução ao CSS
🎨 O que é CSS?

CSS (Cascading Style Sheets) é a linguagem usada para estilizar páginas web. Enquanto o HTML é responsável pela estrutura do site (títulos, parágrafos, imagens, botões), o CSS é responsável pela aparência visual.

Com o CSS podemos:

Definir cores

Ajustar tamanhos

Criar espaçamentos

Organizar elementos na tela

Melhorar o design da página

Sem o CSS, os sites ficariam apenas com texto simples e sem organização visual.

📁 Por que usar um arquivo externo (style.css)?

O uso de um arquivo externo como style.css é o mais recomendado porque:

Mantém o código organizado

Separa estrutura (HTML) de estilo (CSS)

Facilita a manutenção do site

Permite reutilizar o mesmo estilo em várias páginas

Deixa o projeto mais profissional

Para conectar o CSS ao HTML utilizamos a seguinte linha dentro da tag <head>:
<link rel="stylesheet" href="style.css">
📦 Modelo de Caixa (Box Model)

No CSS, todos os elementos são considerados como uma caixa retangular. Essa caixa é formada por:

Content (conteúdo) → Texto ou imagem

Padding → Espaço interno entre o conteúdo e a borda

Border → Borda do elemento

Margin → Espaço externo entre um elemento e outro

🔎 Diferença entre margin e padding

Padding é o espaço interno da caixa. Ele afasta o conteúdo da borda.

Margin é o espaço externo da caixa. Ele afasta um elemento dos outros elementos ao redor.

Exemplo:div {
  margin: 20px;
  padding: 10px;
}
📖 Glossário de Propriedades CSS
🎨 color

Define a cor do texto.
color: blue;
🖌 background-color

Define a cor de fundo do elemento.
background-color: lightgray;
📏 margin

Define o espaço externo do elemento (fora da borda).
margin: 20px;
📦 padding

Define o espaço interno do elemento (entre o conteúdo e a borda).
padding: 15px;
📐 width

Define a largura do elemento.

width: 300px;
📐 height

Define a altura do elemento.

height: 200px;
🧭 display

Define como o elemento será exibido na página.

Alguns valores importantes:

block → Ocupa a largura inteira da linha

inline → Ocupa apenas o espaço do conteúdo

inline-block → Mistura características de inline e block

flex → Ativa o modo flexbox para organizar elementos

🔄 display: flex

O display: flex é usado para facilitar o alinhamento e organização de elementos dentro de um container.

Ele permite:

Alinhar elementos horizontalmente

Centralizar elementos

Organizar em linhas ou colunas

Controlar espaçamento entre itens

Exemplo:

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

justify-content alinha os itens horizontalmente.

align-items alinha os itens verticalmente.

🏷 Classes no CSS

As classes são usadas para estilizar elementos específicos sem alterar todos os elementos do mesmo tipo.

No HTML usamos o atributo class:

<p class="destaque">Texto importante</p>

No CSS usamos um ponto (.) antes do nome da classe:

.destaque {
  color: red;
  font-weight: bold;
}