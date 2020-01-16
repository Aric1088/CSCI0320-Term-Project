package edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.Server;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableTable;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sun.org.apache.xpath.internal.operations.Mod;
import edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.main.KMS;
import edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.main.Main;
import spark.*;
import spark.template.freemarker.FreeMarkerEngine;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.channels.WritableByteChannel;
import java.util.*;

import javax.servlet.ServletOutputStream;
import javax.sound.sampled.Mixer;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.StreamingOutput;
import com.google.gson.Gson;
import java.io.ByteArrayOutputStream;

public class IceCoffeeEnvironment extends BasicSparkEnvironment {

  private static final Gson GSON = new Gson();

  public void runSparkServer(int port) {
    Spark.port(port);
    Spark.externalStaticFileLocation("src/main/resources/static");
    Spark.exception(Exception.class, new ExceptionPrinter());

    FreeMarkerEngine freeMarker = createEngine();


    // Setup Spark Routes
    Spark.webSocket("/stream", SyncWebSuccket.class);
    Spark.get("/icecoffee", new FrontHandler(), freeMarker);
    Spark.get("/audio", new AudioHandler(), freeMarker);
    Spark.get("/status", new StatusHandler(), freeMarker);
    Spark.get("/icecoffee/time", (request, response) -> {
      long received =  System.currentTimeMillis();
      Map<String, Object> variables = new HashMap<>();
      variables.put("received", received);
      variables.put("sent", System.currentTimeMillis());
      return GSON.toJson(variables);
    });
    Spark.get("/admin", new AdminHandler(), freeMarker);

    Spark.post("/adminpost", (req, res) -> {
      // Run list command
      String command = "list";
      String[] commandList = command.split(" ");
      Main.COMMAND_PROCESSOR.process(commandList);

      // Return JSON of mixers
      List<Mixer.Info> mixerList = KMS.mixerList;
      assert(mixerList.size() > 0);
      JsonArray jsonArray = new JsonArray();
      for (int i = 0; i < mixerList.size(); i++) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("id", i);
        jsonObject.addProperty("name", mixerList.get(i).getName());
        jsonArray.add(jsonObject);
      }
      String toSend = GSON.toJson(jsonArray);
      return toSend;
    });

    Spark.post("/adminselect", (req, res) -> {
      // Get query map
      QueryParamsMap qm = req.queryMap();

      // Get list of devices
      String device = qm.value("device");
      String command = String.format("input %s", device);
      String[] commandList = command.split(" ");
      Main.COMMAND_PROCESSOR.process(commandList);

      return "okay";
    });

  }



  /**
   * Handle requests to the front page of our Stars website.
   *
   * @author jj
   */
  private static class FrontHandler implements TemplateViewRoute {
    @Override
    public ModelAndView handle(Request req, Response res) {
      Map<String, Object> variables = ImmutableMap.of("title",
          "Landing Page for Term Project", "content", "not much");
      return new ModelAndView(variables, "icecoffee.ftl");
    }
  }

  /**
   * Handle requests to the front page of our Stars website.
   *
   * @author jj
   */
  private static class AudioHandler implements TemplateViewRoute {
    @Override
    public ModelAndView handle(Request req, Response res) {
      Map<String, Object> variables = ImmutableMap.of("title",
          "Audio Stream", "content", "audio");
      return new ModelAndView(variables, "audio.ftl");
    }
  }

  /**
   * Handle requests to the front page of our Stars website.
   *
   * @author jj
   */
  private static class StatusHandler implements TemplateViewRoute {
    @Override
    public ModelAndView handle(Request req, Response res) {
      Map<String, Object> variables = ImmutableMap.of("title",
          "Audio Stream", "content", "audio");
      return new ModelAndView(variables, "status.ftl");
    }
  }
  
  private static class AdminHandler implements TemplateViewRoute {
    @Override
    public ModelAndView handle(Request req, Response res) {
      Map<String, Object> variables = ImmutableMap.of("title", "Admin Page",
          "content", "");
      String command = "list";
      String[] commandList = command.split(" ");
      Main.COMMAND_PROCESSOR.process(commandList);
      return new ModelAndView(variables, "admin.ftl");
    }
  }

}
