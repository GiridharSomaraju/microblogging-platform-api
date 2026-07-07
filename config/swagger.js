const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Microblogging Platform API",
      version: "1.0.0",
      description:
        "A RESTful API for a Microblogging Platform built with Node.js, Express.js, and PostgreSQL.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password", "gender"],
          properties: {
            name: {
              type: "string",
              example: "Giridhar",
            },
            email: {
              type: "string",
              example: "giri@gmail.com",
            },
            password: {
              type: "string",
              example: "Password123",
            },
            gender: {
              type: "string",
              example: "Male",
            },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "giri@gmail.com",
            },
            password: {
              type: "string",
              example: "Password123",
            },
          },
        },

        TweetRequest: {
          type: "object",
          required: ["tweet"],
          properties: {
            tweet: {
              type: "string",
              example: "Hello everyone!",
            },
          },
        },

        ReplyRequest: {
          type: "object",
          required: ["reply"],
          properties: {
            reply: {
              type: "string",
              example: "Nice Tweet!",
            },
          },
        },

        MultipleTweetDeleteRequest: {
          type: "object",
          required: ["tweetId"],
          properties: {
            tweetId: {
              type: "array",
              items: {
                type: "integer",
              },
              example: [10, 11, 12],
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Validation Error",
            },
          },
        },
      },
    },
  },
  apis: [
    "./routes/userRoutes.js",
    "./routes/tweetRoutes.js",
    "./routes/profileRoutes.js",
    "./routes/followerRoutes.js",
    "./routes/likeRoutes.js",
    "./routes/replyRoutes.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
