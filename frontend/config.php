<?php
// config.php — database connection (PDO)
// Put this file next to index.php, and update credentials to match your setup

$DB_HOST = "localhost";
$DB_NAME = "know_your_heroes";
$DB_USER = "root";
$DB_PASS = "";

$dsn = "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // throw exceptions on error
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,        // return rows as assoc arrays
    PDO::ATTR_EMULATE_PREPARES   => false,                   // use real prepared statements
];

try {
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, $options);
} catch (PDOException $e) {
    http_response_code(500);
    header("Content-Type: application/json");
    die(json_encode(["error" => "Database connection failed"]));
}
?>