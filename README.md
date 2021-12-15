# writingSynth
MaxMSP patch + Javascript that connects to a custom Wordpress blog's API and generates unique sounds determined by sentiment analysis of the latest post's content.

ABOUT PROJECT: As a creative project for MUSIC 158A: Sound and Music Computing at Berkeley, my goal was to combine creative writing with music and programming. I intended to translate words/language into sound using MaxMSP. 

JAVASCRIPT DESIGN: I started by creating a personal Wordpress blog, where I can add, delete, and edit posts. In the Javascript file jsFile.js, I use Wordpress's API to connect to my online blog and pull the latest post content. Connecting my Javascript code to MaxMSP allows me to transfer the data grabbed from my blog back to MaxMSP, where I handle the sound design. To design the sound in MaxMSP, I needed to actually translate the written post content into numerical data that could be used to produce sound. Therefore, in the Javascript file, I clean up the post content and then use npm's sentiment library to run sentiment analysis on it. I calculate the sentiment score as well as other unique factors from the post content and sent this data back over to MaxMSP.

MAXMSP PATCH DESIGN: The patch receives and unpacks the data sent from the Javascript code. I created multiple additive synths using a combination of sawtooth oscillators, cycle oscillators, triangle waves, and comb filters in order to have varying sound based on the post. I use the sentiment score to decide which base synth to connect to, but then further customize the outputted sound by basing the additive synth on additional values from the post content. For example, I connected the average word length of the post to an input of the comb filter so that the length of the post impacts the sound. This ensures that pulling different posts leads to unique sounds. 

To further the unpredictability of the sound, for each additive synth, I pull randomly selected notes from different scales. One of the additive synths that is triggered by higher sentiment scores (meaning more positive language) pulls from a MAJOR scale. One of the lower additive synths (meaning more negative language) pulls from a MINOR scale. The intention of this was to have positive posts trigger positive sounds while negative posts trigger negative sounds, since major scales are usually associated with "happy" sounds and minor scales are usually associated with "sad" sounds. 

I additionally created a GUI for the synth so that the user can easily interact with it and can pull live data from the blog with the push of a button (more on this in the instructions section).

INSTRUCTIONS TO USE PROJECT

*If you open the patch in MaxMSP, the application is commented with instructions on setup as well. 

Steps:

1. Install required dependencies. You need npm xmlhttprequest and npm sentiment installed. Fortunately, you can simply press the script install buttons attached to the GUI inside of the patch.

2. Turn sound on. Make sure sound is on in all areas, including your computer and within MaxMSP. You should also turn the gain sliders up to an appropriate level to hear sound.

3. Start up the machine. On the GUI, load the script, start the machine, fetch the latest story, then load the latest story. 

*Optional: If you want to view the post content within Max, you should install the other npm xmlhttp by clicking the button on the righthand side of the patch. Then, you can press the "View Latest Story" button on the GUI for the content to be displayed in MaxMSP. Alternatively, you can check the JSON post data on the blog here: https://public-api.wordpress.com/rest/v1.1/sites/writingwithmax.wordpress.com/posts/

4. You should be able to hear sound!

