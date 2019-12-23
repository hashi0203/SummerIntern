FROM node:10.16

ENV LANGUAGE ja_JP.UTF-8

RUN apt-get update -qq \
    && apt-get install -y vim \
    && apt install fonts-ipaexfont -y

ARG project_dir=/app
RUN mkdir $project_dir
WORKDIR $project_dir

COPY package.json $project_dir
COPY ./Docker/aws-cli.sh $project_dir

RUN npm install --dev
RUN npm install -g gulp
RUN bash ./aws-cli.sh