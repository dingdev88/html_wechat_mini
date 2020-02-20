
require('libs/weapp-adapter-min');

// 这里需要先加载微信脚本，不然 window 对象会报错
window.REMOTE_SERVER_ROOT = '';//远程服务器地址

var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;

wx.showShareMenu({ withShareTicket: true});


var user_name = undefined;
var user_avatar = undefined;
var user_openid = undefined;
wx.setStorageSync("server_url","http://192.168.1.115/wechat/joyfull/");
//require('game.min');
wx.login({
  success:function(res){
    var gUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx17d06e2658308742&secret=c0ba327f923d23b7d109bb93ab307254&js_code=' + res.code + '&grant_type=authorization_code';

    wx.request({
      url: gUrl,
      method: 'GET',
      success: function (res) {
        user_openid = res.data.openid;
        wx.setStorageSync("user_openid", user_openid);
        var ss = wx.getStorageSync("user_openid");
        wx.getUserInfo({
          success: function (res) {
            var userInfo = res.userInfo;
            user_name = userInfo.nickName;
            user_avatar = userInfo.avatarUrl;
            wx.setStorageSync("user_name", user_name);
            wx.setStorageSync("user_avatar", user_avatar);
            
            require('game.min');
          },
          fail: function (res) {

          }
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '服务器登陆失败，请退出后重新登录',
          duration: 2000
        })
      }
    })
  }
})
