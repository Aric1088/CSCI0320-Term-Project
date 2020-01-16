package edu.brown.cs.term_project_azhuang_cschlaik_gwu7_okansper.main;

import javax.sound.sampled.*;
import java.io.*;
import java.lang.annotation.Target;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class KMS {

  private boolean running = true;
  private boolean selected = false;
  private boolean threadRunning = false;

  private static float sampleRate = 48000;
  private static int sampleSizeInBits = 16;
  private static int channels = 2;
  private static boolean signed = true;
  private static boolean bigEndian = false;

  private int frameSize = 1;
  private float frameRate = 4000.0f;
  AudioFormat format = new AudioFormat(AudioFormat.Encoding.PCM_SIGNED,
      sampleRate, sampleSizeInBits, channels, frameSize, frameRate, bigEndian);
  private AudioFormat micFormat = new AudioFormat(sampleRate,
      sampleSizeInBits, channels, signed, bigEndian);
  private AudioFormat speakerFormat = new AudioFormat(sampleRate,
      sampleSizeInBits, channels, signed, bigEndian);

  private TargetDataLine targetLine;

  public static int arrayLength =
      Math.round(sampleRate) * (sampleSizeInBits / 8) * channels;

  private static ByteArrayOutputStream byteStream = new ByteArrayOutputStream();

  private static PipedOutputStream outbackSteakhouse = new PipedOutputStream();
  public static PipedInputStream inNOutBurger =
      new PipedInputStream(arrayLength * 2);

  public static List<Mixer.Info> mixerList = new ArrayList<>();

  void chooseStream(int index, StringBuilder sb) {
    Mixer.Info info = mixerList.get(index);
    try {
      System.out.println("mixer info: " + info.getName());
      Mixer temp = AudioSystem.getMixer(info);
      System.out.println("source line array info: " + Arrays.toString(temp.getSourceLineInfo()));
      System.out.println("target line array info: " + Arrays.toString(temp.getTargetLineInfo()));
      //targetLine = (TargetDataLine) (temp.getTargetLines()[0]);
      assert(temp.getTargetLineInfo().length > 0);
      Line.Info tempInfo = temp.getTargetLineInfo()[0];
      System.out.println("info: " + tempInfo.toString());
      tempInfo = new DataLine.Info(TargetDataLine.class, micFormat);
      targetLine = (TargetDataLine) (temp.getLine(tempInfo));
      System.out.println("target line info: " + targetLine.getLineInfo());
      System.out.println("target line format: " + targetLine.getFormat());
      running = false;
      selected = true;
      while (threadRunning) {
        try {
          System.out.println("Waiting...");
          Thread.sleep(500);
        } catch(Exception e) {
          System.out.println("Still going...");
        }
      }
      running = true;
      initForLiveMonitor();
      return;
    } catch (LineUnavailableException e) {
      return;
    }
  }

  void displayMixerInfo(StringBuilder sb) {
    mixerList.clear();
    Mixer.Info [] mixersInfo = AudioSystem.getMixerInfo();

    for (Mixer.Info mixerInfo : mixersInfo) {
      //System.out.println("Mixer: " + mixerInfo.getName());
      sb.append("Mixer: ");
      sb.append(mixerInfo.getName());
      sb.append("\n");

      mixerList.add(mixerInfo);

      Mixer mixer = AudioSystem.getMixer(mixerInfo);

      Line.Info [] sourceLineInfo = mixer.getSourceLineInfo();
      for (Line.Info info : sourceLineInfo) {
        showLineInfo(info, sb);
      }

      Line.Info [] targetLineInfo = mixer.getTargetLineInfo();
      for (Line.Info info : targetLineInfo) {
        showLineInfo(info, sb);
      }
    }
  }


  private void showLineInfo(final Line.Info lineInfo, StringBuilder sb) {
    //System.out.printf("  %s", lineInfo.toString());
    sb.append("  ");
    sb.append(lineInfo.toString());
    sb.append("\n");

    if (lineInfo instanceof DataLine.Info) {
      DataLine.Info dataLineInfo = (DataLine.Info)lineInfo;

      AudioFormat [] formats = dataLineInfo.getFormats();
      for (final AudioFormat format : formats) {
        //System.out.printf("    %s", format.toString());
        sb.append("    ");
        sb.append(format.toString());
        sb.append("\n");
      }
    }
  }

  void initForLiveMonitor() {

    try {

      System.out.println("init");

      //Speaker
      DataLine.Info info = new DataLine.Info(SourceDataLine.class,
          speakerFormat);
      SourceDataLine sourceLine = (SourceDataLine) AudioSystem.getLine(info);
      sourceLine.open();

      if (!selected) {
        //Microphone
        info = new DataLine.Info(TargetDataLine.class, micFormat);
        System.out.println(info.toString());
        targetLine = (TargetDataLine) AudioSystem.getLine(info);
      }
      targetLine.open();
      System.out.println(targetLine.toString());
      System.out.println(targetLine.getLineInfo());
      System.out.println(targetLine.getFormat());

      if (!selected) {
        try {
          inNOutBurger.connect(outbackSteakhouse);
        } catch (IOException e) {
          e.printStackTrace();
          System.out.println("Continuing anyway...");
        }
      }

      Thread monitorThread = new Thread(() -> {
        try {
          assert(targetLine.isOpen());
          assert(sourceLine.isOpen());
          System.out.println("thread spawned");
          threadRunning = true;

          targetLine.start();
          sourceLine.start();

          System.out.println(targetLine.toString());
          System.out.println(targetLine.getLineInfo());
          System.out.println(targetLine.getFormat());

          byte[] data = new byte[targetLine.getBufferSize() / 5];
          int readBytes;

          while (running) {
            System.out.println(targetLine.available());
            //assert(targetLine.available() > data.length);
            readBytes = targetLine.read(data, 0, data.length);
            outbackSteakhouse.write(data, 0, readBytes);
            byteStream.write(data, 0, readBytes);
          }

          targetLine.drain();
          sourceLine.drain();
          targetLine.close();
          sourceLine.close();

          assert(!sourceLine.isOpen());
          assert(!targetLine.isOpen());

          threadRunning = false;

          System.out.println("Previous monitor closed.");
        } catch (IOException e) {
          e.printStackTrace();
          threadRunning = false;
        }
      });

      System.out.println( "Start LIVE Monitor for 15 seconds" );
      monitorThread.start();

      /*
      Thread.sleep(15000);
      targetLine.stop();
      targetLine.close();
      System.out.println( "End LIVE Monitor" );
      */

    }
    catch(LineUnavailableException lue) { lue.printStackTrace(); }
    //catch(InterruptedException ie) { ie.printStackTrace(); }


  }
  public static void main(String[] args) {
    KMS kms = new KMS();
    kms.initForLiveMonitor();
  }
}
