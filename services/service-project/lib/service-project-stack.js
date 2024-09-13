const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');

const { Stack, Duration } = require('aws-cdk-lib');

class ServiceProjectStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'tbl-active-projects', {
        partitionKey: {name: 'id', type: dynamodb.AttributeType.STRING },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    const lambdaFunction = new lambda.Function(this, 'lmb-service-project', {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset('lambda'),
        environment: {
          TABLE_NAME: table.tableName
        }
    });

    table.grantReadWriteData(lambdaFunction);

    const gateway = apigateway.RestApi.fromRestApiAttributes(this, 'gtw-financ-chain', {
      restApiId: 'bkupoyssj2',
      rootResourceId: '2v51b5anhi',
    });

    const project = gateway.root.addResource('project');
    project.addMethod('POST', new apigateway.LambdaIntegration(lambdaFunction));

    const singleProject = project.addResource('{id}');
    singleProject.addMethod('GET', new apigateway.LambdaIntegration(lambdaFunction));
    singleProject.addMethod('PUT', new apigateway.LambdaIntegration(lambdaFunction));
    singleProject.addMethod('DELETE', new apigateway.LambdaIntegration(lambdaFunction));
  }
}

module.exports = { ServiceProjectStack }
