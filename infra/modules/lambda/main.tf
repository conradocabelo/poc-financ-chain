resource "aws_lambda_function" "lambdas-services" {
    for_each =  tomap({ for t in var.services : "${t.name}" => t })
    function_name = lower("${each.key}")

    handler   = each.value.handler
    runtime   = each.value.runtime
    role      = aws_iam_role.finchain-lambda-role.arn
    s3_bucket = var.bucket-name-services
    s3_key    = "base-lambda.zip"

    memory_size = each.value.size_memory
    timeout     = 5    
}

resource "aws_iam_role" "finchain-lambda-role" {
  name = "tf-lambda-poc-fin-chain"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}