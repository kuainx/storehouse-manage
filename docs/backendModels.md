# 后端Models

## management/Setting

- key:Char
- value:Char
- desc:Text/blank
&nbsp;
- 描述：设置项
- 索引：key

## log/Log

- time:DateTime(auto_now)
- msg:Text
- reporter:Char
- type:PositiveSmallInteger(Choice)
  - LOG
  - INFO
  - WARN
  - ERROR
&nbsp;
- 描述：设置项
- 索引：key

## store/Store

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
- details:JSON/NULL
&nbsp;
- 描述：存储指定库位上的数据信息
- 索引：
  - storen, storey, storex
  - status, storen

## material/Material

- name:Char
- desc:Text/blank
- material:Char
- unit:Char
- info:JSON/NULL
&nbsp;
- 描述：物料信息
- 索引：name

## task/Task

- stacker:PositiveSmallInteger
- type:PositiveSmallInteger(Choice)
  - IN
    - 入库
  - OUT
    - 出库
  - CHECK
    - 盘库
- targetn:PositiveSmallInteger
- targety:PositiveSmallInteger
- targetx:PositiveSmallInteger
- priority:Boolean(false)
- executing:Boolean(false)
- time:DateTime(auto_now)
&nbsp;
- 描述：任务列表
- 索引：stacker
