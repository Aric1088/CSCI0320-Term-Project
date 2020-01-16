package edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.main;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.stream.IntStream;

/**
 * Command Processor to handle input from the REPL.
 */
public class CommandProcessor {

  private HashMap<String, Command> commandMap = new HashMap<>();

  /**
   * Any class that implements this interface is a valid command in the REPL.
   */
  public interface Command {
    /**
     * Method implemented that essentially executes the command called.
     *
     * @param params - the params for the command
     * @return String - the String returned by the command execution
     */
    String execute(String[] params);

  }

  /**
   * Registers a string to map to its command.
   *
   * @param command - the string rep of the command
   * @param c       - the command to be registered
   */
  public void register(String command, Command c) {
    this.commandMap.put(command, c);
  }

  /**
   * Process the user input to see if it maps to a command.
   *
   * @param input - the user input String array, initally split by whitespace
   * @return String - the String that is returned from processing user input
   */
  public String process(String[] input) {

    if (this.commandMap.containsKey((input[0]))) {
      String[] params = IntStream.range(1, input.length)
          .mapToObj(i -> input[i])
          .toArray(String[]::new);
      return this.commandMap.get(input[0]).execute(params);
    }
    return "ERROR: Invalid Command";


  }

  /**
   * Removes whitespace from the input.
   *
   * @param input - the user's input.
   * @return the input with space removed.
   */
  public static String[] removeWhiteSpace(String[] input) {
    ArrayList<String> parsed = new ArrayList<>(Arrays.asList(input));
    parsed.removeIf(String::isEmpty);
    String[] output = new String[parsed.size()];
    output = parsed.toArray(output);
    return output;
  }

}
