# Project Outline
*Your project outline document is important for matching with a mentor TA, as well as developing an idea that can become a successful term project. You will write an outline document that lists each member of your team along with their strengths and weaknesses. ….
By this date, you should have a GitHub Classroom repo set up for your term project group (look out for a Piazza post about this after group formation!). Commit and push your project outline document to your repo by March 5. You will find out which of your ideas have been approved, and will be assigned a mentor TA shortly after. Then you should set up a meeting to go over the document together and solidify a single project idea.*

## Team Members

### Olivia Kan-Sperling
##### Strengths:
- Experience thinking critically and creatively about UI/UX
- Experience with A-frame
##### Weaknesses:
- I don’t have much experience coding “outside the classroom” –– i.e, without having well-defined projects and resources, in which the infrastructure with which you’re working is already set up for you. I think being able to work without this safety net is a specific skill that I will need to work on. 

### Gerald Wu
##### Strengths:
- Back-end development (CS classes/hobbies and past internships)
- Knowledge of networking/server setups/systems administration
##### Weaknesses:
- Not much front-end experience

### Claire Schlaikjer
##### Strengths:
- Extensive artistic background, as applied to experience with A-frame, 3D modelling, graphics, animation
##### Weaknesses:
- Similarly to Olivia, more limited experience working outside of the frameworks provided by CS classes

### Aric Zhuang
##### Strengths:
- Extensive full stack experience, with both frontend and backend frameworks such as React, Flask, NodeJS, Express, ElectronJS, etc.
- Worked on large scale software projects, databases, networking, web scraping etc.
- Worked with Spotify API
- Experience with A-Frame.
##### Weaknesses:
- Does not have much experience with graphics


## Project Idea
*… Furthermore, you will include a list of up to 3 project ideas, and detail their requirements.
The requirements section for each idea should describe what problems that ideas are attempting to solve and how your project will solve them. It should describe the critical features you will need to develop, why those features are being included, and what you expect will be most challenging about each feature.*

We’re interested in **Centralized, Synced Music Listening**, and want to explore both virtual and real-world enhancements to this experience using the [D3.js](https://d3js.org/), [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), and/or [Web-VR platform A-frame](https://aframe.io/).

### Speaker syncing (with simple 2d visualizer)
Most parties suffer from one primary problem: the music isn’t loud enough! It’s expensive to purchase a good sound system, but most people have a phone, a laptop, or a small speaker. 
Even if you do have a good sound system, how do you have multi-room parties? Unless you have a mile long aux cable/splitter for each room, you’re out of luck.
This music syncing software platform will allow multiple devices to stream from a server with close to perfect synced playback. 
This function will allow users to sync their devices to the same music stream, which is great for large events, DJing, parties, etc.
Also headphone parties.

##### Critical features:
- Music server that can broadcast music stream/synchronize with clients
  - Why? So people can do the things listed above.
  - Challenge? Getting the sync to work, accounting for issues such as latency, lag, bad internet, scalability.
- Visualizer that will show up on anyone’s device that is connected to the stream. Allows for a combined auditorial and visual experience. Also can be a great backdrop for parties that have a projector in the room.

### Virtual reality “party” and music visualizers
Alternatively, users might want to sync to the same music stream without being in the same physical space but, still have a communal listening experience. Although other platforms, like VRChat (or even, in a primitive form, ClubPenguin), have given rise to spontaneous “virtual raves,” we would like to create a simpler, more specialized product expressly for this purpose. 

##### Critical features:
- Multiple “rooms” which users can log in to. The users in a room see the same visuals and hear the same music.
  - Why? Hang out and listen to music with people even when you’re alone!
  - Challenge? Figuring out how users will create a room, and how different users will be able to “join” (via a code?). 
- Customizable VR music visualizers based on music data (tempo, etc) that will fill the virtual space. 
  - Why? Appreciate music in a new way: graphically. Unlike, say, the (2D) Apple Music visualizer, which just generates abstract patterns based on the music, we want to give users a higher degree of control over the graphics they’re seeing. 
  - Challenge? Design-wise: Figuring out the parameters of customizability, how this will interact with the communal aspect (for example, who has the most control over the visuals? the person whose music is playing?) and providing an intuitive, clean interface for this function. 
- (Customizable) Avatar representations of the user.
  - Why? We want to allow users to be able to identify each other in the room, and have an embodied virtual presence. They should have some parameters of customization, but creating complex avatars isn’t our primary interest.  

##### Add-ons:
- Users can “dance” by contributing their own visuals/”reactions” to the room, and speak in text bubbles or chat log
  - Why? So that users can interact with each other and express themselves.
  - Challenge? Abstracting this out so that it can take arbitrary user input and also stream it in real time to others.

One significant challenge for all the above will be: Web-VR can get really slow really quickly, especially with multiple users accessing the same site. How can we allow for freedom, customizability, and interesting graphics –– but efficiently?  

Together, these features will create a shared visual and auditory space –– online! –– that users can access (with or without a VR headset). At a real-world party in which users are using the speaker-sync function, one could also project the A-frame environment onto a screen, so people can see their “virtual” counterparts as well.

![Club Penguin](https://i.geraldwu.com/rgw4lq.jpg)
