import paho.mqtt.client as mqtt
import time
import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning)
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
client.username_pw_set("test_user", "Thaison@@1") #remember to replace with your username and password

def on_connect(client, userdata, flags, rc):
    client.subscribe("Test topic") #remember to replace with your channel name

def on_message(client, userdata, msg):
    print((msg.payload))

mqtt_broker_address = "192.168.199.85" #remember to replace with your IP address

client.connect(mqtt_broker_address, 1883, 60)
client.publish("Test topic", "Stat")

client.on_connect = on_connect
client.on_message = on_message

client.loop_start()
time.sleep(0.1)
client.loop_stop()
client.disconnect()