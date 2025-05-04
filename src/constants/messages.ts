const messages = {
    success: {
        userCreated: "User created successfully",
        userUpdated: "User updated successfully",
        userDeleted: "User deleted successfully",
    },
    error: {
        userNotFound: "User not found",
        userNotUpdated: "User not updated",
        userNotDeleted: "User not deleted",
    },
    validation: {
        userInvalid: "User invalid",
    },
    auth: {
        tokenInvalid: "Token invalid",
        tokenExpired: "Token expired",
        tokenNotProvided: "Token not provided",
    },
    server: {
        serverError: "Server error",
    },
    database: {
        databaseError: "Database error",
        MongoDBConnectedSuccessfully: "MongoDB connected successfully",
        MongoDBConnectionError: "MongoDB connection error",
    },
    cloudinary: {
        cloudinaryError: "Cloudinary error",
    },
    
}   

export default messages;
