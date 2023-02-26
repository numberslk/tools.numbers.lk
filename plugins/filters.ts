export default defineNuxtPlugin(() => {
  return {
    provide: {
      wordLimit: function (text: string, size: number) {
        if (!text) return '';
        text = text.toString();

        if (text.length <= size) {
          return text;
        }
        return text.substr(0, size) + '...';
      }
    }
  }
})


