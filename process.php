<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Simulate database processing (in real project, connect to MySQL)
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $date = $_POST['date'] ?? '';
    $time = $_POST['time'] ?? '';
    $guests = $_POST['guests'] ?? '';
    $special_requests = $_POST['special_requests'] ?? '';
    
    // Basic validation
    if (empty($name) || empty($email) || empty($phone) || empty($date) || empty($time) || empty($guests)) {
        echo json_encode(['success' => false, 'message' => 'Please fill all required fields']);
        exit;
    }
    
    // In a real application, you would save to database here
    // For demo purposes, we'll just return success
    $reservation_data = [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'date' => $date,
        'time' => $time,
        'guests' => $guests,
        'special_requests' => $special_requests,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    // Save to file (for demo purposes)
    file_put_contents('reservations.txt', print_r($reservation_data, true) . "\n---\n", FILE_APPEND);
    
    echo json_encode(['success' => true, 'message' => 'Reservation created successfully']);
    exit;
}

// If not POST request
echo json_encode(['success' => false, 'message' => 'Invalid request method']);
?>