module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './',
          '@assets': './assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@store': './src/store',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@types': './src/types',
        },
      },
    ],
  ],
};
