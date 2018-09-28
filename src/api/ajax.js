import axios from 'axios'
import md5 from 'js-md5';

function getSig(route) {
  var echostr = "";
  for (var i = 0; i < 20; i++) {
    echostr += Math.floor(Math.random() * 10);
  }
  var timestamp = Date.parse(new Date());
  var sign = md5("vRCouDfRNin1tgr14lyU4djkKj2eKtCU" + echostr + timestamp + route + 'web');
  var header = {
    "api-access-key": "dSuJBDYUebrW0yyKhLN0MRO2m4iPaFde",
    "api-echostr": echostr,
    "api-signature": sign,
    "api-timestamp": timestamp,
    "Accept": "application/vnd.Peripheralclassroom.v1+json",
  };
  return header;
}

export default function ajax(url, data ={},type = 'GET') {

  var header = getSig(url.slice(1));
  if (type === 'GET') { 
      // 发送GET请求
    let paramStr = ''
    Object.keys(data).forEach(key => {
      paramStr += key + '=' + data[key] + '&'
    })
    if (paramStr) {
      paramStr = paramStr.substring(0, paramStr.length - 1)
    }
    return axios.get(url + '?' + paramStr,{headers:header})
  } else { // 发送POST请求
      return axios.post(url, data, { headers: header })
  }
}
