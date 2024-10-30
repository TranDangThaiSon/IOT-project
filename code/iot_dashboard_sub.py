import paho.mqtt.client as mqtt
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Thaison@@1",
  database="test" #remember to replace with your username and password
)

def on_connect(client, userdata, flags, rc):
	print(f"Connected with result code:{rc}")
	client.subscribe("Data topic") #remember to replace with your channel name

def on_message(client, userdata, msg):
	print(msg.topic+" "+str(msg.payload))
	mycursor = mydb.cursor()
	sql = "insert into test values(id, %s, %s, %s, CURRENT_TIMESTAMP())"
	val = msg.payload.split()
	mycursor.execute(sql, val)
	mydb.commit()
	
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
client.on_connect = on_connect
client.on_message = on_message
client.username_pw_set("test_user", "Thaison@@1") #remember to replace with your username and password

mqtt_broker_address = "192.168.199.85" #remember to replace with your IP address

client.connect(mqtt_broker_address, 1883, 60)
print("Listening...")

try:
	client.loop_forever()
except:
	print("Broker disconnected!")
