import useUserStore from '../store/user/index'
const login = () => {
    window.addEventListener('storage', function (e) {
        if (e.key == 'autre_user_login_code') {
            const code = e.newValue
            localStorage.removeItem(e.key)
            useUserStore().getUserInfo(code)
        }
    })
    var url = window.location.href
    var reurl = "https://autre.cn/login.html"
    if (url.indexOf('autre.cn') == -1) {
        reurl = "https://autre.me/login.html"
    }
    window.open("https://api.weibo.com/oauth2/authorize?client_id=1538295229&response_type=code&redirect_uri=" + reurl, "loginpage", "height=300, width=400, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
}

export default login