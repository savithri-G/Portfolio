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

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

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

// Save data to database
$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$message = $conn->real_escape_string($data['message']);

$sql = "INSERT INTO messages (name, email, message) VALUES ('$name', '$email', '$message')";
if ($conn->query($sql)) {
    // Now send email using PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'savithri14pt@gmail.com';          // 🔁 Replace with your Gmail
        $mail->Password   = 'wuln hfpm wxbh gucf';            // 🔁 Replace with App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Email content
        $mail->setFrom($email, $name);
        $mail->addAddress('savithri14pt@gmail.com');       // 🔁 Your receiving email

        $mail->isHTML(false);
        $mail->Subject = 'New Portfolio Message';
        $mail->Body    = "Name: $name\nEmail: $email\nMessage:\n$message";

        $mail->send();
        echo json_encode(["success" => true]);
    } catch (Exception $e) {
        // You can log error to file if needed
        file_put_contents("email-error.log", "Email failed: " . $mail->ErrorInfo);
        echo json_encode(["success" => true, "message" => "Saved but email failed"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Failed to save to database"]);
}

$conn->close();
?>
