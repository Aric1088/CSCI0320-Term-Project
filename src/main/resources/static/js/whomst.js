  const MESSAGE_TYPE = {
      CONNECT: 0,
      CHUNK: 1,
      SYNC: 2
  };

  let safari = false;
  let conn;
  let myId = -1;
  let player;
  //perfectly synced time would be 0
  let calculated_offset = 0;
  let debug = false;
  let has_started = false;
  let host = window.location.hostname;
//let host = "hecces.devices.brown.edu";
  // let host = "hecce";
  // let host = "192.168.55.10";
  let url = "http://" + host + ":4567";
  let ws = "ws://" + host + ":4567/stream";
  let visualizer = false;
  let is_playing = false;


  function print(toPrint) {
      if (debug) {
          console.log(toPrint)
      }
  }

  // Setup the WebSocket connection for setting up the audio stream
  const setup_audio_stream = () => {
      conn = new WebSocket(ws);
      setup_audio_player();
      let x = document.getElementById("whomst");
      x.play();
      // conn = new WebSocket("ws://hecces.devices.brown.edu:4567/stream");

      conn.onerror = err => {
          console.log('Connection error:', err);
      };

      conn.onmessage = msg => {
          const data = JSON.parse(msg.data);
          switch (data.type) {
              default:
                  console.log('Unknown message type!', data.type);
                  break;
              case MESSAGE_TYPE.CONNECT:
                  myId = parseInt(data.payload.id, 10);
                  break;
              case MESSAGE_TYPE.CHUNK:
                  //CODE SECTION: OBTAINS AN AUDIO BYTE ARRAY CHUNK FROM THE SERVER

                  //Converts it into unsigned 8 bit int array
                  let hecces = new Uint8Array(JSON.parse(data.payload.chunky));
                  print("Server Time: " + data.payload.time + " Client Time:" + (new Date()).getTime());
                  print("Delta: Client delay is: " + (parseInt(data.payload.time) - (new Date()).getTime()));
                  resynchronize(data.payload.time, hecces);

                  break;

          }
      };
  };

  const setup_audio_player = () => {
      player = new AudioPlayer({
          encoding: '16bitInt',
          channels: 2,
          sampleRate: 48000,
          flushingTime: 1000
      });
      has_started = true;


  };
  let intervalWorker = new Worker('js/worker.js');
  intervalWorker.onmessage = function(e){
      calculated_offset = e.data[0];
      if (has_started) {
          setTimeout(() => {
              player.flush();
              // console.log(e.data[1] - e.data[2]);
              visualizer = true;
          }, (e.data[1] - e.data[2]));
      }
  };


  function resynchronize(time_stamp, data) {
      //Update the synchronized client time
      let synced_client_time = (new Date().getTime()) + calculated_offset;
      print("I WILL WAIT: " + (time_stamp - synced_client_time));

      setTimeout((data) => {
          // audio_buffer.push(...data);
          print("IM PLAYING" + (new Date().getTime()));
          print(data);
          if (is_playing) {
              player.feed(data);
          }
          // player.flush();
      }, time_stamp - synced_client_time, data);
  }

  const play = () => {
      console.log("WHOMSt");
          if (!has_started) {
              setup_audio_stream();
              has_started = true;
          }
          if (is_playing) {
              document.getElementById("player");
              document.getElementById("player").className = "fa fa-play fa-2x";
              document.getElementById("player").style.marginLeft = "0px";
              is_playing = false;
          } else {
              is_playing = true;
              document.getElementById("player").className = "fa fa-pause";
              document.getElementById("player").style.marginLeft = "-12px";
          }
      }
  ;

  const getAnalyser = () =>{
      let whom = player.analyser;
      var bufferLength = whom.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      whom.getByteFrequencyData(dataArray);
      console.log("++++++++++");
      console.log(dataArray);

      return player.analyser;
  };
