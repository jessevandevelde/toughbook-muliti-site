<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Ongeldige aanvraagmethode.']);
    exit;
}

// Collect and sanitize form data
$firstName = htmlspecialchars(trim($_POST['firstName'] ?? ''));
$lastName  = htmlspecialchars(trim($_POST['lastName']  ?? ''));
$email     = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone     = htmlspecialchars(trim($_POST['phone']    ?? ''));
$company   = htmlspecialchars(trim($_POST['company']  ?? ''));
$jobTitle  = htmlspecialchars(trim($_POST['jobTitle'] ?? ''));
$product   = htmlspecialchars(trim($_POST['product']  ?? 'Panasonic Toughbook G2'));
$quantity  = intval($_POST['quantity'] ?? 0);
$notes     = htmlspecialchars(trim($_POST['notes']    ?? ''));

// Basic validation
if (!$firstName || !$lastName || !$email || !$company || $quantity < 1) {
    echo json_encode(['success' => false, 'message' => 'Vul alle verplichte velden in.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Ongeldig e-mailadres.']);
    exit;
}

// Build the HTML email body
$notesRow = $notes
    ? "<tr>
        <td style='padding:10px 16px;background:#f8f9fa;border-bottom:1px solid #e9ecef;font-weight:600;color:#495057;width:40%;'>Aanvullende wensen</td>
        <td style='padding:10px 16px;border-bottom:1px solid #e9ecef;color:#212529;'>" . nl2br($notes) . "</td>
       </tr>"
    : "";

$phoneRow = $phone
    ? "<tr>
        <td style='padding:10px 16px;background:#f8f9fa;border-bottom:1px solid #e9ecef;font-weight:600;color:#495057;'>Telefoon</td>
        <td style='padding:10px 16px;border-bottom:1px solid #e9ecef;color:#212529;'>$phone</td>
       </tr>"
    : "";

$jobRow = $jobTitle
    ? "<tr>
        <td style='padding:10px 16px;background:#f8f9fa;border-bottom:1px solid #e9ecef;font-weight:600;color:#495057;'>Functie</td>
        <td style='padding:10px 16px;border-bottom:1px solid #e9ecef;color:#212529;'>$jobTitle</td>
       </tr>"
    : "";

$emailBody = "
<!DOCTYPE html>
<html lang='nl'>
<head><meta charset='UTF-8'></head>
<body style='margin:0;padding:0;background:#f0f2f5;font-family:Inter,Arial,sans-serif;'>
  <table width='100%' cellpadding='0' cellspacing='0' style='background:#f0f2f5;padding:40px 0;'>
    <tr><td align='center'>
      <table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);'>

        <!-- Header -->
        <tr>
          <td style='background:#0a0f1e;padding:32px 40px;'>
            <table width='100%'><tr>
              <td>
                <span style='background:#1a56ff;color:#fff;font-size:11px;font-weight:700;letter-spacing:2px;padding:4px 10px;border-radius:4px;text-transform:uppercase;'>PANASONIC</span>
                <span style='color:#8899aa;font-size:13px;margin-left:10px;letter-spacing:1px;'>Toughbook</span>
              </td>
              <td align='right'>
                <span style='background:rgba(26,86,255,0.15);color:#4d7cff;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;border:1px solid rgba(26,86,255,0.3);'>Nieuwe offerteaanvraag</span>
              </td>
            </tr></table>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style='padding:32px 40px 8px;'>
            <h1 style='margin:0;font-size:24px;font-weight:700;color:#0a0f1e;'>Offerteaanvraag ontvangen</h1>
            <p style='margin:8px 0 0;color:#6b7280;font-size:14px;'>Ingediend op " . date('d-m-Y \o\m H:i') . "</p>
          </td>
        </tr>

        <!-- Contact info -->
        <tr>
          <td style='padding:24px 40px 8px;'>
            <p style='margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;'>Contactgegevens</p>
            <table width='100%' cellpadding='0' cellspacing='0' style='border-radius:8px;overflow:hidden;border:1px solid #e9ecef;font-size:14px;'>
              <tr>
                <td style='padding:10px 16px;background:#f8f9fa;border-bottom:1px solid #e9ecef;font-weight:600;color:#495057;width:40%;'>Naam</td>
                <td style='padding:10px 16px;border-bottom:1px solid #e9ecef;color:#212529;'>$firstName $lastName</td>
              </tr>
              <tr>
                <td style='padding:10px 16px;background:#f8f9fa;border-bottom:1px solid #e9ecef;font-weight:600;color:#495057;'>E-mail</td>
                <td style='padding:10px 16px;border-bottom:1px solid #e9ecef;color:#212529;'><a href='mailto:$email' style='color:#1a56ff;text-decoration:none;'>$email</a></td>
              </tr>
              $phoneRow
              <tr>
                <td style='padding:10px 16px;background:#f8f9fa;font-weight:600;color:#495057;'>Bedrijf</td>
                <td style='padding:10px 16px;color:#212529;'>$company</td>
              </tr>
              $jobRow
            </table>
          </td>
        </tr>

        <!-- Order info -->
        <tr>
          <td style='padding:24px 40px 8px;'>
            <p style='margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;'>Offertedetails</p>
            <table width='100%' cellpadding='0' cellspacing='0' style='border-radius:8px;overflow:hidden;border:1px solid #e9ecef;font-size:14px;'>
              <tr>
                <td style='padding:10px 16px;background:#f8f9fa;border-bottom:1px solid #e9ecef;font-weight:600;color:#495057;width:40%;'>Product</td>
                <td style='padding:10px 16px;border-bottom:1px solid #e9ecef;color:#212529;'>$product</td>
              </tr>
              <tr>
                <td style='padding:10px 16px;background:#f8f9fa;border-bottom:1px solid #e9ecef;font-weight:600;color:#495057;'>Geschat aantal</td>
                <td style='padding:10px 16px;border-bottom:1px solid #e9ecef;'>
                  <span style='background:#e8f0ff;color:#1a56ff;font-weight:700;padding:3px 12px;border-radius:20px;'>$quantity stuks</span>
                </td>
              </tr>
              $notesRow
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style='padding:24px 40px 32px;'>
            <a href='mailto:$email'
               style='display:inline-block;background:#1a56ff;color:#fff;font-weight:600;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;'>
              Reageer op deze aanvraag
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style='background:#f8f9fa;padding:20px 40px;border-top:1px solid #e9ecef;'>
            <p style='margin:0;font-size:12px;color:#9ca3af;'>
              © " . date('Y') . " Panasonic Corporation of North America &nbsp;·&nbsp; Dit is een automatisch gegenereerd bericht.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
";

// Send via PHPMailer + Mailpit
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host     = 'localhost';
    $mail->Port     = 1025;
    $mail->SMTPAuth = false;

    $mail->setFrom('noreply@mijnwebshop.nl', 'Panasonic Toughbook');
    $mail->addAddress('sales@toughbook.panasonic.com', 'Toughbook Sales'); // <-- change to your inbox
    $mail->addReplyTo($email, "$firstName $lastName"); // reply goes to the customer

    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = "Offerteaanvraag: $product – $company ($quantity st.)";
    $mail->Body    = $emailBody;

    $mail->send();

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Mail kon niet worden verzonden: ' . $mail->ErrorInfo]);
}
