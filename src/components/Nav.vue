<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @select="handleSelect"
  >
    <el-menu-item index="1">
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="2">
      <span slot="title">物品管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <span slot="title">交易管理</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <span>数据统计</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1">用户统计</el-menu-item>
        <el-menu-item index="4-2">物品统计</el-menu-item>
        <el-menu-item index="4-3">交易统计</el-menu-item>
      </el-menu-item-group>

    </el-submenu>
    <el-menu-item index="5">
      <span slot="title">用户反馈</span>
    </el-menu-item>
    <el-menu-item index="6">
      <span slot="title">黑名单</span>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push('/home/userManager')
          break
        case '2':
          this.$router.push('/home/goodsManager')
          break
        case '3':
          this.$router.push('/home/transactionManager')
          break
        case '4-1':
          this.$router.push('/home/dataStatistics/userStatictics')
          break
        case '4-2':
          this.$router.push('/home/dataStatistics/goodsStatictics')
          break
        case '4-3':
          this.$router.push('/home/dataStatistics/transactionStatictics')
          break
        case '5':
          this.$router.push('/home/customerFeedBack')
          break
        case '6':
          this.$router.push('/home/blackList')
          break
      }
    }
  }
}
</script>
