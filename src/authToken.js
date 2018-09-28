
module.exports = {
    
    request: function (req, token) {
        // console.log(token)
        var index = req.url.lastIndexOf("/");
        var route = 'api/'+req.url.substr(index+1);
        let timestamp = Date.parse(new Date());
        let RndNum = function (t) {
            let rnd = "";
            for (let i = 0; i < t; i++)
                rnd += Math.floor(Math.random() * 10);
            return rnd;
        }
        let echostr = RndNum(20);
        let signature = this.options.md5("vRCouDfRNin1tgr14lyU4djkKj2eKtCU" + echostr + timestamp + route + "web");
 

        this.options.http._setHeaders.call(this, req, {
            Authorization: 'Bearer ' + token,
            "api-access-key": "dSuJBDYUebrW0yyKhLN0MRO2m4iPaFde",
            "api-echostr": echostr,
            "api-signature": signature,
            "api-timestamp": timestamp,
            "Accept": "application/vnd.Peripheralclassroom.v1+json"
        });
    },
    
    response: function (res) {
        console.log(res)
        if(res.data.code == -4001){ 
            var _this = this;
            var clear = function (){
                _this.options.__cookie.remove.call(_this, 'rememberMe'); 
                _this.options.__cookie.remove.call(_this, _this.options.tokenImpersonateName);
                _this.options.__cookie.remove.call(_this, _this.options.tokenDefaultName); 
                _this.options.__token.remove.call(_this, _this.options.tokenImpersonateName);
                _this.options.__token.remove.call(_this, _this.options.tokenDefaultName);
                _this.watch.authenticated = false;
                _this.watch.data = null;
                _this.options.router._routerGo.call(_this, "/login");
            }
            this.options.axios.post("logout",{},{headers:this.options.setHeaders("api/logout")}).then(res=>{
                clear();
            }).catch(err=>{
                clear();
            }) 
        }
        var headers = this.options.http._getHeaders.call(this, res),
            token = headers.Authorization || headers.authorization;

        if (token) {
            token = token.split(/Bearer\:?\s?/i);
            
            return token[token.length > 1 ? 1 : 0].trim();
        }
    }
};