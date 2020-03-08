const express = require('express');
//引入中间件转换request body
const bodyParser = require('body-parser');
const app = express();

const models = require('../db/models')


// for parsing application/json
app.use(express.json());

// for parsing application/wwww-form-urlencode
app.use(express.urlencoded());

// for parsing application/wwww-form-urlencode
app.use(bodyParser.urlencoded({ extended: true}));


//异常处理， http status === 500

/**
 * @desc 构造API
 */
// 新增任务，创建一个todo
app.post('/create', async(req, res, next) => {
  try {
    let { name, deadline, content } = req.body;
    // 数据持久化到数据库
    let todo = await models.Todo.create({
      name,
      deadline,
      content
    })
    res.json({
      todo,
      message: '任务创建成功'
    })
  } catch (error) {
    next(error)
  }
  
})
// 修改任务，修改一个todo
app.post('/update', async(req, res, next) => {
  try {
    let { name, deadline, content, id } = req.body;
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    })
    if(todo) {
      // 执行更新功能
      todo.update({
        name, 
        deadline,
        console
      })
      res.json({
        todo
      })
    }
  } catch (error) {
    next(error)
  }
})
// 修改任务，修改一个todo，删除
app.post('/update_status', async(req, res, next) => {
  try {
    let { id, status } = req.body;
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    })
    if(todo && status !=todo.status) {
      // 执行更新
      todo = await todo.update({
        status
      })
    }
    res.json({
      todo
    })
  } catch (error) {
    next(error)
  }
})
// 查询任务列表
app.get('/list/:status/:page', async(req, res, next) => {
  let { status, page } = req.params;
  let limit = 10;
  let offeset = (page - 1)*limit
  let where = {};
  if(status != -1) {
    where.status = status;
  }
  // 1. 状态 1: 表示代办 2:完成 3:删除, -1:全部
  // 2. 分页处理
  let list = await models.Todo.findAndCountAll({
    where,
    offeset,
    limit
  })
  res.json({
    list
  })
})

app.use((err, req, res, next) => {
  if(err) {
    res.status(500).json({
      message: err.message
    })
  }
})

app.listen(3000, () => {
  console.log('服务启动成功')
})