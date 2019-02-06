import axios from "axios";

export default {
  // Gets all blogs
  getBlogs: function() {
    return axios.get("/api/blogs/");
  },
  // Gets the blog with the given id
  getBlog: function(id) {
    return axios.get("/api/blogs/" + id);
  },
  // Deletes the blog with the given id
  deleteBlog: function(id) {
    return axios.delete("/api/blogs/" + id);
  },
  // Saves a blog to the database
  saveBlog: function(blogData) {
    return axios.post("/api/blogs/", blogData);

  },

  // Saves a blog to the database
  saveResponse: function(data) {
    console.log(data)
    return axios.post("/api/blogs/"+data._id,{data});
  },



  // Updates the blog with the given id
  updateBlogResponse: function(user) {
  console.log(user.id)
  console.log(user)
    return axios.put("/api/blogs/"+user.id,user) ;
  }
};
