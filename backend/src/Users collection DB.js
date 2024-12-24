// Users Collection


db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "email", "password", "role"],
        properties: {
          name: {
            bsonType: "string",
            description: "Name of the user is required."
          },
          email: {
            bsonType: "string",
            pattern: "^.+@.+$",
            description: "Email is required and must be a valid email address."
          },
          password: {
            bsonType: "string",
            description: "Password is required."
          },
          role: {
            enum: ["user", "admin"],
            description: "Role must be 'user' or 'admin'."
          },
          profilePic: {
            bsonType: "string",
            description: "Profile picture URL (optional)."
          },
          activityHistory: {
            bsonType: "array",
            items: {
              bsonType: "string"
            },
            description: "List of activity logs."
          }
        }
      }
    }
  });