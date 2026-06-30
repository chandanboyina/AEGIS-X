class CaseTags:
    """
    Generates searchable case tags.
    """

    def generate(self, packet):

        oracle = packet["oracle"]

        tags = [

            oracle["category"],

            packet["asset"]["hostname"]

        ]

        event = packet["event"]["event_type"]

        tags.append(event)

        return tags