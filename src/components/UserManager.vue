<template>
  <div class="user-manager">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline my-form"
    >
      <el-form-item label="用户名">
        <el-input
          v-model="formInline.user"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="认证类型">
        <el-select
          v-model="formInline.region"
          placeholder="认证类型"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.label"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="getUserList"
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
        fixed
        prop="nickname"
        label="昵称"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="avatarUrl"
        label="头像"
        width="150"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.avatarUrl"
            min-width="30"
            height="30"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="realName"
        label="姓名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="schoolName"
        label="学校"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="identifiedType"
        label="认证状态"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="最近活跃时间"
        width="200"
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
          <el-button
            type="text"
            size="small"
          >加入黑名单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="7"
        layout="total, prev, pager, next, jumper"
        :total="userCount"
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
      formInline: {
        user: '',
        region: '全部'
      },
      options: [{
        value: '2',
        label: '全部'
      }, {
        value: '0',
        label: '未认证'
      }, {
        value: '1',
        label: '已认证'
      }],
      userCount: 0,
      currentPage: 0,
      tableData: []
    }
  },
  created() {
    this.getUserList()
  },
  computed: {
    ...mapState([
      'localhost'
    ])
  },
  methods: {
    getUserList() {
      this.$http.get(`${this.localhost}/admin/getUserList`, {
        params: {
          type: this.getTypeByLabel(this.formInline.region),
          currentPage: this.currentPage,
          nickname: this.formInline.user
        }
      }).then(result => {
        this.tableData = result.data.data.userList
        this.userCount = result.data.data.count
        this.tableData.forEach(item => {
          item.identifiedType = this.getLabelByIdentifiedType(item.identifiedType)
        })
      }, error => {
        console.log(error)
      })
    },
    getTypeByLabel(label) {
      let type
      this.options.forEach((item) => {
        if (item.label === label) {
          type = item.value
        }
      })
      return type
    },
    getLabelByIdentifiedType(identifiedType) {
      if (identifiedType === 0) {
        return '未认证'
      } else {
        return '已认证'
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val - 1
      this.getUserList()
    },
    handleClick(val) {
      this.$router.push({ path: '/home/userDetail', query: { id: val.id } })
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
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
