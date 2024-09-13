terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 4.44.0"
    }
  }

  backend "s3" {
    bucket = "terraform-poc-finchain"
    key    = "terraform-poc-finchain.tfstate"
    region = "sa-east-1"
  }
}

provider "aws" {
  region = "sa-east-1"
  default_tags {
    tags = {
      Project     = "poc-finchain"      
      State       = "Git"
      Terraform   = true
    }
  }
}  