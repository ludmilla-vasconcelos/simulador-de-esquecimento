<?php

interface IAlunoRepository
{
    public function save(AlunoModel $aluno): void;

    public function find(int $id): ?AlunoModel;

    public function delete(int $id): void;
}
