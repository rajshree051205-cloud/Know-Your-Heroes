<?php
// story_api.php — Story Wall endpoint (PDO version)
// GET  -> returns all stories as JSON
// POST -> saves a new story (with honeypot + rate limit protection)

session_start();
require "config.php";
header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {

    $stmt = $pdo->query(
        "SELECT id, hero_name, relation, unit, story, submitted_by, created_at
         FROM stories ORDER BY created_at DESC"
    );
    echo json_encode($stmt->fetchAll());
    exit;

} elseif ($method === "POST") {

    $input = json_decode(file_get_contents("php://input"), true);
    if (!is_array($input)) {
        $input = $_POST;
    }

    // --- 1. Honeypot check ---
    // Add a hidden field named "website" to your HTML form (see note below).
    // Real users never fill it in; bots usually do.
    if (!empty($input["website"])) {
        // Pretend it succeeded so the bot doesn't learn anything, but don't save it.
        echo json_encode(["success" => true]);
        exit;
    }

    // --- 2. Rate limit: one submission per 30 seconds per session ---
    $now = time();
    $lastSubmit = $_SESSION["last_story_submit"] ?? 0;
    if ($now - $lastSubmit < 30) {
        http_response_code(429);
        echo json_encode(["error" => "Please wait a moment before submitting another story."]);
        exit;
    }

    // --- 3. Validate & clean input ---
    $hero_name    = trim($input["heroName"] ?? "");
    $relation     = trim($input["relation"] ?? "");
    $unit         = trim($input["unit"] ?? "");
    $story        = trim($input["story"] ?? "");
    $submitted_by = trim($input["submittedBy"] ?? "");

    if ($hero_name === "" || $story === "") {
        http_response_code(400);
        echo json_encode(["error" => "Hero's name and story are required."]);
        exit;
    }
    if (mb_strlen($hero_name) > 150 || mb_strlen($story) > 5000) {
        http_response_code(400);
        echo json_encode(["error" => "Submission too long."]);
        exit;
    }

    $relation     = $relation === "" ? null : $relation;
    $unit         = $unit === "" ? null : $unit;
    $submitted_by = $submitted_by === "" ? null : $submitted_by;

    // --- 4. Insert using a prepared statement ---
    $stmt = $pdo->prepare(
        "INSERT INTO stories (hero_name, relation, unit, story, submitted_by)
         VALUES (:hero_name, :relation, :unit, :story, :submitted_by)"
    );
    $stmt->execute([
        ":hero_name"    => $hero_name,
        ":relation"     => $relation,
        ":unit"         => $unit,
        ":story"        => $story,
        ":submitted_by" => $submitted_by,
    ]);

    $_SESSION["last_story_submit"] = $now;

    echo json_encode([
        "success" => true,
        "story" => [
            "id" => $pdo->lastInsertId(),
            "hero_name" => $hero_name,
            "relation" => $relation,
            "unit" => $unit,
            "story" => $story,
            "submitted_by" => $submitted_by,
            "created_at" => date("Y-m-d H:i:s")
        ]
    ]);
    exit;

} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>