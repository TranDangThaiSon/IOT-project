import paho.mqtt.client as mqtt
import time
import adafruit_dht
import smbus
import board
import RPi.GPIO as GPIO
import time
import requests

GPIO.setwarnings(False)  

auto_light_pin = 19
auto_fan_pin = 6
#remember to replace with your IP address
auto_fan_on = "http://192.168.81.85:3000/auto_fan_on"
auto_fan_off = "http://192.168.81.85:3000/auto_fan_off"
auto_light_on = "http://192.168.81.85:3000/auto_light_on"
auto_light_off = "http://192.168.81.85:3000/auto_light_off"
GPIO.setup(auto_light_pin, GPIO.OUT)
GPIO.setup(auto_fan_pin, GPIO.OUT)
dht = adafruit_dht.DHT22(board.D15)
BH1750_ADDR = 0x23
CMD_READ = 0x10

class BH1750(object):

   def __init__(self):
       self.bus = smbus.SMBus(1)

   def light(self):
       data = self.bus.read_i2c_block_data(BH1750_ADDR, CMD_READ)
       result = (data[1] + (256 * data[0])) / 1.2
       return format(result,'.1f')
       
def read_dht():
	try:
		nhiet_do = format(dht.temperature, ".1f")
		do_am = format(dht.humidity, ".1f")
		obj = BH1750()
		anh_sang = obj.light()
		if float(nhiet_do) > 20.0 and GPIO.input(auto_fan_pin) == 1:
			response = requests.get(auto_fan_on)
			GPIO.output(auto_light_pin, GPIO.LOW)
		elif float(nhiet_do) < 20.0 and GPIO.input(auto_fan_pin) == 0:
			response = requests.get(auto_fan_off)
			GPIO.output(auto_light_pin, GPIO.HIGH)
		if float(anh_sang) < 40.0 and GPIO.input(auto_light_pin) == 1:
			response = requests.get(auto_light_on)
			GPIO.output(auto_light_pin, GPIO.LOW)
		elif float(anh_sang) > 40.0 and GPIO.input(auto_light_pin) == 0:
			response = requests.get(auto_light_off)
			GPIO.output(auto_light_pin, GPIO.HIGH)
		message = nhiet_do + " " + do_am + " " + anh_sang
		return message
	except RuntimeError as error:
		print ("error")
		return 1
	except OSError as error:
		print ("error")
		return 1
	else:
		return message
		
while True:
	metrics = read_dht()
	if metrics == 1:
		time.sleep(10)
	else:
		client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
		client.username_pw_set("test_user", "Thaison@@1") #remember to replace with your username and password

		#remember to replace with your IP address
		mqtt_broker_address = "192.168.81.85"

		client.connect(mqtt_broker_address, 1883, 60)
		client.publish("Data topic", metrics) #remember to replace with your channel name
		
		time.sleep(10)
