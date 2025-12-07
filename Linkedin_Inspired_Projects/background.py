import sys
import cv2
import time

print("Running with:", sys.executable)

# create a video capture object
cap = cv2.VideoCapture(0)  # 0 for the default camera

if not cap.isOpened():
    print("[ERROR] Cannot access camera")
    exit()

print("[INFO] Please step out of the frame... capturing background in 3 seconds.")
time.sleep(3)  # wait for 3 seconds

# Capture a frame
ret, background = cap.read()
if ret:
    cv2.imwrite('image.jpg', background)
    print("[INFO] Background saved as image.jpg")
    cv2.imshow("Background", background)
    cv2.waitKey(2000)  # show background for 2 seconds
else:
    print("[ERROR] Failed to capture background")

cap.release()
cv2.destroyAllWindows()
