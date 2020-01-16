package edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.main;

import edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.Server.BasicSparkEnvironment;
import edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.Server.IceCoffeeEnvironment;
import joptsimple.OptionParser;
import joptsimple.OptionSet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * The Main class of our project. This is where execution begins.
 *
 * @author jj
 */
public final class Main {

  private static final int DEFAULT_PORT = 4567;

  /**
   * The initial method called when execution begins.
   *
   * @param args An array of command line arguments
   */
  public static void main(String[] args) {
    new Main(args).run();
  }

  private String[] args;

  private Main(String[] args) {
    this.args = args;
  }

  public static final CommandProcessor COMMAND_PROCESSOR =
      new CommandProcessor();


  private void run() {
    // Parse command line arguments
    OptionParser parser = new OptionParser();
    parser.accepts("port").withRequiredArg().ofType(Integer.class)
        .defaultsTo(DEFAULT_PORT);
    OptionSet options = parser.parse(args);
    IceCoffeeEnvironment env = new IceCoffeeEnvironment();
    System.setProperty("org.eclipse.jetty.util.log.class", "org.eclipse.jetty.util.log.StdErrLog");
    System.setProperty("org.eclipse.jetty.LEVEL", "OFF");
    env.runSparkServer((int) options.valueOf("port"));
    BufferedReader reader = new BufferedReader(
        new InputStreamReader(System.in));
    String inputLine;
    try {

      Trimethylxanthine trimethylxanthine = new Trimethylxanthine();
      trimethylxanthine.installCommands(COMMAND_PROCESSOR);

      inputLine = reader.readLine();
      while (inputLine != null) {
        String[] parsedInput = inputLine.split(" ", -1);
        String output = COMMAND_PROCESSOR.process(parsedInput);
        if (!output.equals("")) {
          System.out.println(output);
        }
        inputLine = reader.readLine();
      }
      reader.close();
      System.exit(0);
    } catch (IOException e) {
      System.out.println("IO error has occurred");
    }
  }


}
