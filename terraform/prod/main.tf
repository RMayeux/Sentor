provider "aws" {
  region     = var.region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_s3_bucket" "s3_swagger" {
  bucket = "${var.app}-${var.env}-openapi"
  acl    = "private"

  tags = {
    Name        = "My bucket"
    Environment = "${var.env}"
  }
}