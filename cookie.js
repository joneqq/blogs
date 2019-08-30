class CookirControl {
    constructor(){
        this.tokenArr = []
    }
    getToken(){
        var token = "";
        var str = '13654879sdas89das9f7454sdf76a8sdf4asdf798as7df'
        //位数
        for(var i = 0; i < 18 ;i ++){
            if(i%5 == 0 && i != 0){
                token += '-'
            }
            token += str[parseInt(Math.random()*str.length)]
        }
        this.tokenArr.push(token)
        return token
    }
    checkToken(token){
        for(var i = 0; i < this.tokenArr.length ;i ++){
            if(this.tokenArr[i] == token){
                return true
            }          
        }
        return false
    }
    removeToken(token){
        for(var i = 0; i < this.tokenArr.length ;i ++){
            if(this.tokenArr[i] == token){
                this.tokenArr.splice(i,1); ////从i删除1各单位
                return true
            }          
        }
        return false
    }
}

// var t = new cookieControl()
// var c = t.getToken()
// 生成token
// console.log(
//     t.getToken()
// )
// 检查token
// console.log(
//     t.checkToken(c)
// )

module.exports = CookirControl