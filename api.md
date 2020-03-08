# 需求说明，API说明

1. 根据客户端传递过来的不同的参数 （状态/页码） 查询   任务列表
2. 实现 新增一个任务的功能 （名称/截止日期/内容）
3. 实现一个 编辑的功能：根据客户端 传递的 任务对象 （已经存在的数据） 进行编辑 （名称/截止时间/内容/ID）
4. 删除一个任务 （ID）
5. 修改任务的转台（id/状态--代办/完成）

# API 实现

## 数据库的初始化
1. 创建一个数据库
2. 使用 `sequelize cli` 初始化项目的数据库配置信息
     `npx sequelize init`
3. 生成模型文件
   1. migrate 文件
   2. model 文件
   `npx sequelize model:generate --name Todo --attributes name:string,deadline:date,content:string`
4. 持久化模型对于的[数据库表]
    `npx sequelize db:migrate`

## API里面具体使用ORM模型

## 项目的运维和发布 
pm2