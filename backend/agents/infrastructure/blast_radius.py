class BlastRadius:

    def calculate(

        self,

        incident,

        dependencies

    ):

        criticality = incident["asset_profile"]["criticality"]

        dependency_count = len(dependencies)

        multiplier = {

            "Critical": 2.0,

            "High": 1.5,

            "Medium": 1.2,

            "Low": 1.0

        }

        score = int(

            dependency_count *

            multiplier.get(

                criticality,

                1

            ) *

            10

        )

        return {

            "dependency_count":

                dependency_count,

            "affected_services":

                dependencies,

            "blast_radius_score":

                min(score, 100)

        }