FROM cypress/browsers:node-20.11.0-chrome-121.0.6167.184-1-ff-123.0-edge-121.0.2277.128-1

WORKDIR /app

COPY . .

RUN /app/docker/internal_files/install.sh

EXPOSE 600

ENTRYPOINT ["/app/docker/internal_files/entrypoint.sh"]