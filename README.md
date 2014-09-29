# Remember Tunes
### Connect your memory, location and tracks.
![Search View](https://raw.githubusercontent.com/nogahighland/remember-tunes/master/images/search-view.png)
![Starred List View](https://github.com/nogahighland/remember-tunes/blob/master/images/starred-list-view.png)

- **This is a test AngularJs app for personal learning**
- **Still not deployed anywhere.**
- This app is usable when you want to save a track when you happen to be reminded of.
  - Search music by artist name, album name, anything. Find the music you are looking for.
  - To confirm the track is correct, just click the headphone icon and listen to the preview.
    - **Sorry, this still does not work on smartphones.**
  - If the music is all right, click the star icon. It will be saved to localstorage with your current geographical position.
    - Will be stored on server(some day)
  - Style is not still perfect, sorry.

### Build
- Precondition
  - Latest Node.js, bower, grunt is installed.
``` shell
$ git clone git://github.com/nogahighland/remember-tunes && cd remember-tunes
$ bower install
$ npm install
$ grunt
Running "connect:server" (connect) task
Waiting forever...
Started connect web server on http://localhost:9000
```
