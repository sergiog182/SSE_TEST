FROM postgres
ENV POSTGRES_PASSWORD mysecretpassword
ENV POSTGRES_DB domains
COPY domains.sql /docker-entrypoint-initdb.d/