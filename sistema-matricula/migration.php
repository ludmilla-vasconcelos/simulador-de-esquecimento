<?php

class Migration
{
    private PDO $pdo;

    public function __construct()
    {
        $dbPath = __DIR__ . '/database.sqlite';
        $this->pdo = new PDO("sqlite:$dbPath");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function executar(): void
    {
        $sql = "CREATE TABLE IF NOT EXISTS alunos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            idade INTEGER,
            curso TEXT
        )";

        $this->pdo->exec($sql);
        echo "Migration executada com sucesso! Tabela 'alunos' criada.\n";
    }
}

$migration = new Migration();
$migration->executar();
