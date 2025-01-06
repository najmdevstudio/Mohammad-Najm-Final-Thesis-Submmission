# Use a base image with Java (e.g., OpenJDK)
FROM openjdk:21-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the target directory to the container
COPY target/NWB_ClearingHouse-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 9090

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
