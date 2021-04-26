const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

// styling method
chai.should();

// middleware
chai.use(chaiHttp);

describe("Testing Post Controller", () => {
  describe("GET ALL Post", () => {
    it("Should return all posts", (done) => {
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");

          done();
        });
    });

    it("Should not return all posts", (done) => {
      chai
        .request(server)
        .get("/post")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("GET Single Post", () => {
    it("Should return Single Post", (done) => {
      const postId = "6076f5cab61220a03777bf3c";
      chai
        .request(server)
        .get(`/posts/${postId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("Should not return Single Post", (done) => {
      const postId = "606320fb2a97e22fc4";
      chai
        .request(server)
        .get("/posts/${postId}")
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("UPDATE single post", () => {
    it("Should Update a post", (done) => {
      const postId = "606321122a97e22fc4ce9b08";
      const body = {
        content: "First Post Content",
      };

      chai
        .request(server)
        .patch(`/posts/${postId}`)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");

          done();
        });
    });

    it("Should not Update a post", (done) => {
      const postId = "606321122a97e22fc4ce9b09";
      const body = {
        content: "First Post Content",
      };

      chai
        .request(server)
        .patch(`/posts/${postId}`)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");

          done();
        });
    });
  });

  describe("DELETE Single post", () => {
    it("Should Delete a post", (done) => {
      const postId = "606321122a97e22fc4ce9b08";

      chai
        .request(server)
        .delete(`/post/${postId}`)
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });

    it("Should not Delete a post", (done) => {
      const postId = "606321122a97e22fc4ce9b09";

      chai
        .request(server)
        .delete(`/post/${postId}`)
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });
});
