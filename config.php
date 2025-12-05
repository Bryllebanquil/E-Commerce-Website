<?php
// config.php
// Match these credentials to your phpMyAdmin setup.
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';

// IMPORTANT: database name must match exactly what you created in phpMyAdmin.
// In your screenshot it is: e-commerce-website
$DB_NAME = 'e-commerce-website';

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
    die("DB connection failed: " . $mysqli->connect_error);
}
$mysqli->set_charset("utf8mb4");
?>
