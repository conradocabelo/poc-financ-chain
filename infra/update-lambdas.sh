zip -r  ../services/service-project/code.zip .
aws lambda update-function-code --function-name opr-project-crud --zip-file fileb://../services/service-project/code.zip