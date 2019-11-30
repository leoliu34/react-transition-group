module.exports = {
  presets: [['babel-preset-jason', { runtime: false }]],
  plugins: [
    ['babel-plugin-transform-react-remove-prop-types', { mode: 'wrap' }],
    ['@babel/transform-react-jsx', { pragma: 'h' }],
  ],
  env: {
    esm: {
      presets: [['babel-preset-jason', { modules: false }]],
    },
  },
}
