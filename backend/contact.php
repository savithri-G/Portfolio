<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Get form data
$data = $_POST;

// Check required fields
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

// Database connection
$conn = new mysqli("localhost", "root", "", "portfolio");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

// Sanitize input
$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$message = $conn->real_escape_string($data['message']);

// Save to DB
$sql = "INSERT INTO messages (name, email, message) VALUES ('$name', '$email', '$message')";
if ($conn->query($sql)) {
    // Send email
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'savithri14pt@gmail.com';       // Your Gmail
        $mail->Password   = 'wuln hfpm wxbh gucf';          // App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom($email, $name);
        $mail->addAddress('savithri14pt@gmail.com');       // Your receiving email

        $mail->isHTML(false);
        $mail->Subject = 'New Portfolio Message';
        $mail->Body    = "Name: $name\nEmail: $email\nMessage:\n$message";

        $mail->send();
        echo json_encode(["success" => true]);
    } catch (Exception $e) {
        file_put_contents("email-error.log", "Email failed: " . $mail->ErrorInfo);
        echo json_encode(["success" => true, "message" => "Saved but email failed"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Failed to save to database"]);
}

$conn->close();
?>
