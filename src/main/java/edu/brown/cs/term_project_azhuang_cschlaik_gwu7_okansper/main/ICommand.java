package edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.main;

/**
 * Interface for installing commands onto the CommandProcessor.
 */
public interface ICommand {
  /**
   * Method to install commands onto the Command Processor.
   *
   * @param cp - the CommandProcessor on which to install the commands
   */
  void installCommands(CommandProcessor cp);
}
