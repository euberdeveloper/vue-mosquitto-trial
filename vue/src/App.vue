<template>
  <div id="app">
    <!-- <span>{{ dataset }}</span> -->
    <graph :dataset=dataset key="grafico"></graph>
  </div>
</template>

<script>
import Graph from "./components/Graph.vue";
import * as mqtt from "mqtt";

import * as config from "./config.json";
const conf = config.ws;

export default {
  name: "app",
  components: {
    Graph
  },
  data: function() {
    return {
      URI: `${conf.protocol}://${conf.host}:${conf.port}`,
      TOPIC: 'chimera',
      client: null,
      dataset: { speed: [], brake: [], voltage: [] }
    };
  },
  methods: {
    subscribe: function() {
      this.client.subscribe(this.TOPIC, (error, granted) => {
        if (error) {
          console.error('Not subscribed', error);
        } else {
          console.log('Subscribed');
        }
      });
      this.client.on('message', (topic, message) => {
        if (topic === this.TOPIC) {
          this.push(JSON.parse(message.toString()));
        }
      });
    },
    push: function(data) {
      const { speed, brake, voltage } = this.dataset;
      const { speed: newspeed, brake: newbrake, voltage: newvoltage } = data;
      this.dataset = {
        speed: [ ...speed, newspeed ],
        brake: [ ...brake, newbrake ],
        voltage: [ ...voltage, newvoltage ]
      };
    }
  },
  created: function() {
    this.client = mqtt.connect(this.URI);
    this.client.on("connect", () => {
      console.log('Connected');
      this.subscribe();
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>