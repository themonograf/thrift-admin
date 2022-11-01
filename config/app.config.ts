export type AppConfig = {
  baseApi: string;
  baseApiLocal: string;
  env: string;
  JWT_KEY: string;
};

const appConfig = {
  baseApi: "https://thrift-api.themonograf.com/api",
  baseApiLocal: "http://localhost:8888/api",
  env: "development",
  JWT_KEY: "63f70e3de1d9ed58e8c167756de68b66",
} as AppConfig;

export default appConfig;
