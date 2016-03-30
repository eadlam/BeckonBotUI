Header header

uint8 COMMAND_LISTEN = 1
uint8 COMMAND_EXECUTE = 2

uint8 COMMAND_CLICK = 3
uint8 COMMAND_SELECT = 4

uint8 COMMAND_SHUTDOWN = 5
uint8 COMMAND_HALT = 6
uint8 COMMAND_PANIC = 7

# duration
uint8 COMMAND_NOW = 11
uint8 COMMAND_10_SECONDS = 12
uint8 COMMAND_1_MINUTE = 13
uint8 COMMAND_5_MINUTES = 14

# quantity
uint8 COMMAND_LITTLE = 21
uint8 COMMAND_SOME = 22
uint8 COMMAND_MUCH = 23
uint8 COMMAND_ALL = 24

uint8 OBJECT_NONE = 0
uint8 OBJECT_DRONE = 1
uint8 OBJECT_LOCATION = 2
uint8 OBJECT_SPOT = 3

uint8 command
uint8 object_type
std_msgs/String object_name
