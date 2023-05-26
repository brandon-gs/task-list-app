import Sound from 'react-native-sound';

export const checkedSound = new Sound('ding.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully, we need to play the first time the sound is called
  checkedSound.play();
});
