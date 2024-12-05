# Tori Soup Terraform

## Overview

This repository contains the Terraform configuration files for provisioning infrastructure for the Tori Soup project. It simplifies infrastructure management and ensures consistency using infrastructure-as-code principles.

## Getting Started

Follow these steps to set up and manage your infrastructure:

### 1. Set Up Variables and Environment
Copy the example files and fill in the required values:

```bash
cp terraform.tfvars.example terraform.tfvars
cp .env.example .env
```

* terraform.tfvars: Configure the required Terraform variables for your infrastructure.
* .env: Add environment-specific values.


### 2. Initialize Terraform
Run the following command to initialize Terraform and download the required providers:
```bash
terraform init
terraform apply
```

### 3. Cost Estimation (Optional)
To get a breakdown of the potential monthly bill, use:
```
infracost breakdown --path .
```

### 4. Destroy Infrastructure
To clean up and destroy all the resources, run:
```
terraform destroy
```

