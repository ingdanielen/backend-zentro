const messages = {
    success: {
        userCreated: "User created successfully",
        userUpdated: "User updated successfully",
        userDeleted: "User deleted successfully",
        productCreated: "Product created successfully",
        productUpdated: "Product updated successfully",
        productRetrieved: "Product retrieved successfully",
        productsRetrieved: "Products retrieved successfully",
        parametersRetrieved: "Parameters retrieved successfully",
        parameterUpdated: "Parameter updated successfully"
    },
    error: {
        userNotFound: "User not found",
        userNotUpdated: "User not updated",
        userNotDeleted: "User not deleted",
        productNotFound: "Product not found",
        productNotCreated: "Error creating product",
        productNotUpdated: "Error updating product",
        productNotRetrieved: "Error retrieving product",
        productsNotRetrieved: "Error retrieving products",
        invalidProductData: "Invalid product data",
        parametersNotRetrieved: "Error retrieving parameters",
        parameterNotUpdated: "Error updating parameter"
    },
    validation: {
        userInvalid: "User invalid",
        productInvalid: "Product data is invalid",
        invalidSearchParams: "Invalid search parameters",
        parameterInvalid: "Invalid parameter data"
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
