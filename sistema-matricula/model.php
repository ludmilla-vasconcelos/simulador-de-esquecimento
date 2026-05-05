<?php

class AlunoModel
{
    private string $nome;
    private int $idade;
    private string $curso;

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

    public function save(): void
    {
        $dbPath = __DIR__ . '/database.sqlite';
        $pdo = new PDO("sqlite:$dbPath");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("INSERT INTO alunos (nome, idade, curso) VALUES (:nome, :idade, :curso)");
        $stmt->bindParam(':nome', $this->nome, PDO::PARAM_STR);
        $stmt->bindParam(':idade', $this->idade, PDO::PARAM_INT);
        $stmt->bindParam(':curso', $this->curso, PDO::PARAM_STR);
        $stmt->execute();
    }
}
