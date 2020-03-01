import router from './router'
router.beforeEach(function (to, from, next) {
  // 如果要去的地址以/home为起始，就说明需要判断当前是不是登录，判断token
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('token')
    // 如果有token,放行。如果没有就跳转到登陆页
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
