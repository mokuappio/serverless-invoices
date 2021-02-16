import storage from 'localforage';

storage.config({
  name: 'serverlessInvoices',
  version: 1.0,
  storeName: 'default',
});
