<?php

require_once __DIR__ . '/service.php';
require_once __DIR__ . '/model.php';

class MatriculaController
{
    private MatriculaService $service;

    public function __construct()
    {
        $this->service = new MatriculaService();
    }

    public function processarMatricula(string $nome, int $idade, string $curso): string
    {
        try {
            $resultado = $this->service->processarRegras($nome, $idade, $curso);

            $aluno = new AlunoModel();
            $aluno->setNome($resultado['nome']);
            $aluno->setIdade($resultado['idade']);
            $aluno->setCurso($resultado['curso']);
            $aluno->save();

            $mensagem = "Matricula realizada com sucesso para o aluno '{$resultado['nome']}' no curso de '{$resultado['curso']}'.";

            if ($resultado['bolsa']) {
                $mensagem .= " Parabens! Voce recebeu uma bolsa de {$resultado['desconto']}% de desconto.";
            }

            return $mensagem;
        } catch (Exception $e) {
            return "Erro na matricula: " . $e->getMessage();
        }
    }
}
