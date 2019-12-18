# vue-mosquitto-trial
This is a trash-trial sample of a vuejs app using mqtt protocol and chartjs

## What it is
It is a trash project that I did to start learning __vuejs__, __mqtt__ and __chartjs__. It simply shows an ugly chart wich displays random data fetched with mqtt.

## How the project is structured
There are three parts:
* __publisher:__ It is a **nodejs** program made with **typescript** wich publish every second random data with **mqtt** protocol (using **ws**).
* __subscriber:__ It is a **nodejs** program made with **typescript** for test the subscription. It fetches the random data emitted by publisher and simply displays it.
* __vue:__ It is the **vue** site, wich as the subscriber fetches the random data emitted by publisher and displays it in a simple and ugly dyamic chart made with **chartjs**.

## How to use it
On **Windows**:
* Install **mosquitto**. You can download it from here: [download mosquitto](https://mosquitto.org/download/).
* Go to the program folder, wich is probably `C:\Program Files\mosquitto`. Add that path to the **environment variables**.
* Edit `mosquitto.conf` and add `port 9001` and `protocol websockets` to the bottom of the file.
* Now you can start mosquitto, either via **mqtt** protocol, by running `mosquitto`, or via **ws**, by running `mosquitto -c C:\Program Files\mosquitto\mosquitto.conf`. Use the last one when you will test the vue site.
* Instead of changing the `modquitto.conf` file and run manually mosquitto, you can also type `npm run mosquitto:mqtt` or `npm run mosquitto:ws` on the root folder of this project.

On **Linux**:
* Install **mosquitto**. On Debian you can do it executing `sudo apt install mosquitto mosquitto-clients`.
* Edit `mosquitto.conf` and add `port 9001` and `protocol websockets` to the bottom of the file. This file is locate probably in the `/etc/mosquitto/` directory.
* Now you can start mosquitto, either via **mqtt** protocol, by running `mosquitto`, or via **ws**, by running `mosquitto -c /etc/mosquitto/mosquitto.conf`. Use the last one when you will test the vue site.
* Instead of changing the `modquitto.conf` file and run manually mosquitto, you can also type `npm run mosquitto:mqtt` or `npm run mosquitto:ws` on the root folder of this project.


On **publisher folder**:
* Navigate to the **publisher** dir of this project via terminal
* Type `npm i`
* Run `npm run serve:mqtt` or `npm run serve:ws`, depending on the protocol you want to use

On **vue folder**:
* Navigate to **vue** dir of this project via terminal
* Type `npm i`
* Run `npm run serve`
* Connect to `localhost:8080` via any browser

On **publisher folder**:
* Navigate to the **subscriber** dir of this project via terminal
* Type `npm i`
* Run `npm run serve:mqtt` or `npm run serve:ws`, depending on the protocol you want to use
