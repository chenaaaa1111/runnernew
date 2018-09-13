function request(sendData,url){
  var sd = sendData.assign({}, { token: "123" }, sendData);
}
function requestLogin(data,callback){
    wx.request({
      url: 'http://106.14.153.111:8080/sport/user/user',	
      data: data,
      method:"GET",
      success:function(res){
              console.log(res);
              callback(res);

      }
    })
}
function request(data, url,callBack,method){
  var token = wx.getStorageSync('token');

  var sendData = Object.assign({ token: token},data)
    wx.request({
      url: url,
      data: sendData,
      header: { 'Cookie': "JSESSIONID="+wx.getStorageSync('sessionId') },
      method:method,
      success:function(res){
        callBack(res);
      }
    })
}

function requestbaner(sendData,callback,methed){
  request(sendData, 'http://106.14.153.111:8080/sport/carousel/carousel', callback, methed)
}
function Req(){
  var self=this;
  function request(url, data,callback,methd){
    self.apiurl ='http://106.14.153.111:8080';
    var token = wx.getStorageSync('token');
    var sendData = Object.assign({ 'token': token }, data)

     wx.request({
        url: self.apiurl+url,
        data: sendData,
        header: { 'Cookie': "JSESSIONID=" + wx.getStorageSync('sessionId') },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            callback(res);
          },
          fail: function(res) {},
          complete: function(res) {},
        })
    }
    function test(){
      console.log(22);
    }
  this.requstImages= function (sendData,callBack){
    request('url',sendData,callBack,"Get");
  }
  this.requestRunnerber = function (callBack){
    wx.getWeRunData({
      success:function(res){
        console.log(res);
        var sendData = {
          data: res.encryptedData,
          iv: res.iv
        }
        request('/sport/pedometer/pedometer', sendData, callBack, "Get");
      }
    })
    //获取步数
    
 }
 this.requestForWho=function(sendData,callback){
   //返回为谁而跑				
   request('/sport/forRun/torun', sendData, callBack, "Get");
 }
 this.addForWho=function(sendData,callBack){
   //添加为谁而跑
   request('/sport/forRun/addrun', sendData, callBack, "Get");
 }
 this.requestThenms = function (sendData, callBack) {
   //添加为谁而跑
   request('/sport/meal/page', sendData, callBack, "Get");
 }
 this.requestrunImage = function (sendData, callBack){
   request('/sport/meal/xz', sendData, callBack, "Get");
 }
 //获取跑步的图片
  this.requestImageRun = function (sendData, callBack){
    request('/sport/forRun/sm', sendData, callBack, "Get");
 }
  this.reqaddforwho = function (sendData, callBack) {
    request('/sport/forRun/addrun', sendData, callBack, "Get");
  }
  this.reqaddImage = function (sendData, callBack) {
    //添加套餐
    request('/sport/meal/gorun', sendData, callBack, "Get");
  }
}
var req = new Req();
 module.exports={
   requestLogin, requestbaner, req
}