// Projects Collection

db.createCollection("projects", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "description", "tasks", "createdBy"],
        properties: {
          name: {
            bsonType: "string",
            description: "Project name is required."
          },
          description: {
            bsonType: "string",
            description: "Project description is required."
          },
          tasks: {
            bsonType: "array",
            items: {
              bsonType: "objectId"
            },
            description: "Array of task ObjectIds."
          },
          createdBy: {
            bsonType: "objectId",
            description: "The user who created the project is required."
          }
        }
      }
    }
  });




