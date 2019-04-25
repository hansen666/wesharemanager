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
        二手物总数：{{goodsTotalCount}}<br />
        心愿总数：{{wishTotalCount}}
      </div>
      <ve-histogram
        :data="chartData"
        :extend="extend"
        :settings="chartSettings"
      ></ve-histogram>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Promise, reject } from 'q';

export default {
  data() {
    this.extend = {
      series: {
        label: { show: true, position: "top" }
      }
    }
    this.chartSettings = {
      labelMap: {
        'goodsCount': '二手物',
        'wishCount': '心愿'
      }
    }
    return {
      year: '',
      month: '',
      showCharts: false,
      goodsTotalCount: 0,
      wishTotalCount: 0,
      chartData: {
        columns: ['month', 'goodsCount', 'wishCount'],
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
      this.chartData.columns[0] = 'month'
      that.chartData.rows = new Array(12)
      for (let i = 0; i < 12; i++) {
        that.chartData.rows[i] = {}
        that.chartData.rows[i].month = i + 1
      }
      if (this.year) {
        this.getMonthlyGoodsQuantityAsync()
      } else {
        this.$message('请选择年份')
      }
    },
    getDayStatistics() {
      var that = this
      this.chartData.columns[0] = 'day'
      if (this.month) {
        const [year, month] = this.month.split('-')
        this.getDailyGoodsQuantityAsync(year, month)
      } else {
        this.$message('请选择月份')
      }
    },
    async getMonthlyGoodsQuantityAsync() {
      this.showCharts = false
      await this.getMonthlyGoodsQuantity(this.year, 0)
      await this.getMonthlyGoodsQuantity(this.year, 1)
      this.showCharts = true
    },
    async getDailyGoodsQuantityAsync(year, month) {
      this.showCharts = false
      await this.getDailyGoodsQuantity(year, month, 0)
      await this.getDailyGoodsQuantity(year, month, 1)
      this.showCharts = true
    },
    getMonthlyGoodsQuantity(year, flag) {
      var that = this
      return new Promise((resolve, reject) => {
        this.$http.get(`${this.localhost}/admin/monthlyGoodsQuantity`, {
          params: {
            year: year,
            flag: flag
          }
        }).then(
          result => {
            if (flag === 0) {
              that.goodsTotalCount = 0
              for (let i = 0; i < 12; i++) {
                that.chartData.rows[i].goodsCount = result.data.data[i].count
                that.goodsTotalCount += result.data.data[i].count
              }
            } else {
              that.wishTotalCount = 0
              for (let i = 0; i < 12; i++) {
                that.chartData.rows[i].wishCount = result.data.data[i].count
                that.wishTotalCount += result.data.data[i].count
              }
            }
            resolve()
            err => {
              reject(err)
            }
          })
      })
    },
    getDailyGoodsQuantity(year, month, flag) {
      var that = this
      return new Promise((resolve, reject) => {
        this.$http.get(`${this.localhost}/admin/dailyGoodsQuantity`, {
          params: {
            year: year,
            month: month,
            flag: flag
          }
        }).then(
          result => {
            var length = result.data.data.length
            if (flag === 0) {
              that.chartData.rows = new Array(length)
              for (let i = 0; i < length; i++) {
                that.chartData.rows[i] = {}
                that.chartData.rows[i].day = i + 1
              }
              that.goodsTotalCount = 0
              for (let i = 0; i < length; i++) {
                that.chartData.rows[i].goodsCount = result.data.data[i].count
                that.goodsTotalCount += result.data.data[i].count
              }
            } else {
              that.wishTotalCount = 0
              for (let i = 0; i < length; i++) {
                that.chartData.rows[i].wishCount = result.data.data[i].count
                that.wishTotalCount += result.data.data[i].count
              }
            }
            resolve()
            err => {
              reject(err)
            }
          })
      })
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
.block .goodsLabel {
  margin-right: 20px;
}
.user-content .total-count {
  text-align: right;
}
</style>
