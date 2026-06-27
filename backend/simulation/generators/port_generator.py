import random


class PortGenerator:
    """
    Generates realistic enterprise ports and services.
    """

    PORTS = [

        {"port": 22, "service": "SSH"},
        {"port": 21, "service": "FTP"},
        {"port": 25, "service": "SMTP"},
        {"port": 53, "service": "DNS"},
        {"port": 80, "service": "HTTP"},
        {"port": 110, "service": "POP3"},
        {"port": 143, "service": "IMAP"},
        {"port": 443, "service": "HTTPS"},
        {"port": 445, "service": "SMB"},
        {"port": 3389, "service": "RDP"},
        {"port": 3306, "service": "MySQL"},
        {"port": 5432, "service": "PostgreSQL"},
        {"port": 8080, "service": "Tomcat"}

    ]

    @staticmethod
    def random_port():

        return random.choice(
            PortGenerator.PORTS
        )

    @staticmethod
    def random_scan(count=4):

        return random.sample(
            PortGenerator.PORTS,
            count
        )