<template>
  <div>
    <h3 style="text-align: left;margin-bottom: 20px;"><i class="el-icon-setting" style="margin-right: 10px;" />应用上传</h3>

    <el-form ref="form" :model="form" label-width="100px">
      <!-- <el-col :span="13">
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col> -->

      <el-col :span="13">
        <el-form-item class="w60" label="版本详情" prop="repoDetail">
          <el-input placeholder="请输入版本详情" v-model="form.repoDetail" size="small"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="13">
        <el-form-item class="w60" label="应用环境" prop="environment">
          <el-select v-model="form.environment" placeholder="请选择应用环境" style="width: 100%;" size="small">
            <el-option label="测试版本" value="1"></el-option>
            <el-option label="预发布版本" value="2"></el-option>
            <el-option label="正式版本版本" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="13">
        <el-form-item class="w60" label="应用类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择应用类型" style="width: 100%;" size="small">
            <el-option label="android" value="shanghai"></el-option>
            <el-option label="pc-mac" value="beijing"></el-option>
            <el-option label="pc-win" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <!-- <el-col :span="13">
        <el-upload
          class="upload-box"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">上传不超过500kb</div>
        </el-upload>
      </el-col> -->

      <el-col :span="13">
        <el-upload
          class="upload-box w60"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
          <span slot="tip" class="el-upload__tip" style="margin-left: 30px;">上传文件超过500kb</span>
        </el-upload>
      </el-col>
    
      <el-col :span="13" style="margin-top: 50px;">
        <el-form-item class="w60">
          <el-button type="primary" @click="onSubmit">立即上传</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-col>
    </el-form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          environment: '',
          type: '',
          repoDetail: ''
        },
        rules: {
          environment: [
            { required: true, message: '请选择应用环境', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择应用类型', trigger: 'change' }
          ],
          repoDetail: [
            { required: true, message: '请输入版本详情', trigger: 'change' }
          ],
        },
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      onSubmit() {
        this.submitUpload()
        console.log('submit!');
      }
    }
  }
</script>

<style>
.upload-box > ul {
  margin-top: 20px;
}
</style>

<style scoped>
.upload-box {
  text-align: left;
  padding: 20px 0 0 35px;
  box-sizing: border-box;
}
</style>