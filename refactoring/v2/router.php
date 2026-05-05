<?php

require_once __DIR__ . '/middleware.php';
require_once __DIR__ . '/controller.php';

class Router
{
    private MatriculaController $controller;

    public function __construct(MatriculaController $controller)
    {
        $this->controller = $controller;
    }

    public function rotear(): void
    {
        $metodo = $_SERVER['REQUEST_METHOD'];

        if ($metodo === 'GET') {
            require __DIR__ . '/view.php';
            return;
        }

        if ($metodo === 'POST') {
            $dados = Middleware::sanitizar();

            $erros = Middleware::validar($dados);

            if (!empty($erros)) {
                $mensagem = implode(' ', $erros);
                $tipoMensagem = 'erro';
                require __DIR__ . '/view.php';
                return;
            }

            $this->controller->store(
                trim($dados['nome']),
                (int) $dados['idade'],
                trim($dados['curso'])
            );
        }
    }
}
