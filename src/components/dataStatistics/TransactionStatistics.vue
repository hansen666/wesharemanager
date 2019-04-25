<template>
  <div class="user-statistics">
    <div class="container">
      <div class="block">
        <el-date-picker
          v-model="year"
          type="year"
          value-format="yyyy"
          placeholder="选择年"
        >
        </el-date-picker>
        <el-button
          type="primary"
          class="button"
          @click="getMonthStatistics"
        >按月统计</el-button>
      </div>
      <div class="block">
        <el-date-picker
          v-model="month"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月"
        >
        </el-date-picker>
        <el-button
          type="primary"
          class="button"
          @click="getDayStatistics"
        >按天统计</el-button>
      </div>
    </div>
    <div
      class="user-content"
      v-if="showCharts"
    >
      <div class="total-count">
        总数:{{totalCount}}
      </div>
      <ve-histogram
        :data="chartData"
        :extend="extend"
      ></ve-histogram>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    this.extend = {
      series: {
        label: { show: true, position: "top" }
      }
    }
    return {
      year: '',
      month: '',
      showCharts: false,
      totalCount: 0,
      chartData: {
        columns: ['month', 'count'],
        rows: []
      }
    }
  },
  computed: {
    ...mapState([
      'localhost'
    ])
  },
  methods: {
    getMonthStatistics() {
      var that = this
      this.showCharts = true
      this.chartData.columns[0] = 'month'
      if (this.year) {
        this.$http.get(`${this.localhost}/admin/monthlyGoodsTransactionQuantity`, {
          params: {
            year: this.year
          }
        }).then(
          result => {
            that.chartData.rows = result.data.data
            that.totalCount = 0
            that.chartData.rows.forEach(item => {
              that.totalCount += item.count
            })
          },
          err => {

          }
        )
      } else {
        this.$message('请选择年份')
      }
    },
    getDayStatistics() {
      var that = this
      this.showCharts = true
      this.chartData.columns[0] = 'day'
      if (this.month) {
        const [year, month] = this.month.split('-')
        console.log(year, month)
        this.$http.get(`${this.localhost}/admin/dailyGoodsTransactionQuantity`, {
          params: {
            year: year,
            month: month
          }
        }).then(
          result => {
            that.chartData.rows = result.data.data
            that.totalCount = 0
            that.chartData.rows.forEach(item => {
              that.totalCount += item.count
            })
          },
          err => {

          }
        )
      } else {
        this.$message('请选择月份')
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
}
.block {
  margin-right: 30px;
}
.block .button {
  margin-left: 20px;
}
.user-content .total-count {
  text-align: right;
}
</style>
