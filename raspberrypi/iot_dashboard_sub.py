import paho.mqtt.client as mqtt
import RPi.GPIO as GPIO

mqtt_channel = "Test topic"
mqtt_broker_address = "192.168.248.85" #remember to replace with your IP address

GPIO.setwarnings(False) 
GPIO.setmode(GPIO.BOARD)  
light_pin = 22
fan_pin = 38
GPIO.setup(light_pin, GPIO.OUT)
GPIO.setup(fan_pin, GPIO.OUT)

def on_connect(client, userdata, flags, rc):
	print(f"Connected with result code:{rc}")
	client.subscribe(mqtt_channel)

def on_message(client, userdata, msg):
	if(str(msg.payload) == "b'Fan'"):
		GPIO.output(fan_pin, not GPIO.input(fan_pin))
		print("Fan toggled!")
	elif(str(msg.payload) == "b'Light'"):
		GPIO.output(light_pin, not GPIO.input(light_pin))
		print("Light toggled!")
	elif(str(msg.payload) == "b'Stat'"):
		status = str(GPIO.input(fan_pin)) + " " + str(GPIO.input(light_pin))
		client.publish("Test topic", status)
		print(status)
	else:
		GPIO.output(fan_pin, GPIO.input(fan_pin))
		GPIO.output(light_pin, GPIO.input(light_pin))
	
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
client.on_connect = on_connect
client.on_message = on_message
client.username_pw_set("test_user", "Thaison@@1") #remember to replace with your username and password


client.connect(mqtt_broker_address, 1883, 60)
print("Listening...")

try:
	client.loop_forever()
except:
	print("Broker disconnected!")
