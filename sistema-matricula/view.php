<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Matricula</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background: #fff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 480px;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 1.6rem;
        }
        label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
            color: #555;
        }
        input, select {
            width: 100%;
            padding: 10px 14px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s;
        }
        input:focus, select:focus {
            outline: none;
            border-color: #4a90d9;
        }
        button {
            width: 100%;
            padding: 12px;
            background-color: #4a90d9;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        button:hover {
            background-color: #357abd;
        }
        .mensagem {
            margin-top: 20px;
            padding: 14px;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
        }
        .sucesso {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .erro {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Sistema de Matricula de Alunos</h1>

        <?php if (isset($mensagem)): ?>
            <div class="mensagem <?= isset($tipoMensagem) ? $tipoMensagem : '' ?>">
                <?= htmlspecialchars($mensagem) ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="/">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" placeholder="Digite o nome do aluno">

            <label for="idade">Idade:</label>
            <input type="number" id="idade" name="idade" placeholder="Digite a idade">

            <label for="curso">Curso:</label>
            <select id="curso" name="curso">
                <option value="">Selecione um curso</option>
                <option value="Engenharia">Engenharia</option>
                <option value="Medicina">Medicina</option>
                <option value="Direito">Direito</option>
                <option value="Ciencia da Computacao">Ciencia da Computacao</option>
                <option value="Administracao">Administracao</option>
            </select>

            <button type="submit">Matricular</button>
        </form>
    </div>
</body>
</html>
