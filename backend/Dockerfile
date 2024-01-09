# Use an official Python runtime as a parent image
FROM python:3.11

ENV PYTHONUNBUFFERED 1
ENV DEBUG True

# Set the working directory to /app
RUN mkdir /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD requirements.txt /app/


# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

ADD . /app/

# Make port 8000 available to the world outside this container
# EXPOSE 8000

# # # runs the production server
# ENTRYPOINT ["python", "script.sh"]
# CMD ["runserver", "0.0.0.0:8000"]