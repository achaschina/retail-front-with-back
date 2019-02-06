<template>
  <div>
    <b-jumbotron :header="msg" lead>
      <b-container class="bv-row" fluid>
        <b-row class="mb-2">
          <b-col style="display: flex;">
            <canvas id="planet-chart"></canvas>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script>
import Chart from "chart.js";
import planetChartData from "../../utilities/chart-data.js";
export default {
  data() {
    return {
      planetChartData: planetChartData
    };
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    this.createChart("planet-chart", this.planetChartData);
  }
};
</script>

<style scoped>
.jumbotron {
  display: flex;
  height: 89vh;
}
</style>
