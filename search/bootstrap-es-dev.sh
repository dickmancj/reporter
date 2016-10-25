curl -X POST 'http://localhost:9200/reports' -d '{
    "settings" : {}
    }'

curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT 'http://localhost:9200/reports/document/_mapping' -d '{
    "document" : {
        "properties" : {
            "classification": {"type": "string" },
            "title": { "type": "string" },
            "description": { "type": "string" },
            "keyword_list": { "type": "string" },
            "url": { "type": "string" },
            "author": { "type": "string" },
            "publish_date": { "type": "date" },
            "report_content" : { "type" : "attachment" },
            "file_name": { "type": "string" },
            "file_size": { "type": "string" },
            "report_type": { "type": "string" },
            "requirement": { "type": "string" },
            "location": { "type": "geo_point" },
            "updated_date": { "type": "date" }
        }
    }
}'