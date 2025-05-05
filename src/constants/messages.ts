const messages = {
    success: {
        userCreated: "User created successfully",
        userUpdated: "User updated successfully",
        userDeleted: "User deleted successfully",
        productCreated: "Product created successfully",
        productRetrieved: "Product retrieved successfully",
        productsRetrieved: "Products retrieved successfully",
    },
    error: {
        userNotFound: "User not found",
        userNotUpdated: "User not updated",
        userNotDeleted: "User not deleted",
        productNotFound: "Product not found",
        productNotCreated: "Error creating product",
        productNotRetrieved: "Error retrieving product",
        productsNotRetrieved: "Error retrieving products",
        invalidProductData: "Invalid product data",
    },
    validation: {
        userInvalid: "User invalid",
        productInvalid: "Product data is invalid",
        invalidSearchParams: "Invalid search parameters",
    },
    auth: {
        tokenInvalid: "Token invalid",
        tokenExpired: "Token expired",
        tokenNotProvided: "Token not provided",
    },
    server: {
        serverError: "Server error",
        databaseError: "Database error",
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
