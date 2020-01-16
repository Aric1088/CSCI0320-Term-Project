package edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.main;

public class Trimethylxanthine {
  KMS kms = new KMS();

  /**
   * Install the commands into the CommandProcessor
   * @param cp - CommandProcessor
   */
  public void installCommands(CommandProcessor cp) {
    kms.initForLiveMonitor();
    cp.register("list", new ListCommand());
    cp.register("input", new InputCommand());
  }

  /**
   * ListCommand class.
   */
  private class ListCommand implements CommandProcessor.Command {
    public String execute(String[] params) {
      StringBuilder result = new StringBuilder();
      kms.displayMixerInfo(result);
      return result.toString();
    }
  }

  /**
   * InputCommand class
   */
  private class InputCommand implements CommandProcessor.Command {
    public String execute(String[] params) {
      StringBuilder result = new StringBuilder();
      /*
      String stream = String.join(" ", params);
      System.out.println(stream);
      kms.chooseStream(stream, result);
      */
      try {
        if (params.length > 0 ) {
          int index = Integer.parseInt(params[0]);
          kms.chooseStream(index, result);
          return result.toString();
        } else {
          return "invalid";
        }
      } catch (NumberFormatException e) {
        return "Invalid number";
      }
    }
  }

}
