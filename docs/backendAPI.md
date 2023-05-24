## 后端API

### Settings

- 接口描述：设置获取及设定
- 接口地址：/management/settings
- 请求方式：GET, POST
- 返回数据：JSON格式所有设置



### Init/Settings

- 接口描述：初始化默认设置
- 接口地址：/management/init/settings
- 请求方式：POST
- 注：无请求及返回内容，POST仅防止误操作



### Init/Stores

- 接口描述：根据设置初始化仓库
- 接口地址：/management/init/stores
- 请求方式：POST
- 风险提示：可能造成物料移位、丢失
- 注：无请求及返回内容，POST仅防止误操作



### Store/

- 接口描述：获取所有存储库
- 接口地址：/store
- 请求方式：GET
- 返回数据：JSON



### Store/:id

- 接口描述：获取/修改/删除指定库位
- 接口地址：/store/:id
- 请求方式：GET, PUT, PATCH, DELETE
- 返回数据：JSON



### Material/all

- 接口描述：获取所有物料数据
- 接口地址：/material/all
- 请求方式：GET
- 返回数据：JSON



### Material/set

- 接口描述：修改物料数据信息
- 接口地址：/material/set
- 请求方式：POST



### Material/new

- 接口描述：新增物料数据信息
- 接口地址：/material/new
- 请求方式：POST



### Task/all

- 接口描述：获取所有任务
- 接口地址：/task/all
- 请求方式：GET
- 返回数据：JSON



### Task/import

- 接口描述：新增入库任务
- 接口地址：/task/import
- 请求方式：POST
- 请求数据：demo
```
{
    "priority":true,
    "material":{
        "material":3,
        "num":1
    }
}
```



### Task/export

- 接口描述：新增出库任务
- 接口地址：/task/export
- 请求方式：POST
- 返回数据：JSON
- 请求数据：demo
```
{
    "priority":true,
    "material":{
        "material":3,
        "num":1
    }
}
```



### Task/get

- 接口描述：PLC拉取任务
- 接口地址：/task/get
- 请求方式：POST
- 注：数据解析详见TCPcom
- 返回数据：demo
```
{
    "msg":"020202040003"
}
```

- 请求数据：demo
```
{
    "msg":"010103000201"
}
```



### Task/set

- 接口描述：修改任务
- 接口地址：/task/set
- 请求方式：POST



### Task/remove

- 接口描述：删除任务
- 接口地址：/task/set
- 请求方式：POST
