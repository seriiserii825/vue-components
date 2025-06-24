import axios from "axios";

export default function handleAxiosError(error: unknown, errors: any = {}) {
  if (axios.isAxiosError(error)) {
    const { response } = error;
    if (response) {
      const { status, data } = response;
      if (status === 422) {
        errors.value = data.errors;
        for (const key in errors.value) {
          if (errors.value[key].length > 0) {
            console.error(errors.value[key][0], "errors.value[key][0]");
            break;
          }
        }
      } else {
        console.error(data.message || "Something went wrong", "data.message");
      }
    } else {
      console.error("No response from server.", "No response from server.");
    }
  } else if (error instanceof Error) {
      console.error(error.message, "error.message");
  } else {
    console.error("An unknown error occurred.", error);
  }
}


