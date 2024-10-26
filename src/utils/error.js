const handleError = (error, toast) => {
    if (error.response.data.message) {
      toast({
        title: "An error occurred.",
        description: error.response.data.message,
        status: "error",
      });
    } else {
      toast({
        title: "An error occurred.",
        description: "Unable to login. Please try again later.",
        status: "error",
      });
    }
  };
  
  export default handleError;