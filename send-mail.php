<?php
/**
 * FATEH STEEL SERVICES — INQUIRY & RFQ PHPMAILER HANDLER
 * Sends incoming website inquiries to company email via SMTP
 */

// Prevent CORS issues & define response format
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method. Please use POST.']);
    exit;
}

// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require_once __DIR__ . '/phpmailer/Exception.php';
require_once __DIR__ . '/phpmailer/PHPMailer.php';
require_once __DIR__ . '/phpmailer/SMTP.php';

// ============================================================================
// SMTP CONFIGURATION (Aap apni details yahan update kar sakte hain)
// ============================================================================
$smtpHost       = 'smtp.gmail.com';             // SMTP Host (e.g. smtp.gmail.com ya smtp.hostinger.com)
$smtpUser       = 'your-email@gmail.com';       // Aapka Gmail / Business Email
$smtpPassword   = 'your-16-digit-app-password'; // Gmail 16-character App Password ya Hosting Mail Password
$smtpPort       = 587;                          // 587 for TLS ya 465 for SSL
$smtpSecure     = PHPMailer::ENCRYPTION_STARTTLS; // PHPMailer::ENCRYPTION_SMTPS for 465

// Receiver Details (Jahan aapko inquiry emails milne chahiye)
$receiverEmail  = 'fatehsteelservices@gmail.com';  // Aapka receiver email (e.g. your-email@gmail.com)
$receiverName   = 'Fateh Steel Services Sales Desk';

// ============================================================================
// EXTRACT & SANITIZE FORM INPUTS
// ============================================================================
// Support both standard POST and JSON POST
$rawInput = file_get_contents('php://input');
$jsonData = json_decode($rawInput, true);

$data = is_array($jsonData) ? $jsonData : $_POST;

$name     = isset($data['name']) ? htmlspecialchars(trim($data['name'])) : '';
$phone    = isset($data['phone']) ? htmlspecialchars(trim($data['phone'])) : '';
$email    = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$company  = isset($data['company']) ? htmlspecialchars(trim($data['company'])) : 'Not Provided';
$grade    = isset($data['grade']) ? htmlspecialchars(trim($data['grade'])) : 'Not Specified';
$size     = isset($data['size']) ? htmlspecialchars(trim($data['size'])) : 'Not Specified';
$quantity = isset($data['quantity']) ? htmlspecialchars(trim($data['quantity'])) : 'Not Specified';
$note     = isset($data['note']) ? nl2br(htmlspecialchars(trim($data['note']))) : 'None';

// Basic Validation
if (empty($name) || (empty($phone) && empty($email))) {
    echo json_encode([
        'success' => false,
        'message' => 'Please provide your name along with either a phone number or email address.'
    ]);
    exit;
}

// ============================================================================
// PREPARE & SEND EMAIL VIA PHPMAILER
// ============================================================================
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPassword;
    $mail->SMTPSecure = $smtpSecure;
    $mail->Port       = $smtpPort;
    $mail->CharSet    = 'UTF-8';

    // Recipients
    $mail->setFrom($smtpUser, 'Fateh Steel Website Inquiry');
    $mail->addAddress($receiverEmail, $receiverName);
    
    // Set Reply-To as client email if provided
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($email, $name);
    }

    // Email Content & Design
    $mail->isHTML(true);
    $mail->Subject = "New Steel RFQ Inquiry: " . $grade . " - " . $name;

    $emailBody = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;'>
        <div style='background: #003a6d; padding: 20px; text-align: center; color: #ffffff;'>
            <h2 style='margin: 0; font-size: 22px;'>FATEH STEEL SERVICES</h2>
            <p style='margin: 5px 0 0; font-size: 13px; color: #38bdf8;'>New Commercial Quote / RFQ Lead Received</p>
        </div>
        
        <div style='padding: 24px; color: #334155; line-height: 1.6;'>
            <h3 style='color: #002244; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-top: 0;'>Buyer & Firm Details</h3>
            <table style='width: 100%; border-collapse: collapse; margin-bottom: 20px;'>
                <tr>
                    <td style='padding: 8px 0; font-weight: bold; width: 35%; color: #64748b;'>Contact Person:</td>
                    <td style='padding: 8px 0; color: #0f172a; font-weight: 600;'>{$name}</td>
                </tr>
                <tr>
                    <td style='padding: 8px 0; font-weight: bold; color: #64748b;'>Company / Firm:</td>
                    <td style='padding: 8px 0; color: #0f172a;'>{$company}</td>
                </tr>
                <tr>
                    <td style='padding: 8px 0; font-weight: bold; color: #64748b;'>Phone / Mobile:</td>
                    <td style='padding: 8px 0; color: #0f172a;'><strong>{$phone}</strong></td>
                </tr>
                <tr>
                    <td style='padding: 8px 0; font-weight: bold; color: #64748b;'>Email Address:</td>
                    <td style='padding: 8px 0; color: #0f172a;'>{$email}</td>
                </tr>
            </table>

            <h3 style='color: #002244; border-bottom: 2px solid #0284c7; padding-bottom: 8px;'>Steel Requirement Specifications</h3>
            <table style='width: 100%; border-collapse: collapse; margin-bottom: 20px;'>
                <tr>
                    <td style='padding: 8px 0; font-weight: bold; width: 35%; color: #64748b;'>Steel Grade:</td>
                    <td style='padding: 8px 0; color: #0284c7; font-weight: 700; font-size: 16px;'>{$grade}</td>
                </tr>
                <tr>
                    <td style='padding: 8px 0; font-weight: bold; color: #64748b;'>Size / Dimension:</td>
                    <td style='padding: 8px 0; color: #0f172a;'>{$size}</td>
                </tr>
                <tr>
                    <td style='padding: 8px 0; font-weight: bold; color: #64748b;'>Required Quantity:</td>
                    <td style='padding: 8px 0; color: #0f172a;'>{$quantity}</td>
                </tr>
                <tr>
                    <td style='padding: 8px 0; font-weight: bold; color: #64748b; vertical-align: top;'>Specific Notes:</td>
                    <td style='padding: 8px 0; color: #0f172a;'>{$note}</td>
                </tr>
            </table>

            <div style='background: #f1f5f9; padding: 12px 16px; border-radius: 6px; font-size: 12px; color: #64748b;'>
                Generated automatically from <strong>Fateh Steel Services</strong> official website contact form.
            </div>
        </div>
        
        <div style='background: #002244; padding: 12px; text-align: center; color: #94a3b8; font-size: 12px;'>
            &copy; " . date('Y') . " Fateh Steel Services. All Rights Reserved.
        </div>
    </div>
    ";

    $mail->Body    = $emailBody;
    $mail->AltBody = "New Lead from {$name} ({$company})\nPhone: {$phone}\nEmail: {$email}\nGrade: {$grade}\nSize: {$size}\nQuantity: {$quantity}\nNotes: {$note}";

    $mail->send();
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your quotation request has been received. Our sales team will get back to you shortly.'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Could not send email. Mailer Error: ' . $mail->ErrorInfo
    ]);
}
