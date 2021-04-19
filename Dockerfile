# Build Vue
FROM node:14.5.0-alpine as build-stage

WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ .
RUN npm run build

# Setup Container
FROM lsiobase/alpine:3.12 as deploy-stage
# MAINTANER Your Name "info@selfhosted.pro"

# Set Variables
ENV PYTHONIOENCODING=UTF-8
ENV THEME=Default

# Install Dependancies
RUN \
 echo "**** install packages ****" && \
 apk add --no-cache \
	nginx &&\
 echo "**** Cleaning Up ****" &&\
 rm -rf \
	/root/.cache \
	/tmp/*

# Vue
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/

COPY /root /

# Expose
VOLUME /config
EXPOSE 8000