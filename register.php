<?php
// register.php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: register.html');
    exit;
}

// Basic sanitization
$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';
$product  = trim($_POST['product'] ?? '');
$price    = isset($_POST['price']) && $_POST['price'] !== '' ? (float)$_POST['price'] : 0;

if ($username === '' || $password === '') {
    echo "Username and password are required.";
    exit;
}

// Check username not already used
$stmt = $mysqli->prepare("SELECT userid FROM users WHERE username = ?");
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo "Username already taken.";
    $stmt->close();
    exit;
}
$stmt->close();

// Hash password
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Insert user
// Your users table has: userid, username, userpassword, product, price, created_at
$insert = $mysqli->prepare("INSERT INTO users (username, userpassword, product, price) VALUES (?, ?, ?, ?)");
if (!$insert) {
    die("Prepare failed: " . $mysqli->error);
}
// Bind: username (s), userpassword (s), product (s), price (d: decimal)
$insert->bind_param(
    'sssd',
    $username,
    $hashed,
    $product,
    $price
);

if ($insert->execute()) {
    // Optionally log user in immediately
    $_SESSION['userid'] = $insert->insert_id;
    $_SESSION['username'] = $username;
    header('Location: dashboard.php');
    exit;
} else {
    echo "Registration failed: " . $insert->error;
    exit;
}
?>
