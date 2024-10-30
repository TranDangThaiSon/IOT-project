import paho.mqtt.client as mqtt

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
client.username_pw_set("test_user", "Thaison@@1") #remember to replace with your username and password

mqtt_broker_address = "192.168.199.85" #remember to replace with your IP address

client.connect(mqtt_broker_address, 1883, 60)
client.publish("Test topic", "Fan") #remember to replace with your channel name

print("Done!!")