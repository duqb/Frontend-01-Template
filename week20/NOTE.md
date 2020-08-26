# 第二十周总结


###  发布系统 | ESLint 与 PhantomJS无头浏览器与DOM检查


 ESLint

PhantomJS



// 用户持续集成里测试页面 是否被改坏了页面 冒烟测试

冒烟测试


Reference:
* https://phantomjs.org/download
* http://jslint.com/
* http://eslint.org/
* https://www.npmjs.com/package/mocha-phantomjs
* https://zh.wikipedia.org/wiki/%E5%86%92%E7%83%9F%E6%B5%8B%E8%AF%95_(%E8%BD%AF%E4%BB%B6)


###  发布系统 | 发布权限 OAuth


OAuth 

code 入场券

token 通行证 令牌

拿 code 换 token

```javascript
 {
  // 浏览器端发送 / publish-tool /(唤起浏览器)
  // 请求获得 code
  ("https://github.com/login/oauth/authorize?client_id=Iv1.17d29ae55d14ecd&redirect_uri=http%3A%2F%2Flocalhost%3A8000&scope=read%3Auser&state=123abc");
  // 点击授权后跳转的地址 (code 可能几分钟就会过期)
  ("http://localhost:8000/?code=4234be09061aba450f75&state=123abc");
}

{
  // 服务端发送 publish-server
  // 请求获得 token
  // access_token=b4f8894596eed68255e9678a3477279faf20476
  let code = "5b32064ae7623885f4cc";
  let state = "123abc";
  let client_secret = "93f808695c66deba19c543cac59b76c87cd5873";
  let client_id = "Iv1.17d29ae55d14ecd";
  let redirect_uri = encodeURIComponent("http://localhost:8081/auth");
  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  let xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `https://github.com/login/oauth/access_token?${params}`,
    true
  );
  xhr.send(null);
  xhr.addEventListener("readystatechange", function (event) {
    if (event.readyState === 4) {
      console.log(event.responseText);
      // access_token=04e13a2e7fe77d5ec6377c944c4fc0cb06c7df5&expires_in=28800&refresh_token=r1.4c605e1007cdb92e67c2fd28664946e1e5e226674f54bfa0a1275ca73c39c5dbeff0d2762798b81&refresh_token_expires_in=15897600&scope=&token_type=bearer
    }
  });

  // 注意 api.github.com 拒绝请求 （可能要科学上网）
  // 带 token 获取 github 用户信息
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.github.com/user`, true);
  xhr.setRequestHeader(
    "Authorization",
    "token 04e13a2e7fe77d5ec6377c944c4fc0cb06c7df5"
  );
  xhr.send(null);
  xhr.addEventListener("readystatechange", function (event) {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText);
    }
  });
}
```


Reference:
* https://developer.github.com/v3/
* https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onload
* https://developer.github.com/v3/users/
* https://developer.github.com/v3/oauth_authorizations/
* https://developer.github.com/apps/building-oauth-apps/
* https://justauth.wiki/#/quickstart/oauth

