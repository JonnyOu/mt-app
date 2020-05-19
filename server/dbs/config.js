export default {
    dbs: 'mongodb://127.0.0.1:27017/student',
    redis: {
        get host() {
            return '127.0.0.1'
        },
        get port() {
            return 6379
        }
    },
    smtp: { // 邮箱配置
        get host() {
            return 'smtp.qq.com'
        },
        get user() {
            return '1647063649@qq.com'
        },
        get pass() { // 个人授权码
            return 'qmxdthvgpjzhbfgh'
        },
        get code() { // 生成验证码
            return () => {
                return Math.random().toString(16).slice(2,6).toLocaleUpperCase()
            }
        },
        get expire() { // 设置有效时间
            return () => {
                return new Date().getTime()+60*60*1000
            }
        }
    }

}