FROM ruby:3.1.2

# Install production dependencies.
WORKDIR /app

COPY . .

RUN apt-get update 
RUN gem install bundler && bundler install 

ENV RAILS_ENV=production

ARG MASTER_KEY
ARG SECRET_KEY_BASE
ARG DB_PASSWORD

ENV RAILS_MASTER_KEY=$MASTER_KEY
ENV SECRET_KEY_BASE=${SECRET_KEY_BASE}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV INSTANCE_CONNECTION_NAME=dbs-backend-1:asia-southeast1:database1-instance

EXPOSE 8080

CMD ["bin/rails", "server", "--port", "8080" , "-b", "0.0.0.0", "-e", "production"]