<template>
  <div class="graph">
    <canvas id="grafico" ref="ctx" width="800" height="450"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "Graph",
  props: {
    dataset: Object
  },
  methods: {
    getColor: function(index) {
      switch (index) {
        case 0:
          return "yellow";
        case 1:
          return "red";
        case 2:
          return "green";
      }
    },
    getLabels: function() {
      const n = this.dataset.speed.length,
        labels = [];
      for (let i = 0; i < n; i++) {
        labels.push(i);
      }
      return labels;
    }
  },
  data: function() {
    return {
      id: "grafico",
      graph: null
    };
  },
  watch: {
    dataset: function() {
      this.graph = new Chart(document.getElementById(this.id), {
        type: "line",
        data: {
          labels: this.getLabels(),
          datasets: Object.keys(this.dataset).map((key, index) => {
            return {
              data:
                key === "brake"
                  ? this.dataset[key].map(v => v * 20)
                  : this.dataset[key],
              label: key,
              borderColor: this.getColor(index),
              fill: true
            };
          })
        },
        options: {
          animation: false,
          title: {
            display: true,
            text: "Grafico"
          }
        }
      });
    }
  },
  mounted: function() {
    this.graph = new Chart(document.getElementById(this.id), {
      type: "line",
      data: {
        labels: this.getLabels(),
        datasets: Object.keys(this.dataset).map((key, index) => {
          return {
            data:
              key === "brake"
                ? this.dataset[key].map(v => v * 20)
                : this.dataset[key],
            label: key,
            borderColor: this.getColor(index),
            fill: true
          };
        })
      },
      options: {
        animation: false,
        title: {
          display: true,
          text: "Grafico"
        }
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
