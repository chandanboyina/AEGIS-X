NORMAL_BUSINESS_EVENTS = [

    {
        "source": "Windows Security Log",
        "event_type": "Successful Login",
        "severity": "LOW",
        "description": "Employee logged into workstation.",
        "raw_log": "4624 - Successful Windows Login"
    },

    {
        "source": "Linux SSH",
        "event_type": "SSH Login",
        "severity": "LOW",
        "description": "Administrator connected through SSH.",
        "raw_log": "Accepted publickey for administrator"
    },

    {
        "source": "Microsoft Exchange",
        "event_type": "Email Sent",
        "severity": "LOW",
        "description": "Employee sent an email.",
        "raw_log": "SMTP mail delivered"
    },

    {
        "source": "Database",
        "event_type": "Database Query",
        "severity": "LOW",
        "description": "Application queried customer records.",
        "raw_log": "SELECT statement executed"
    },

    {
        "source": "VPN Gateway",
        "event_type": "VPN Connection",
        "severity": "LOW",
        "description": "Remote employee connected through VPN.",
        "raw_log": "VPN tunnel established"
    },

]

RECONNAISSANCE_EVENTS = [

    {
        "source": "Firewall",
        "event_type": "Port Scan",
        "severity": "HIGH",
        "description": "Multiple TCP ports scanned from an external IP.",
        "raw_log": "Port scan detected against perimeter firewall."
    },

    {
        "source": "DNS Server",
        "event_type": "DNS Enumeration",
        "severity": "MEDIUM",
        "description": "Large number of DNS lookup requests detected.",
        "raw_log": "Excessive DNS queries from client."
    },

    {
        "source": "Network IDS",
        "event_type": "Network Probe",
        "severity": "HIGH",
        "description": "Host discovery activity detected.",
        "raw_log": "ICMP sweep observed."
    },

    {
        "source": "SMB Server",
        "event_type": "SMB Enumeration",
        "severity": "MEDIUM",
        "description": "Remote system enumerating shared folders.",
        "raw_log": "Anonymous SMB session detected."
    },

    {
        "source": "Windows Security Log",
        "event_type": "Failed Login",
        "severity": "MEDIUM",
        "description": "Repeated authentication failures detected.",
        "raw_log": "4625 - Failed Login"
    }

]