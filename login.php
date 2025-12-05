<?php
// login.php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.html');
    exit;
}

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if ($username === '' || $password === '') {
    echo "Username and password are required.";
    exit;
}

// Fetch user by username
$stmt = $mysqli->prepare("SELECT userid, userpassword FROM users WHERE username = ?");
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo "Invalid credentials.";
    $stmt->close();
    exit;
}

$stmt->bind_result($userid, $hashed_password);
$stmt->fetch();
$stmt->close();

if (password_verify($password, $hashed_password)) {
    // Successful login
    session_regenerate_id(true);
    $_SESSION['userid'] = $userid;
    $_SESSION['username'] = $username;
    header('Location: dashboard.php');
    exit;
} else {
    echo "Invalid credentials.";
    exit;
}
?>
