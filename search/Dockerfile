FROM elasticsearch

RUN /usr/share/elasticsearch/bin/plugin install mapper-attachments

EXPOSE 9200 9300
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["elasticsearch"]