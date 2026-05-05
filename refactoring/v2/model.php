<?php

class AlunoModel
{
    private string $nome;
    private int $idade;
    private string $curso;

    public function __get(string $propriedade): mixed
    {
        if (property_exists($this, $propriedade)) {
            return $this->$propriedade;
        }
        throw new RuntimeException("Propriedade '$propriedade' nao existe em AlunoModel.");
    }

    public function __set(string $propriedade, mixed $valor): void
    {
        if (property_exists($this, $propriedade)) {
            $this->$propriedade = $valor;
            return;
        }
        throw new RuntimeException("Propriedade '$propriedade' nao existe em AlunoModel.");
    }

    public function getNome(): string
    {
        return $this->nome;
    }

    public function setNome(string $nome): void
    {
        $this->nome = $nome;
    }

    public function getIdade(): int
    {
        return $this->idade;
    }

    public function setIdade(int $idade): void
    {
        $this->idade = $idade;
    }

    public function getCurso(): string
    {
        return $this->curso;
    }

    public function setCurso(string $curso): void
    {
        $this->curso = $curso;
    }
}
