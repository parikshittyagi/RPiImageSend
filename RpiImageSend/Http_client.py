#In this Code We are Capturing the image from Rpi camera and then converting the image to Base64.
#Then the converted image is sent through MQTT to IBM Watson IoT Platform

import picamera
from time import sleep
import base64
import requests
import random, string


######################Capturing the image###################################

camera = picamera.PiCamera()

try:
	camera.start_preview()  #allow camera to warm-up to give better image
	sleep(1)
	camera.capture('image_test.jpg', resize=(500, 281)) #resize used to greatly reduce the image size
	camera.stop_preview()
	pass
finally:
	camera.close()


'''***********************************************************'''


####################Converting Image to Base64 and publish#################



def convertImageToBase64():
	with open("image_test.jpg", "rb") as image_file:
		encoded = base64.b64encode(image_file.read())
		return encoded

'''***********************************************************'''

################encoded packaging and publishing to cloud############


#This function is defined to give some unique identity to images
def randomword(length):
	return ''.join(random.choice(string.lowercase) for i in range(length)) 

'''************************************************************'''

Image_Base64=convertImageToBase64()
Image_Id=randomword(8)
print(Image_Id)


payload={
	"Image":Image_Base64,
	"Image_ID":Image_Id
	}


requests.post("http://192.168.12.125:3050/device", data=payload)


