provider "aws" {
  region     = var.region
]

resource "aws_s3_bucket" "s3_swagger" {
  bucket = "${var.app}-${var.env}-openapi"
  acl    = "private"

  tags = {
    Name        = "My bucket"
    Environment = "${var.env}"
  }
}