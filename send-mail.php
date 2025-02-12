<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);

    if (!$email) {
        echo "Neplatná e-mailová adresa.";
        exit;
    }

    $to = "tvuj@email.cz"; // Změň na svůj e-mail!
    $subject = "Nová zpráva z webového formuláře";
    $headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

    $fullMessage = "Jméno: $name\nE-mail: $email\n\nZpráva:\n$message";

    if (mail($to, $subject, $fullMessage, $headers)) {
        echo "success";
    } else {
        echo "Chyba při odesílání zprávy.";
    }
} else {
    echo "Neplatná žádost.";
}
?>
