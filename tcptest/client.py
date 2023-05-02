#!/usr/bin/python3
# -*- coding: UTF-8 -*-

from twisted.internet.protocol import Protocol, ClientFactory
from twisted.internet import reactor
# from twisted.python.compat import raw_input

IP_HOST = "127.0.0.1"
IP_PORT = 7777


class MyClientProtocol(Protocol):

    def sendData(self):
        data = input("> ")  # raw_input
        if data:
            print("send: %s" % data)
            self.transport.write(str.encode(data))
        else:
            self.transport.loseConnection()

    def connectionMade(self):
        print("connectionMade of client")
        self.sendData()

    def dataReceived(self, data):
        print("recv:" + data.decode())
        self.sendData()


class MyClientFactory(ClientFactory):
    protocol = MyClientProtocol
    clientConnectionLost = clientConnectionFailed = \
        lambda self, connector, reason: reactor.stop()


# main function
if __name__ == '__main__':
    print("======twisted client main begin======")
    print("connect server...")
    reactor.connectTCP(IP_HOST, IP_PORT, MyClientFactory())
    reactor.run()