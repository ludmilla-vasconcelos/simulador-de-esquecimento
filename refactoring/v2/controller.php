<?php

require_once __DIR__ . '/service.php';
require_once __DIR__ . '/BusinessRuleException.php';

class MatriculaController
{
    private MatriculaService $service;

    public function __construct(MatriculaService $service)
    {
        $this->service = $service;
    }

    public function store(string $nome, int $idade, string $curso): void
    {
        try {
            $resultado = $this->service->matricular($nome, $idade, $curso);

            $mensagem = "Matricula realizada com sucesso para o aluno '{$resultado['nome']}' no curso de '{$resultado['curso']}'.";

            if ($resultado['bolsa']) {
                $mensagem .= " Parabens! Voce recebeu uma bolsa de {$resultado['desconto']}% de desconto.";
            }

            $tipoMensagem = 'sucesso';
            require __DIR__ . '/view.php';
        } catch (BusinessRuleException $e) {
            $mensagem = $e->getMessage();
            $tipoMensagem = 'erro';
            require __DIR__ . '/view.php';
        } catch (Exception $e) {
            $mensagem = "Ocorreu um erro interno. Tente novamente mais tarde.";
            $tipoMensagem = 'erro';
            require __DIR__ . '/view.php';
        }
    }
}
