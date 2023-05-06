## 后端Models

### management/Setting

- key:Char

- value:Char

  

- 描述：设置项

- 索引：key



### store/Store

#### 库位信息

- storen:PositiveSmallInteger

- storex:PositiveSmallInteger

- storey:PositiveSmallInteger

- status:Char(Choice)
  - empty
    - 库位为空
  - reserved
    - 库位为空，但已被预约
  - occupied
    - 库位已使用
  - locked
    - 库位已使用，但已被预约取出
  
- material:ForeignKey(material.Material)

- num:PositiveInteger(default:1)

- details:JSON

  

- 描述：存储指定库位上的数据信息

- 索引：storen, storey, storex



### material/Material

- name:Char

- desc:Text

- material:Char

- unit:Char

- info:JSON/NULL

  

- 描述：物料信息

- 索引：name



### task/Task

- stacker:PositiveSmallInteger

- origin:Char

- target:Char

- priority:Boolean(false)

- executing:Boolean(false)

- time:DateTime(auto_now)

  

- 描述：任务列表

- 索引：stacker

