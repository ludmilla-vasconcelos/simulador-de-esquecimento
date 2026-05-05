<?php

class Middleware
{
    public static function validar(array $dados): array
    {
        $erros = [];

        if (empty($dados['nome']) || trim($dados['nome']) === '') {
            $erros[] = "O campo 'Nome' e obrigatorio.";
        }

        if (empty($dados['idade']) && $dados['idade'] !== '0') {
            $erros[] = "O campo 'Idade' e obrigatorio.";
        } elseif (!is_numeric($dados['idade'])) {
            $erros[] = "O campo 'Idade' deve ser um numero valido.";
        }

        if (empty($dados['curso']) || trim($dados['curso']) === '') {
            $erros[] = "O campo 'Curso' e obrigatorio.";
        }

        return $erros;
    }
}
