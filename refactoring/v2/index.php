<?php

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/AlunoRepository.php';
require_once __DIR__ . '/service.php';
require_once __DIR__ . '/controller.php';
require_once __DIR__ . '/router.php';

// --- Container de Injecao de Dependencia ---

$pdo = Database::getInstance();

$repository = new AlunoRepository($pdo);

$service = new MatriculaService($repository);

$controller = new MatriculaController($service);

$router = new Router($controller);
$router->rotear();
