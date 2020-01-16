package edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.Server;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.main.KMS;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@WebSocket
public class SyncWebSuccket {

  private static final Gson GSON = new Gson();
  private static final Queue<Session> sessions = new ConcurrentLinkedDeque<>();
  private static int nextId = 0;
  private static boolean succd = false;

  private static ScheduledExecutorService timer =
      Executors.newSingleThreadScheduledExecutor();

  private enum MESSAGE_TYPE {
    CONNECT,
    CHUNK,
    SYNC
  }


  @OnWebSocketConnect
  public void connected(Session session) throws IOException {
    // Add session to the queue
    sessions.add(session);

    // Build the CONNECT message
    JsonObject payload = new JsonObject();
    payload.addProperty("id", nextId++);
    JsonObject connectObject = new JsonObject();
    connectObject.addProperty("type", MESSAGE_TYPE.CONNECT.ordinal());
    connectObject.add("payload", payload);

    // Send CONNECT
    String send = GSON.toJson(connectObject);
    session.getRemote().sendString(send);

    System.out.println("Client connected");

    // If this is the first connection, then we need to spawn our thread to
    // continuously send messages to all clients
    if (!succd) {
      succd = true;
      // Continuously send timestamped chunk data to clients
      timer.scheduleAtFixedRate(
          this::bigSucc, 0, 1000, TimeUnit.MILLISECONDS
      );
    }
  }
//
//  private void syncSucc() {
//    // Spam current server time to all clients
//    for (Session zook: sessions) {
//      try {
//        // Create payload JSON
//        JsonObject succPayload = new JsonObject();
//        succPayload.addProperty("time", System.currentTimeMillis());
//        // Create timestamp JSON
//        JsonObject succJson = new JsonObject();
//        succJson.addProperty("type", MESSAGE_TYPE.SYNC.ordinal());
//        succJson.add("payload", succPayload);
//        String succString = GSON.toJson(succJson);
//        // Send stringified JSON to clients
//        zook.getRemote().sendString(succString);
//      } catch (Exception e) {
//        sessions.remove(zook);
//        e.printStackTrace();
//      }
//    }
//  }

  private void bigSucc() {
    // Get the byte array chunk
    byte[] iLikeEmChunky = new byte[KMS.arrayLength];
    try {
      //System.out.println(KMS.inNOutBurger.available());
      KMS.inNOutBurger.read(iLikeEmChunky, 0, iLikeEmChunky.length);
      assert(KMS.inNOutBurger.available() > iLikeEmChunky.length);
    } catch (IOException e) {
      e.printStackTrace();
      System.out.println("gangrene brain");
    }

    // Create payload
    JsonObject succPayload = new JsonObject();
    succPayload.addProperty("id", 0);
    succPayload.addProperty("chunky", Arrays.toString(iLikeEmChunky));
    succPayload.addProperty("time", System.currentTimeMillis() + 3000);

    // Create full JSON
    JsonObject succThicc = new JsonObject();
    succThicc.addProperty("type", MESSAGE_TYPE.CHUNK.ordinal());
    succThicc.add("payload", succPayload);
    String succString = GSON.toJson(succThicc);

    // Send the stringified JSON to all sessions
    for (Session zook : sessions) {
      try {
        new Thread(() -> {
          try {
            zook.getRemote().sendString(succString);
          } catch (Exception e) {
            e.printStackTrace();
            sessions.remove(zook);
            System.out.println("small brain");
          }
        }).start();
      } catch (Exception e) {
        sessions.remove(zook);
        e.printStackTrace();
        System.out.println("External thread error");
        System.out.println("yaggus brain");
      }
    }
  }

  @OnWebSocketClose
  public void closed(Session session, int statusCode, String reason) {
    sessions.remove(session);
  }

  @OnWebSocketError
  public void hmmst(Session session, Throwable error){
    System.out.println("tiny brain");
    sessions.remove(session);
  }

}
