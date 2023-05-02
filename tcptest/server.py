#!/usr/bin/python3
# -*- coding: UTF-8 -*-

from twisted.internet.protocol import Protocol, Factory
from twisted.internet import reactor

from time import ctime

IP_PORT = 7777
clients = []
class MyServerProtocol(Protocol):

    def connectionMade(self):
        clnt = self.clnt = self.transport.getPeer().host
        print("connected from:" + clnt)
        # self.factory.numProtocols = self.factory.numProtocols + 1
        # self.transport.write(
        #     "欢迎来到Spread Site, 你是第%s个客户端用户!\n" % (self.factory.numProtocols)
        # )
        # print
        # "new connect: %d" % (self.factory.numProtocols)
        # clients.append(self)

    def connectionLost(self, reason):
        print("lost connection")
        # self.factory.numProtocols = self.factory.numProtocols - 1
        # clients.remove(self)
        # print("lost connect: %d" % (self.factory.numProtocols))

    def dataReceived(self, data):
        data_str = data.decode()
        print("dataReceived:" + data_str)
        if data_str == "quit":
            self.transport.loseConnection()
        else:
            send_str = '[%s] %s' % (ctime(), data_str)
            send_bytes = str.encode(send_str)
            #print("data send:" + data_str)
            self.transport.write(send_bytes)


#main function
if __name__ == '__main__':
    print("======twisted server main begin======")
    factory = Factory()
    factory.protocol = MyServerProtocol
    print("listent...")
    reactor.listenTCP(IP_PORT, factory)
    reactor.run()
