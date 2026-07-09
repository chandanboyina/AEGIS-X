class EventResolver:
    """
    Enterprise Event Resolver.

    Resolves normalized enterprise event fields
    regardless of collector type.

    Every AI module should use this class instead
    of directly accessing event dictionaries.
    """

    # -----------------------------------------
    # User
    # -----------------------------------------

    @staticmethod
    def username(event):

        username = (

            event.get("user")

            or event.get("username")

            or event.get("security", {}).get("username")

            or event.get("security_features", {}).get("username")

            or event.get("powershell_features", {}).get("user")

            or event.get("dns", {}).get("user")

            or event.get("raw", {})
                .get("event_data", {})
                .get("SubjectUserName")

            or event.get("raw", {})
                .get("event_data", {})
                .get("TargetUserName")

            or event.get("raw", {})
                .get("event_data", {})
                .get("AccountName")

            or "unknown"
        )

        return str(username).lower()

    # -----------------------------------------
    # Host
    # -----------------------------------------

    @staticmethod
    def hostname(event):

        hostname = (

            event.get("hostname")

            or event.get("computer")

            or event.get("asset")

            or event.get("raw", {}).get("computer")

            or "unknown"

        )

        return str(hostname)
    # -----------------------------------------
    # Process
    # -----------------------------------------

    @staticmethod
    def process(event):

        process = (

            event.get("process")

            or event.get("image")

            or event.get("command")

            or event.get("command_line")

            or event.get("event_name")

            or event.get("event")

            or event.get("source")

            or "unknown"

        )

        return str(process).lower()

    # -----------------------------------------
    # Collector
    # -----------------------------------------

    @staticmethod
    def collector(event):

        collector = (

            event.get("collector")

            or event.get("source")

            or event.get("raw", {}).get("collector")

            or "unknown"

        )

        return str(collector).lower()

    # -----------------------------------------
    # Risk
    # -----------------------------------------

    @staticmethod
    def risk(event):

        return (

            event.get("risk_score")

            or event.get("risk")

            or event.get("security_risk", {}).get("risk_score")

            or 0

        )

    # -----------------------------------------
    # MITRE
    # -----------------------------------------

    @staticmethod
    def mitre(event):

        return (

            event.get("mitre", {}).get("technique")

            or event.get("security_threat", {}).get("mitre")

            or "Unknown"

        )
    # -----------------------------------------
    # Source IP
    # -----------------------------------------

    @staticmethod
    def source_ip(event):

        ip = (

            event.get("source_ip")

            or event.get("ip")

            or event.get("security", {}).get("ip")

            or event.get("security_features", {}).get("ip")

            or event.get("raw", {})
                .get("event_data", {})
                .get("IpAddress")

        )

        if ip in ("-", "", "N/A", "Unknown", None):

            return None

        return ip

    # -----------------------------------------
    # Destination IP
    # -----------------------------------------

    @staticmethod
    def destination_ip(event):

        ip = (

            event.get("destination_ip")

            or event.get("destination")

            or event.get("raw", {})
                .get("event_data", {})
                .get("DestinationIp")

        )

        if ip in ("-", "", "N/A", "Unknown", None):

            return None

        return ip
    # -----------------------------------------
    # Timestamp
    # -----------------------------------------

    @staticmethod
    def timestamp(event):

        return (

            event.get("timestamp")

            or event.get("time")

            or event.get("raw", {}).get("timestamp")

        )