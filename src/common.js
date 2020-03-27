import marked from 'marked'
export default{
  replaceImgUrl: function(text) {
    return text.replace(/(https:\/\/static.autre.cn\/usr\/uploads\/)[a-zA-Z0-9/]+(\.jpg)/g, '$&'+'!post')
  },
  replaceFirstImgUrl: function(text) {
    return text ? text + '!index' : ''
  },
  markdown: function (text,isMarkdown) {
    //if(isMarkdown == true){
        if(text){
            text = marked(text, { sanitize: true })
            return this.replaceImgUrl(text)
        }
        return text
    //}
    
  },
  formatDate: function(time) {
    var timeNow = parseInt(new Date().getTime() / 1000)
    var postTime = Number(time)
    var dtime = timeNow-postTime
    if(dtime<=0){
        return '刚刚'
    }else if(dtime<60){
        return dtime+'秒前'
    }else if(dtime<3600){
        return Math.ceil(dtime/60)+'分钟前'
    }else if(dtime<86400){
        return Math.ceil(dtime/60/60)+'小时前'
    }else if(dtime<259200){
        return Math.ceil(dtime/60/60/24)+'天前'
    }
    var date = new Date(postTime*1000)
    var fmt = 'yyyy-MM-dd hh:mm'
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
        }
    }
    return fmt
  },
  login: function(that){
    window.addEventListener('storage', function(e){
      if(e.key == 'autre_user_login_code'){
        var code = e.newValue
        localStorage.removeItem(e.key)
        that.$store.dispatch('getuserInfo',code)
      }
    })
    var url = window.location.href
    var reurl = "https://autre.cn/login.html"
    if (url.indexOf('autre.cn') == -1) {
      reurl = "https://autre.me/login.html"
    }
    window.open ("https://api.weibo.com/oauth2/authorize?client_id=1538295229&response_type=code&redirect_uri="+reurl, "loginpage", "height=300, width=400, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
  },
  commentstatus: function(status){
    if('waiting' == status){
        return '审核中'
    }else if('approved' == status){
        return ''
    }
    return ''
  },
  setTitle: function(title) {
    title = title ? title + ' - 向左向右' : '向左向右'
    window.document.title = title 
  }
}