import BasicApi from "./BasicApi";

class CommentApi extends BasicApi {
  getAllComments = async asin => {
    try {
      const uri = `${this.url}/comments/${asin}`;
      const response = await fetch(uri, this.credentials);
      const json = await response.json();
      return {success: true, data: json}
    } catch {
      return {
        success: false,
        result: [],
        message: "There is an issue to get data from server. Please try again later.",
      };
    }
  };
  addComment = async body => {
    try {
      const uri = `${this.url}/comments`;
      this.credentials.method = "POST";
      this.credentials.body = JSON.stringify(body);
      const response = await fetch(uri, this.credentials);
      const json = await response.json();
      return {success: true, data: json};
    } catch {
      return {
        success: false,
        message: "There is an issue to get data from server. Please try again later.",
      };
    }
  };
  updateComment = async (id, body) => {
    try {
      const uri = `${this.url}/comments/${id}`;
      this.credentials.method = "PUT";
      this.credentials.body = JSON.stringify(body);
      const response = await fetch(uri, this.credentials);
      const json = await response.json();
      return {success: true, data: json};
    } catch {
      return {
        success: false,
        message: "There is an issue to get data from server. Please try again later.",
      };
    }
  };

  deleteComment = async id => {
    try {
      const uri = `${this.url}/comments/${id}`;
      this.credentials.method = "DELETE";
      const response = await fetch(uri, this.credentials);
      const json = await response.json();
      return {success: true, data: json};
    } catch {
      return {
        success: false,
        message: "There is an issue to get data from server. Please try again later.",
      };
    }
  };
}
export default CommentApi;
