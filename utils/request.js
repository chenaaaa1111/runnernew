function requestLogin(data, callback) {
  // var 
  //   url= 'http://yundongkuka.com:8080/sport/user/user';
  var url = 'https://ishzi.cn/sport/user/user';
  try {
    wx.request({
      url: url,
      data: data,
      method: "GET",
      success: function(res) {
        console.log(res);
        callback(res);

      }
    })
  } catch (e) {
    console.error(e)
  }

}

function request(url, data, callBack, method) {
  var token = wx.getStorageSync('token');
  console.log('requesttoken', token);
  if (!token) {}
  var apiurl = 'https://ishzi.cn';
  url = apiurl + url;
  var sendData = Object.assign({
    token: token
  }, data)
  wx.request({
    url: url,
    data: sendData,
    header: {
      'Cookie': "JSESSIONID=" + wx.getStorageSync('sessionId'),
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    method: method,
    success: function(res) {
      callBack(res);
    }
  })
}

function requestbaner(sendData, callback, methed) {
  var url = '/sport/carousel/carousel';
  request(url, sendData, callback, methed)
}

function Req() {
  var self = this;

  function request(url, data, callback, methd) {
    self.apiurl = 'https://ishzi.cn';
    console.log('url', self.apiurl + url)
    var token = wx.getStorageSync('token');
    console.log('token', token);
    if (!token) {
      return;
    }
    console.log('token', token)
    if (!token) {
      return;
    }
    var sendData = Object.assign({
      'token': token
    }, data)

    wx.request({
      url: self.apiurl + url,
      data: sendData,
      header: {
        'Cookie': "JSESSIONID=" + wx.getStorageSync('sessionId'),
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
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
  this.requstImages = function(sendData, callBack) {
    request('url', sendData, callBack, "Get");
  }
  this.requestRunnerber = function(sdData, callBack) {
    console.log('shushu', sdData);
    console.log(callBack)
    wx.getWeRunData({
      success: function(res) {
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
  this.requestForWho = function(sendData, callback) {
    //返回为谁而跑				
    request('/sport/forRun/torun', sendData, callBack, "Get");
  }
  this.addForWho = function(sendData, callBack) {
    //添加为谁而跑
    request('/sport/forRun/addrun', sendData, callBack, "Get");
  }
  this.requestThenms = function(sendData, callBack) {
    //添加为谁而跑
    request('/sport/meal/page', sendData, callBack, "Get");
  }
  this.requestrunImage = function(sendData, callBack) {
    request('/sport/meal/xz', sendData, callBack, "Get");
  }
  //获取跑步的图片
  this.requestImageRun = function(sendData, callBack) {
    request('/sport/forRun/sm', sendData, callBack, "Get");
  }
  this.reqaddforwho = function(sendData, callBack) {
    request('/sport/forRun/addrun', sendData, callBack, "Get");
  }
  this.reqaddImage = function(sendData, callBack) {
    //添加套餐
    request('/sport/meal/gorun', sendData, callBack, "Get");
  }
  this.requestloadImage = function(sendData, callBack) {
    request('/sport/meal/loadsm', sendData, callBack)
  }
  this.requestForItem = function(sendData, callBack) {
    request('/sport/meal/loadsm', sendData, callBack)
  }
  //获取缅怀主题步数
  this.reqmisRunStep = function(sdData, callBack) {
    console.log('shushu', sdData);
    console.log(callBack)
    wx.getWeRunData({
      success: function(res) {
        console.log(res);
        var sea = {
          data: res.encryptedData,
          iv: res.iv
        }
        var ssdata = Object.assign(sdData, sea)
        console.log('获取步数', sdData);
        request('/sport/miss/step', ssdata, callBack, "Get");
      }
    })
    //获取步数

  }
  this.reqmissum = function(sendData, callBack) {
    request('/sport/miss/missnum', sendData, callBack)
  }
  this.requestFriedLife = function(sendData, callBack) {
    //查询朋友圈
    request('/sport/master/selectmaster', sendData, callBack)
  }
  this.requestRanking = function(sendData, callBack) {
    request('/sport/rank/rank', sendData, callBack)
  }
  this.reqcitys = function(sendData, callBack) {
    request('/sport/world/country', sendData, callBack)
  }
  this.reqcityImages = function(sendData, callBack) {
    request('/sport/world/cityimg', sendData, callBack)
  }
  this.reqwordstep = function(sendData, callBack) {
    request('/sport/world/step', sendData, callBack)
  }
  this.reqaddwordimage = function(sendData, callBack) {
    request('/sport/world/addimg', sendData, callBack)
  }
  this.reqsendMesage = function(sendData, callBack) {
    request('/sport/meal/addwords', sendData, callBack)
  }
  this.reqsendmissMessage = function(sendData, callBack) {
    request('/sport/miss/addwords', sendData, callBack)
  }
  this.reqsendwordMessage = function(sendData, callBack) {
    request('/sport/world/addwords', sendData, callBack)
  }
  this.reqfranking = function(sendData, callBack) {
    request('/sport/rank/ranks', sendData, callBack)
  }
  this.addmaster = function(sendData, callBack) {
    //添加朋友圈，发布动态
    request('/sport/master/addmaster', sendData, callBack)
  }
  this.addlikenum = function(sendData, callBack) {
    //点赞
    request('/sport/master/addlikenum', sendData, callBack)
  }
  this.uploadmasterimg = function(sendData, callBack) {
    //上传动态图片
    request('/sport/master/uploadmasterimg', sendData, callBack)
  }
  //添加评论
  this.addComment = function(sendData, callBack) {
    request('/sport/master/comment', sendData, callBack)
  }

  //跑团-是否添加跑团（跑团首页）
  this.teamstatus = function(sendData, callBack) {
    request('/sport/team/teamstatus', sendData, callBack)
  }
  //跑团详情
  this.teamDetail = function(sendData, callBack) {
    request('/sport/team/teampage', sendData, callBack)
  }
  //跑团—创建跑团
  this.createTeam = function(sendData, callBack) {
    request('/sport/team/addteam', sendData, callBack)
  }
  //跑团名称是否重复
  this.isteamname = function(sendData, callBack) {
    request('/sport/team/isteamname', sendData, callBack)
  }
  //跑团—上传logo
  this.uplogo = function(sendData, callBack) {
    request('/sport/team/uploadlogo', sendData, callBack)
  }
  //入团申请
  this.applyTeam = function (sendData, callBack) {
    request('/sport/team/applyteam', sendData, callBack)
  }
  //入团申请列表
  this.applyList = function (sendData, callBack) {
    request('/sport/team/leadselectapply', sendData, callBack)
  }
  //审核同意入团申请agreeinteam
  this.agreeinteam = function (sendData, callBack) {
    request('/sport/team/agreeinteam', sendData, callBack)
  }
  //退出跑团
  this.outTeam = function (sendData, callBack) {
    request('/sport/team/leaveteam', sendData, callBack)
  }
  //团内排行
  this.userRanking = function (sendData, callBack) {
    request('/sport/team/inteamrankbystep', sendData, callBack)
  }
  this.replay = function(sendData, callBack) {
    request('/sport/master/reply', sendData, callBack)
  }
  //跑团排行 根据人数
  this.getRankByPeople = function(sendData, calllBack) {
    request('/sport/team/rankbypeople', sendData, calllBack);
  }
  //跑团排行 根据步数
  this.getRankByStep = function(sendData, callBack) {
    request('/sport/team/rankbystep', sendData, callBack);
  }
  //模糊查询跑团列表 根据跑团名称
  this.getClubByName = function(sendData, callBack) {
    request('/sport/team/dimteamname', sendData, callBack);
  }
  //团内排行
  this.getRankInTermByStep = function(sendData, callBack) {
    request('/sport/team/inteamrankbystep', sendData, callBack);
  }
  //更新跑团信息 
  this.updateteam = function (sendData, callBack) {
    request('/sport/team/updateteam', sendData, callBack);
  }
  //地图-跑团列表
  this.runTeamByStep = function (sendData, callBack) {
    request('/sport/team/runTeamByStep', sendData, callBack);
  }
}

var req = new Req();
module.exports = {
  requestLogin,
  requestbaner,
  req
}