resource "aws_vpc" "app_alb" {
  cidr_block = var.vpc_cidr_block
}


resource "aws_internet_gateway" "app_alb" {
  vpc_id = aws_vpc.app_alb.id
}


resource "aws_subnet" "public_subnets" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.app_alb.id
  cidr_block        = var.public_cidr_blocks[count.index]
  availability_zone = var.availability_zones[count.index]
}


resource "aws_route_table" "public" {
  vpc_id = aws_vpc.app_alb.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.app_alb.id
  }
}


resource "aws_route_table_association" "publics" {
  count          = length(var.availability_zones)
  subnet_id      = element(aws_subnet.public_subnets.*.id, count.index)
  route_table_id = aws_route_table.public.id
}
