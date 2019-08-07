<template>
  <div>
    <el-container ref="colContainer" style="height: 500px;">
      <!-- <el-container style="height: 500px; border: 1px solid #eee"> -->
      <el-header style="text-align: right; font-size: 12px">
        <!-- <img class="fl" style="margin: 10px" width="150" src="../assets/img/logo.png" alt="">
        <span style="float: left; font-size: 24px;font-weight: 450">运维平台</span>-->
        <el-dropdown>
          <!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
          <span class="el-dropdown-link">欢迎 | json</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-container>
        <el-aside
          width="200px"
          style="background: rgba(65,176,255,.3);box-shadow: 0 -1px 0 0 rgba(65,175,255,.4);"
        >
          <el-menu>
            <el-menu-item index="1" @click="checkItem(1)">
              <i class="el-icon-s-data"></i>
              <span>发布列表</span>
            </el-menu-item>
            <el-menu-item index="2" @click="checkItem(2)">
              <i class="el-icon-data-board"></i>
              <span>操作历史</span>
            </el-menu-item>
            <!-- <el-menu-item index="2" @click="checkItem(1)">
              <i class="el-icon-circle-plus-outline"></i>
              <span>添加仓库</span>
            </el-menu-item>
            <el-menu-item index="3" @click="checkItem(3)">
              <i class="el-icon-data-board"></i>
              <span>操作历史</span>
            </el-menu-item>
            <el-menu-item index="4" @click="checkItem(4)">
              <i class="el-icon-upload"></i>
              <span>应用上传</span>
            </el-menu-item>
            <el-menu-item index="5" @click="checkItem(5)">
              <i class="el-icon-s-custom"></i>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="6" @click="checkItem(6)">
              <i class="el-icon-bell"></i>
              <span>用户提醒</span>
            </el-menu-item>-->
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    clientHeight() {
      return (
        document.documentElement.clientHeight || document.body.clientHeight
      );
    }
  },
  mounted() {
    this.$refs.colContainer.$el.style.height = this.clientHeight + "px";
  },
  methods: {
    checkItem(type) {
      switch (type) {
        case 1:
          this.$router.push({ name: "dataTable" });
          break;
        case 2:
          this.$router.push({ name: "dataShow" });
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #3eafff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
