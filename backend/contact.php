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
$data = json_decode(file_get_contents("php://input"), true);

// Check required fields
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

// Sanitize input
$name = htmlspecialchars(trim($data['name']));
$email = htmlspecialchars(trim($data['email']));
$message = htmlspecialchars(trim($data['message']));

// Send email
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'savithri14pt@gmail.com';       // Your Gmail address
    $mail->Password   = 'wuln hfpm wxbh gucf';          // Your Gmail App Password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom($email, $name);
    $mail->addAddress('savithri14pt@gmail.com');       // Where you want to receive the email

    $mail->isHTML(false);
    $mail->Subject = 'New Portfolio Message';
    $mail->Body    = "Name: $name\nEmail: $email\nMessage:\n$message";

    $mail->send();
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    file_put_contents("email-error.log", "Email failed: " . $mail->ErrorInfo);
    echo json_encode(["success" => true, "message" => "Saved but email failed"]);
}
?>
