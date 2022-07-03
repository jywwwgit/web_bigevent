
## 1. 在新的一台电脑上拉取远程仓库最新的代码
    1.git remote add origin ssh    //链接远程仓库的ssh地址
    2.git pull origin main --allow-unrelated-histories  //让git允许调教不关联的历史代码
## 2. 注意：在新电脑上建立与github的连接需要本地生成新的秘钥
   ### 1.配置
        git config –global user.name ‘xxxxx’ 
        git config –global user.email ‘xxx@xx.xxx’
   ### 2.生成秘钥
        ssh-keygen -t rsa -C ‘上面的邮箱’
   ### 3.连按三次回车
   ### 4.最后在目录.ssh下有两个文件，id_rsa（私有秘钥）和id_rsa.pub（公有密钥），连接远程仓库把公有秘钥上传到github上
      （windows电脑的.ssh文件在当前用户目录下C:\Users\Administrator下）
      （mac电脑的.ssh文件在终端下输入open ~/.ssh即可）
## 3. Git拉取远程分支到本地，修改并同步
  ###  1.与远程仓库建立连接
        （git remote add origin ssh）
   ### 2.拉取远程分支到本地
        （git fetch origin 远程分支名）
   ### 3.在本地创建分支cs并切换到该分支   
        （git checkout -b 远程分支名 origin/远程分支名）
   ### 注意：删除本地分支（git branch -d 分支名），查看本地分支（git branch -a ）  
             删除远程分支（git push origin --delete 远程分支名），查看远程分支（git branch -a）
             创建本地新分支（git checkout -b 分支名）
