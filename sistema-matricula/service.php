<?php

class MatriculaService
{
    private const IDADE_MINIMA = [
        'Engenharia'       => 17,
        'Medicina'         => 18,
        'Direito'          => 17,
        'Ciencia da Computacao' => 16,
        'Administracao'    => 16,
    ];

    private const BOLSA_IDADE_LIMITE = 20;
    private const BOLSA_DESCONTO = 15;

    public function processarRegras(string $nome, int $idade, string $curso): array
    {
        if (array_key_exists($curso, self::IDADE_MINIMA)) {
            $idadeMinima = self::IDADE_MINIMA[$curso];
            if ($idade < $idadeMinima) {
                throw new Exception(
                    "Idade minima para o curso de $curso e $idadeMinima anos. O aluno '$nome' possui $idade anos."
                );
            }
        }

        $bolsa = false;
        $desconto = 0;

        if ($idade <= self::BOLSA_IDADE_LIMITE) {
            $bolsa = true;
            $desconto = self::BOLSA_DESCONTO;
        }

        return [
            'nome'      => $nome,
            'idade'     => $idade,
            'curso'     => $curso,
            'bolsa'     => $bolsa,
            'desconto'  => $desconto,
        ];
    }
}
