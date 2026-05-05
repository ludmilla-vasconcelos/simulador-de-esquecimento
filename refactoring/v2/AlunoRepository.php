<?php

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/IAlunoRepository.php';
require_once __DIR__ . '/model.php';

class AlunoRepository implements IAlunoRepository
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function save(AlunoModel $aluno): void
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO alunos (nome, idade, curso) VALUES (:nome, :idade, :curso)"
        );

        $nome = $aluno->getNome();
        $idade = $aluno->getIdade();
        $curso = $aluno->getCurso();

        $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
        $stmt->bindParam(':idade', $idade, PDO::PARAM_INT);
        $stmt->bindParam(':curso', $curso, PDO::PARAM_STR);
        $stmt->execute();
    }

    public function find(int $id): ?AlunoModel
    {
        $stmt = $this->pdo->prepare("SELECT * FROM alunos WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row === false) {
            return null;
        }

        $aluno = new AlunoModel();
        $aluno->setNome($row['nome']);
        $aluno->setIdade((int) $row['idade']);
        $aluno->setCurso($row['curso']);

        return $aluno;
    }

    public function delete(int $id): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM alunos WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
    }
}
