class SecurityFeatures:
    """
    Enterprise Windows Security Feature Extraction.
    """

    ADMIN_ACCOUNTS = {

        "administrator",
        "system",
        "admin"

    }

    def extract(self, event):

        data = event.get(

            "event_data",

            {}

        )

        username = (

            data.get("TargetUserName")

            or

            data.get("SubjectUserName")

            or

            ""

        ).lower()

        privileges = (

            data.get(

                "PrivilegeList",

                ""

            ).lower()

        )

        ip = data.get(

            "IpAddress"

        )

        return {

            #
            # Authentication
            #

            "successful_logon":

                event["event_id"] == 4624,

            "failed_logon":

                event["event_id"] == 4625,

            #
            # Privilege Escalation
            #

            "privileged_logon":

                event["event_id"] == 4672,

            "admin_account":

                username in self.ADMIN_ACCOUNTS,

            "system_account":

                username == "system",

            #
            # Persistence
            #

            "new_user":

                event["event_id"] == 4720,

            "service_install":

                event["event_id"] == 4697,

            #
            # Process Creation
            #

            "process_creation":

                event["event_id"] == 4688,

            #
            # Account Changes
            #

            "admin_group_change":

                event["event_id"] == 4732,

            "account_locked":

                event["event_id"] == 4740,

            #
            # Network
            #

            "remote_logon":

                bool(ip)

                and

                ip not in (

                    "-",

                    "::1",

                    "127.0.0.1",

                    None

                ),

            #
            # Privilege Count
            #

            "debug_privilege":

                "sedebugprivilege"

                in privileges,

            "backup_privilege":

                "sebackupprivilege"

                in privileges,

            "impersonation":

                "seimpersonateprivilege"

                in privileges,

            #
            # Raw Info
            #

            "username":

                username,

            "ip":

                ip,

            "privileges":

                privileges

        }