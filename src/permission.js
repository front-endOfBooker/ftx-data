import router from './router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'// 进度条样式


router.beforeEach((to, from, next) => {
  NProgress.start()
  let getFlag = localStorage.getItem("Flag");
  if(getFlag === "isLogin"){
    next()
    NProgress.done()
  }else{
    if (to.name == 'Login') {
      next()
      NProgress.done()
    } else {
      next({
        path: '/login'
      })
    }
  }
});
router.afterEach(route => {
  window.scroll(0, 0);
  NProgress.done()
});
