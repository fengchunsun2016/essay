

Install it and run:

```bash
npm install
npm run dev
```
# 项目打包
```
cd "项目目录" & yarn run build
复制 .next/  static/  packages.json 3个文件到上传目录
```
# 服务器端设置
## 安装node.js
```
安装nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
nvm --version             #查看nvm版本
nvm install v8.2.1        #通过nvm安装
nvm alias default v8.2.1  #设置node的默认版本
node --version   #确认node的版本，8.2.1
npm --version    #确认npm的版本， 5.3.0
npm config set registry https://registry.npm.taobao.org/     #由于 Node 的官方模块仓库网速太慢，模块仓库需要切换到阿里的源。
npm config get registry                                      #执行下面的命令，确认是否为：https://registry.npm.taobao.org/
```
### 上传项目并安装相关的包
```
cd "上传所在文件夹"      #进入项目目录
npm install              #安装项目所需要npm包
```
### 安装pm2，启动项目，并设置服务自启动
```
npm install -g pm2                                 #安装pm2
pm2 start npm --name "渠道管理"  -- start          #确保处于项目目录，运行命令启动服务
pm2 list                                           #确认启动的项目状态
```
附PM2项目地址，以供参考： https://github.com/Unitech/pm2/blob/master/README.md
### nginx配置样板
```
location / {
  proxy_pass http://localhost:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
```

