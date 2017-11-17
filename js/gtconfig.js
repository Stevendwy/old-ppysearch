/**
 * Created by Zwei on 2017/7/12.
 */
var captchaObj = null
var gtUrl = "/geetest/verification?t=1499841199411"
function createGT() {
    getAjax(gtUrl, {}, function(res) {
        initGeetest({
            // 以下配置参数来自服务端 SDK
            gt: res.gt,
            challenge: res.challenge,
            offline: !res.success,
            new_captcha: res.new_captcha
        }, function (obj) {
            captchaObj = obj //获取并绑定
            configGT()
        })
    }, true)
}

var hasGT = false

function configGT() {
    var cgt = document.getElementById('container-gt')
    cgt.style.display = 'flex'
    var pg = document.getElementById('play-gt')
    if(!hasGT) {
        captchaObj.appendTo(pg)
        hasGT = true
    }

    captchaObj.onSuccess(function() {
        setTimeout(function() {
            pg.innerHTML = ''
            cgt.style.display = 'none'
            hasGT = false
        }, 2000)

        var result = captchaObj.getValidate()

        postAjax('/geetest/validate', {
            // 其他服务端需要的数据，比如登录时的用户名和密码
            geetest_challenge: result.geetest_challenge,
            geetest_validate: result.geetest_validate,
            geetest_seccode: result.geetest_seccode,
        }, function (data) {
            // 根据服务端二次验证的结果进行跳转等操作
            if(data.code === 1) location.href = data.url
        })
    })
}
