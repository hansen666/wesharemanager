<template>
  <div class="user-detail">
    <div class="user-info">
      <h2>基本信息</h2>
      <el-table
        :data="userInfo"
        border
        style="width: 100%"
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
              preview
              preview-text="描述"
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
          prop="phone"
          label="手机号"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="wxNumber"
          label="微信号"
          width="100"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="user-publish">
      <h2>我的发布</h2>
      <el-table
        :data="userPublish"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="物品名称"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="picUrl"
          label="图片"
          width="250"
        >
          <template
            slot-scope="scope"
            class="picUrl"
          >
            <img
              v-for="url in scope.row.picUrl"
              :key="url"
              :src="remote_static+'/publish/'+url"
              min-width="50"
              height="60"
              style="margin-right:10px"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="120"
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
      </el-table>
    </div>
    <div class="user-wanted">
      <h2>我的心愿</h2>
      <el-table
        :data="userWanted"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="物品名称"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="picUrl"
          label="图片"
          width="250"
        >
          <template
            slot-scope="scope"
            class="picUrl"
          >
            <img
              v-for="url in scope.row.picUrl"
              :key="url"
              :src="remote_static+'/want/'+url"
              min-width="50"
              height="60"
              style="margin-right:10px"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="120"
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
      </el-table>
    </div>
    <div class="user-collections">
      <h2>我的收藏</h2>
      <el-table
        :data="userCollections"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="物品名称"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="picUrl"
          label="图片"
          width="250"
        >
          <template
            slot-scope="scope"
            class="picUrl"
          >
            <img
              v-for="url in scope.row.picUrl"
              :key="url"
              :src="remote_static+'/publish/'+url"
              min-width="50"
              height="60"
              style="margin-right:10px"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="120"
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
      </el-table>
    </div>
    <div class="user-sold">
      <h2>我售出的</h2>
      <el-table
        :data="userSold"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="物品名称"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="picUrl"
          label="图片"
          width="250"
        >
          <template
            slot-scope="scope"
            class="picUrl"
          >
            <img
              v-for="url in scope.row.picUrl"
              :key="url"
              :src="remote_static+'/publish/'+url"
              min-width="50"
              height="60"
              style="margin-right:10px"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="120"
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
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      userInfo: [],
      userSold: [],
      userWanted: [],
      userPublish: [],
      userCollections: []
    }
  },
  created() {
    var id = this.$route.query.id
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData(id)
  },
  computed: {
    ...mapState(
      ['localhost', 'remote_static']
    )
  },
  methods: {
    fetchData(id) {
      this.$http.get(`${this.localhost}/admin/userFullInfo`, {
        params: { id: id }
      }).then(
        result => {
          this.userInfo = [result.data.data]
          this.userInfo[0].identifiedType = this.getLabelByIdentifiedType(this.userInfo[0].identifiedType)
          console.log(this.userInfo)
        },
        err => {
          console.log(err)
        }
      )
      this.$http.get(`${this.localhost}/admin/userSold`, {
        params: { id: id }
      }).then(
        result => {
          this.userSold = result.data.data
          if (this.userSold) {
            for (var i = 0; i < this.userSold.length; i++) {
              this.userSold[i].picUrl = this.userSold[i].picUrl.split(',')
            }
          }
        },
        err => {
          console.log(err)
        }
      )
      this.$http.get(`${this.localhost}/admin/userCollections`, {
        params: { id: id }
      }).then(
        result => {
          this.userCollections = result.data.data
          if (this.userCollections) {
            for (var i = 0; i < this.userCollections.length; i++) {
              this.userCollections[i].picUrl = this.userCollections[i].picUrl.split(',')
            }
          }
        },
        err => {
          console.log(err)
        }
      )
      this.$http.get(`${this.localhost}/admin/userWanted`, {
        params: { id: id }
      }).then(
        result => {
          this.userWanted = result.data.data
          if (this.userWanted) {
            for (var i = 0; i < this.userWanted.length; i++) {
              this.userWanted[i].picUrl = this.userWanted[i].picUrl.split(',')
            }
          }
        },
        err => {
          console.log(err)
        }
      )
      this.$http.get(`${this.localhost}/admin/userPublish`, {
        params: { id: id }
      }).then(
        result => {
          this.userPublish = result.data.data
          if (this.userPublish) {
            for (var i = 0; i < this.userPublish.length; i++) {
              this.userPublish[i].picUrl = this.userPublish[i].picUrl.split(',')
            }
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    getLabelByIdentifiedType(identifiedType) {
      if (identifiedType === 0) {
        return '未认证'
      } else {
        return '已认证'
      }
    },
  }
}
</script>

<style scoped>
.picUrl {
  display: flex;
}
</style>
