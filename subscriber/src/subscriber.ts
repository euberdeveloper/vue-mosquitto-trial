import { connect, MqttClient } from 'mqtt';

export class MqttSub {

    private client: MqttClient;
    private topic: string;

    private init(uri: string): void {
        this.client = connect(uri);
        this.client.on('connect', () => {
            this.connected();
        });
    }

    private connected(): void {
        console.log('Connected!!!');
        this.subscribe();
    }

    private subscribe(): void {
        //To start subscribing, the callback is fired only once
        this.client.subscribe(this.topic, (error, granted) => {
            if(error) {
                console.error('Not subscribed', error);
            }
            else {
                console.log(granted);
            }
        });
        //On every message
        this.client.on('message', (topic, message) => {
            if(topic === 'chimera') {
                console.log(message.toString());
            }
        });
    }

    constructor(uri: string, topic: string) {
        this.topic = topic;
        this.init(uri);
    }

}