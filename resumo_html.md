# Resumo de HTML: Conceitos e Estrutura

## 1. O que é HTML?
O HTML (**HyperText Markup Language**) é a espinha dorsal de qualquer site. É importante reforçar que ele **não é uma linguagem de programação**, mas sim uma **linguagem de marcação**. 

Enquanto linguagens de programação lidam com lógica e processamento de dados, o HTML serve para estruturar o conteúdo da página, definindo o que é um título, um parágrafo, um link ou uma imagem através de etiquetas (tags).

## 2. Estrutura Inicial Obrigatória
Todo documento HTML5 deve começar com esta base para que o navegador entenda como renderizar a página:

- `<!DOCTYPE html>`: Avisa ao navegador que estamos usando a versão mais recente do HTML.
- `<html>`: A tag "pai" que envolve todo o conteúdo.
- `<head>`: Contém metadados, o título da aba e links para estilos (configurações que não aparecem na página).
- `<body>`: Onde fica tudo o que o usuário realmente vê no site.

## 3. Glossário de Tags Principais
Aqui estão as tags fundamentais que estruturam o texto e a mídia:

* `<h1>` a `<h6>`: São títulos e subtítulos. O `<h1>` é o principal e o mais importante para o SEO.
* `<p>`: Define um parágrafo de texto.
* `<a>`: Cria hiperlinks (links para outras páginas). Exige o atributo `href`.
* `<img>`: Insere imagens. Exige o atributo `src` (caminho da imagem) e `alt` (texto alternativo).
* `<ul>` e `<li>`: Usadas para criar listas com marcadores (bolinhas).

## 4. A Importância da Tag `<div>`
A tag `<div>` funciona como uma caixa invisível ou um container. Ela é essencial para:
* **Organização:** Agrupar elementos relacionados.
* **Aninhamento:** Colocar vários elementos dentro de um bloco para facilitar a estilização posterior com CSS.
* **Layout:** Ajudar a dividir a página em seções (como topo, lateral e rodapé).