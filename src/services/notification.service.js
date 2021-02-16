import Vue from 'vue';

class NotificationService {
  success(text) {
    return Vue.notify({
      type: 'success',
      text,
    });
  }

  error(text, duration = 5000) {
    return Vue.notify({
      type: 'error',
      text,
      duration,
    });
  }

  stickyError(text, title) {
    return this.error(text, title, -1);
  }
}

export default new NotificationService();
