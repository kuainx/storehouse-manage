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
- good:Char
- details:JSON

- 描述：存储指定库位上的数据信息
- 索引：storen, storey, storex


