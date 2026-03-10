import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ['last 5 versions', '> 1%', 'ie 10'],
    }),
  ],
};
