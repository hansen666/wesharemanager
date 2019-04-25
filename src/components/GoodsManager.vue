<template>
  <div class="user-manager">
    <el-form
      :model="formInline"
      class="my-form"
    >
      <el-form-item
        label="物品名称"
        class="my-form-item"
      >
        <el-input
          v-model="formInline.goodsName"
          placeholder="物品名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="用户名"
        class="my-form-item"
      >
        <el-input
          v-model="formInline.nickname"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="学校"
        class="my-form-item"
      >
        <el-input
          v-model="formInline.schoolName"
          placeholder="学校"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="类别"
        class="my-form-item"
      >
        <el-select v-model="formInline.flag">
          <el-option
            v-for="item in flags"
            :key="item.value"
            :value="item.label"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="分类标签"
        class="my-form-item"
      >
        <el-select v-model="formInline.label">
          <el-option
            v-for="item in labels"
            :key="item.value"
            :value="item.label"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="状态"
        class="my-form-item"
      >
        <el-select v-model="formInline.status">
          <el-option
            v-for="item in allStatus"
            :key="item.value"
            :value="item.label"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="日期"
        class="my-form-item"
      >
        <el-date-picker
          v-model="formInline.date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="my-form-item">
        <el-button
          type="primary"
          @click="getGoodsList"
          class="search"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="400"
    >
      <el-table-column
        prop="name"
        label="物品名称"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="用户昵称"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="picUrl"
        label="图片"
        width="100"
      >
        <template
          slot-scope="scope"
          class="picUrl"
        >
          <img
            :src="remote_static+'/'+type+'/'+scope.row.picUrl"
            min-width="30"
            height="30"
            style="margin-right:10px"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="schoolName"
        label="学校"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="label"
        label="类别"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="pubTime"
        label="发布时间"
        width="100"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="100"
        layout="total, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'userManager',
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      formInline: {
        goodsName: '',
        nickname: '',
        schoolName: '',
        label: '全部',
        status: '全部',
        date: '',
        flag: '二手物'
      },
      allStatus: [
        {
          value: 3,
          label: '全部'
        }, {
          value: 0,
          label: '审核中'
        }, {
          value: 1,
          label: '在架上'
        },
        {
          value: 2,
          label: '已售出'
        }
      ],
      labels: [
        {
          value: 0,
          label: '全部'
        }, {
          value: 1,
          label: '其它'
        }, {
          value: 2,
          label: '书籍'
        },
        {
          value: 3,
          label: '衣物'
        }, {
          value: 4,
          label: '数码产品'
        }, {
          value: 5,
          label: '生活用品'
        },
        {
          value: 6,
          label: '电子产品'
        }
      ],
      flags: [
        {
          value: 0,
          label: '二手物'
        }, {
          value: 1,
          label: '心愿'
        }
      ],
      type: 'publish',
      currentPage: 0,
      startDate: '',
      endDate: '',
      tableData: []
    }
  },
  created() {
    this.getGoodsList()
  },
  computed: {
    getTableData() {
      return this.tableData
    },
    ...mapState([
      'localhost', 'remote_static'
    ])
  },
  methods: {
    getGoodsList() {
      if (this.formInline.date) {
        this.startDate = this.formInline.date[0]
        this.endDate = this.formInline.date[1]
      }
      this.tableData = []
      this.$http.post(`${this.localhost}/admin/goodsRecord`, {
        goodsName: this.formInline.goodsName,
        nickname: this.formInline.nickname,
        schoolName: this.formInline.schoolName,
        label: this.getLabelByName(this.formInline.label),
        status: this.getStatusByName(this.formInline.status),
        currentPage: this.currentPage,
        startDate: this.startDate,
        endDate: this.endDate,
        flag: this.getFlagByName(this.formInline.flag)
      }).then(result => {
        this.tableData = result.data.data
        console.log(this.tableData)
        if (this.formInline.flag == '二手物') {
          this.type = 'publish'
        } else {
          this.type = 'want'
        }
        if (this.tableData) {
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].picUrl = this.tableData[i].picUrl.split(',')[0]
            this.tableData[i].status = this.getNameByStatus(this.tableData[i].status)
            this.tableData[i].label = this.getNameByLabel(this.tableData[i].label)
          }
        }
      }, error => {
        console.log(error)
      })
    },
    getNameByLabel(value) {
      let type
      this.labels.forEach((item) => {
        if (item.value === value) {
          type = item.label
        }
      })
      return type
    },
    getNameByStatus(value) {
      let type
      this.allStatus.forEach((item) => {
        if (item.value === value) {
          type = item.label
        }
      })
      return type
    },
    getNameByFlag(value) {
      let type
      this.flags.forEach((item) => {
        if (item.value === value) {
          type = item.label
        }
      })
      return type
    },
    getLabelByName(label) {
      let type
      this.labels.forEach((item) => {
        if (item.label === label) {
          type = item.value
        }
      })
      return type
    },
    getStatusByName(label) {
      let type
      this.allStatus.forEach((item) => {
        if (item.label === label) {
          type = item.value
        }
      })
      return type
    },
    getFlagByName(label) {
      let type
      this.flags.forEach((item) => {
        if (item.label === label) {
          type = item.value
        }
      })
      return type
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped>
.user-manager {
  width: 100%;
}
.my-form {
  display: flex;
  flex-wrap: wrap;
}
.my-form .my-form-item {
  display: flex;
  margin-right: 20px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
