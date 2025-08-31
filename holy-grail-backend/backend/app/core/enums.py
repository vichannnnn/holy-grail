from enum import Enum


class Environment(str, Enum):
    LOCAL = "local"
    DEV = "dev"
    PROD = "prod"

    def is_local(self) -> bool:
        return self == Environment.LOCAL

    def is_dev(self) -> bool:
        return self == Environment.DEV

    def is_prod(self) -> bool:
        return self == Environment.PROD

    def is_production_like(self) -> bool:
        return self in (Environment.DEV, Environment.PROD)

    def requires_aws(self) -> bool:
        return self.is_production_like()

    def requires_email(self) -> bool:
        return self.is_production_like()