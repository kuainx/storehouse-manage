## TCP通信协议

#### 轮询请求

- HEAD:1byte
  - 固定为0x01，表明请求开始
- STACKER:1byte
  - 表明码垛机号
- POSITIONY:1byte
- POSITIONX:2byte
- TASK:1byte
  - 表明上次任务执行结果
  - 无任务为0x00，成功为0x01

- 请求示例：010103000201

#### 轮询响应

- HEAD:1byte
  - 固定为0x02，表明响应开始
- TYPE:1byte
  - 无任务为0x00，入库为0x01，出库为0x02
- TARGETN:1byte
- TARGETY:1byte
- TARGETX:2byte

- 响应示例：