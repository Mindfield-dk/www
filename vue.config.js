module.exports = {
  devServer: {
    public: "127.0.0.1:80",
    disableHostCheck: true,
    port: 80,
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Mindfield";
      return args;
    });
  },
};
