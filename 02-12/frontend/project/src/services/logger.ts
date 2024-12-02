// Safe logging utility that prevents Symbol clone errors
export const logger = {
  info: (message: string, data?: unknown) => {
    if (data) {
      try {
        console.log(message, JSON.stringify(data, null, 2));
      } catch (error) {
        console.log(message, 'Data could not be stringified');
      }
    } else {
      console.log(message);
    }
  },
  
  error: (message: string, error?: unknown) => {
    if (error instanceof Error) {
      console.error(message, error.message);
    } else {
      console.error(message);
    }
  }
};