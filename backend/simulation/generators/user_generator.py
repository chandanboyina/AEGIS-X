import random


class UserGenerator:
    """
    Generates realistic enterprise usernames.
    """

    USERS = [

        "administrator",
        "john.smith",
        "alice.johnson",
        "raj.patel",
        "system",
        "backup.service",
        "finance.admin",
        "hr.manager",
        "network.admin",
        "svc_sql"

    ]

    @staticmethod
    def random_user():

        return random.choice(
            UserGenerator.USERS
        )