module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // react-native-reanimated/plugin should be listed last
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@app': './app',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
