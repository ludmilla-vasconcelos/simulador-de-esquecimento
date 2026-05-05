<?php

require_once __DIR__ . '/middleware.php';
require_once __DIR__ . '/controller.php';

class Router
{
    public function rotear(): void
    {
        $metodo = $_SERVER['REQUEST_METHOD'];

        if ($metodo === 'GET') {
            require __DIR__ . '/view.php';
            return;
        }

        if ($metodo === 'POST') {
            $dados = $_POST;

            $erros = Middleware::validar($dados);

            if (!empty($erros)) {
                $mensagem = implode(' ', $erros);
                $tipoMensagem = 'erro';
                require __DIR__ . '/view.php';
                return;
            }

            $controller = new MatriculaController();
            $resposta = $controller->processarMatricula(
                trim($dados['nome']),
                (int) $dados['idade'],
                trim($dados['curso'])
            );

            if (str_starts_with($resposta, 'Erro')) {
                $tipoMensagem = 'erro';
            } else {
                $tipoMensagem = 'sucesso';
            }

            $mensagem = $resposta;
            require __DIR__ . '/view.php';
            return;
        }
    }
}
