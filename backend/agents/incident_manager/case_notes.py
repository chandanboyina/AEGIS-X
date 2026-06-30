class CaseNotes:
    """
    Generates analyst investigation notes.
    """

    def build(self, packet):

        oracle = packet["oracle"]

        sentinel = packet["sentinel"]

        return [

            {

                "author": "Oracle AI",

                "note":
                    f"Threat categorized as {oracle['category']}."

            },

            {

                "author": "Sentinel AI",

                "note":
                    f"Executed response '{sentinel['action']}'."

            }

        ]