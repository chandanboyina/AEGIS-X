class DNAVote:

    def vote(

        self,

        recommendation,

        similarity

    ):

        return {

            "agent":"Cyber DNA",

            "recommendation":

                recommendation,

            "confidence":

                round(similarity),

            "weight":0.15,

            "reason":[

                f"DNA similarity {similarity:.1f}%."

            ],

            "evidence":{

                "similarity":

                    similarity

            }

        }