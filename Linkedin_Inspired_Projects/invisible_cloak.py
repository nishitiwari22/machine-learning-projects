import cv2
import numpy as np
import time

# --- Camera Setup ---
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
time.sleep(1)   # Warm-up time for webcam

if not cap.isOpened():
    print("[ERROR] Camera failed to open.")
    exit()

# --- Load Background Image ---
background = cv2.imread(r"C:\Users\Nishi\Desktop\Machine_Learning\image.jpg")  # UPDATE your correct path

if background is None:
    print("[ERROR] Background image not found! Check path.")
    exit()

# --- Read One Frame to Match Sizes ---
ret, test_frame = cap.read()
if not ret:
    print("[ERROR] Cannot read from camera.")
    cap.release()
    exit()

background = cv2.resize(background, (test_frame.shape[1], test_frame.shape[0]))

# --- Main Loop ---
while True:
    ret, current_frame = cap.read()
    if not ret:
        print("[WARN] Could not read frame.")
        break

    hsv_frame = cv2.cvtColor(current_frame, cv2.COLOR_BGR2HSV)

    # Red color ranges
    l_red = np.array([0, 120, 70])
    u_red = np.array([10, 255, 255])
    mask1 = cv2.inRange(hsv_frame, l_red, u_red)

    l_red2 = np.array([170, 120, 70])
    u_red2 = np.array([180, 255, 255])
    mask2 = cv2.inRange(hsv_frame, l_red2, u_red2)

    red_mask = cv2.bitwise_or(mask1, mask2)

    # Clean mask
    kernel = np.ones((3, 3), np.uint8)
    red_mask = cv2.morphologyEx(red_mask, cv2.MORPH_OPEN, kernel, iterations=2)
    red_mask = cv2.morphologyEx(red_mask, cv2.MORPH_DILATE, kernel, iterations=1)

    mask_inv = cv2.bitwise_not(red_mask)

    part1 = cv2.bitwise_and(current_frame, current_frame, mask=mask_inv)
    part2 = cv2.bitwise_and(background, background, mask=red_mask)

    final_output = part1 + part2

    cv2.imshow("Invisible Cloak Effect", final_output)

    if cv2.waitKey(5) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
