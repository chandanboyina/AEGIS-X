import random


class NotificationEngine:

    def build(self, packet, incident):

        priority = packet["sentinel"]["priority"]

        notifications = [

            {

                "recipient": "SOC Manager",

                "channel": "Email"

            },

            {

                "recipient": "Asset Owner",

                "channel": "Microsoft Teams"

            }

        ]

        if priority in [

            "HIGH",

            "CRITICAL"

        ]:

            notifications.append({

                "recipient": "IT Operations",

                "channel": "Slack"

            })

        if priority == "CRITICAL":

            notifications.append({

                "recipient": "CISO",

                "channel": "SMS"

            })

        for person in notifications:

            status= random.choice([

                "Delivered",

                "Delivered",

                "Delivered",

                "Pending"

            ])

            person["status"] = status

            person["delivered_at"] = (

                "--"

                if status == "Pending"

                else f"18:{random.randint(10,59)}:{random.randint(10,59)}"

            )

        return notifications