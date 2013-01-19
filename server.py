from gevent import monkey; monkey.patch_all()
import gevent

from ws4py.server.geventserver import WebSocketServer
from ws4py.websocket import EchoWebSocket

server = WebSocketServer(('10.48.19.129', 9001),
                         websocket_class=EchoWebSocket)
server.serve_forever()
