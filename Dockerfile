# Use Alpine Linux as the base image
FROM alpine:latest

# Install necessary dependencies
RUN apk add --no-cache python3 nodejs npm g++ gcc make

# Set working directory
WORKDIR /code

# Keep container running
CMD ["tail", "-f", "/dev/null"]
