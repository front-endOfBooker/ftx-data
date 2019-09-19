<template>
    <div class="h100">
        <el-container class="h100">
            <el-aside width="200px" style="background: rgba(65,176,255,.3);box-shadow: 0 -1px 0 0 rgba(65,175,255,.4);">
                <div style="height: 60px"></div>
                <el-menu>
                    <!-- <el-menu-item index="1" @click="checkItem(1)">
                    <i class="el-icon-s-data"></i>
                    <span>发布列表</span>
                    </el-menu-item> -->
                    <el-menu-item index="2" @click="checkItem(2)">
                        <i class="el-icon-data-board"></i>
                        <span>数据统计</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="checkItem(3)">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span>数据总表</span>
                    </el-menu-item>
                    <!-- <el-submenu>
                        <template slot="title">
                            <i class="el-icon-picture-outline-round"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <i class="el-icon-more"></i>
                                数据总表
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu> -->
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">Header</el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <!-- <el-footer>Footer</el-footer> -->
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
        case 3:
          this.$router.push({ name: "dataAll" });
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.el-aside {
    color: #333;
    box-shadow: 2px 0 6px rgba(0,21,41,.35)!important;
    background-color: #001529!important;
    transition: all 0.2s;
    .el-submenu__title {
        text-align: left;
        font-size: 14px;
    }
}
</style>
