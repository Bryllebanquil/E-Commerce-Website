<?php
// dashboard.php
session_start();
if (!isset($_SESSION['userid'])) {
    header('Location: login.html');
    exit;
}
echo "<h2>Welcome, " . htmlspecialchars($_SESSION['username']) . "</h2>";
echo "<p><a href='logout.php'>Logout</a></p>";

// Example: fetch product and price for this user
require_once 'config.php';
$stmt = $mysqli->prepare("SELECT product, price FROM users WHERE userid = ?");
$stmt->bind_param('i', $_SESSION['userid']);
$stmt->execute();
$stmt->bind_result($product, $price);
if ($stmt->fetch()) {
    echo "<p>Product: " . htmlspecialchars($product) . "</p>";
    echo "<p>Price: " . htmlspecialchars($price) . "</p>";
}
$stmt->close();
?>
