
function requestLogin(data,callback){
  // var 
  //   url= 'http://yundongkuka.com:8080/sport/user/user';
  var url ='http://106.14.153.111:8080/sport/user/user';
  try{
    wx.request({
      url:url,
      data: data,
      method: "GET",
      success: function (res) {
        console.log(res);
        callback(res);

      }
    })
  }catch(e){
    console.error(e)
  }
 
}
function request(url,data, callBack,method){
  var token = wx.getStorageSync('token');
  var apiurl = 'http://106.14.153.111:8080';
  url = apiurl+url;
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
  //var url = 'http://yundongkuka.com:8080/sport/carousel/carousel';
  var url = '/sport/carousel/carousel';
  request(url ,sendData, callback, methed)
}
function Req(){
  var self=this;
  function request(url, data, callback, methd) {
    //self.apiurl = 'http://yundongkuka.com:8080';
    self.apiurl = 'http://106.14.153.111:8080';
    console.log('url', self.apiurl + url)
    var token = wx.getStorageSync('token');
    var sendData = Object.assign({ 'token': token }, data)

    wx.request({
      url: self.apiurl + url,
      data: sendData,
      header: { 'Cookie': "JSESSIONID=" + wx.getStorageSync('sessionId') },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        callback(res);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  this.requstImages= function (sendData,callBack){
    request('url',sendData,callBack,"Get");
  }
  this.requestRunnerber = function(sdData,callBack){
    console.log('shushu', sdData);
    console.log(callBack)
    wx.getWeRunData({
      success:function(res){
        console.log(res);
        var sea = {
          data: res.encryptedData,
          iv: res.iv
        }
        var ssdata = Object.assign(sdData, sea)
        console.log('获取步数', sdData);
        request('/sport/pedometer/pedometer', ssdata, callBack, "Get");
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
  this.requestloadImage = function (sendData, callBack){
    request('/sport/meal/loadsm', sendData, callBack)
  }
  this.requestForItem = function (sendData, callBack) {
    request('/sport/meal/loadsm', sendData, callBack)
  }
}

var req = new Req();
 module.exports={
   requestLogin, requestbaner, req
}