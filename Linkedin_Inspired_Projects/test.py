import cv2

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

if not cap.isOpened():
    print("Camera NOT opening")
    exit()

ret, frame = cap.read()
print("Frame read:", ret)

cap.release()
