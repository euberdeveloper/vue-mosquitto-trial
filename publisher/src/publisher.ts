import { connect, MqttClient } from 'mqtt';

export class MqttPub {

    private client: MqttClient;
    private topic: string;
    private interval: number;

    private init(uri: string): void {
        this.client = connect(uri);
        this.client.on('connect', () => {
            this.connected();
        });
    }

    private connected(): void {
        console.log('Connected!!!');
        this.publish();
    }

    private randomRange(min: number, max: number): number {
        return (Math.random() * (max - min) + min);
    }

    get message() {
        const latitude = this.randomRange(-100, 100);
        const longitude = this.randomRange(-100, 100);
        const elevation = this.randomRange(-10, 10);
        const speed = this.randomRange(0, 50);
        const odometry = this.randomRange(0, 100);
        const steering_angle = this.randomRange(-20, 20);
        const throttle = this.randomRange(0, 1);
        const brake = this.randomRange(0, 1);
        const x_a = this.randomRange(-0.5, 0.5);
        const y_a = this.randomRange(-.05, 0.5);
        const z_a = this.randomRange(-0.1, 0.1);
        const x_b = this.randomRange(-0.5, 0.5);
        const y_b = this.randomRange(-0.5, 0.5);
        const z_b = this.randomRange(-0.1, 0.1);
        const x_c = this.randomRange(-3, 3);
        const y_c = this.randomRange(-3, 3);
        const z_c = this.randomRange(-3, 3);
        const voltage = this.randomRange(300, 400);
        const current_a = this.randomRange(1.0, 1.1);
        const current_b = this.randomRange(1.0, 1.1);
        const current_c = this.randomRange(1.0, 1.1);
        const temperature_a = this.randomRange(37, 47);

        return JSON.stringify({
            latitude,
            longitude,
            elevation,
            speed, 
            odometry,
            steering_angle,
            throttle,
            brake,
            x_a,
            y_a,
            z_a,
            x_b,
            y_b,
            z_b,
            x_c,
            y_c,
            z_c,
            voltage,
            current_a,
            current_b,
            current_c,
            temperature_a
        });
    }

    private publish(): void {
        const cb = (error, _packet) => {
            if(error) {
                console.error('Not published', error);
            }
            else {
                console.log('Published');
            }
        }
        setInterval(() => { this.client.publish(this.topic, this.message, cb) }, this.interval);
    }

    constructor(uri: string, topic: string, interval: number) {
        this.topic = topic;
        this.interval = interval;
        this.init(uri);
    }

}