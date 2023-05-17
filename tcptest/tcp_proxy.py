#!/usr/bin/python3
# -*- coding: UTF-8 -*-

from twisted.internet.protocol import Protocol, Factory
from twisted.internet import reactor
from requests import post

from time import ctime

IP_PORT = 7777
clients = []


class MyServerProtocol(Protocol):
    def connectionMade(self):
        clnt = self.clnt = self.transport.getPeer().host
        print("connected from:" + clnt)

    def connectionLost(self, reason):
        print("lost connection" + reason)

    def dataReceived(self, data):
        data_str = data.decode()
        print("dataReceived:" + data_str)
        if data_str == "quit":
            self.transport.loseConnection()
        else:
            res = post(url='http://127.0.0.1:8000/api/task/get',
                       headers={"Content-Type": "application/json"},
                       json={"msg": data_str})
            response_data = res.json()
            print(response_data)
            send_bytes = str.encode(str(response_data["msg"]))
            self.transport.write(send_bytes)


# main function
if __name__ == '__main__':
    print("======twisted server main begin======")
    factory = Factory()
    factory.protocol = MyServerProtocol
    print("listent...")
    reactor.listenTCP(IP_PORT, factory)
    reactor.run()
