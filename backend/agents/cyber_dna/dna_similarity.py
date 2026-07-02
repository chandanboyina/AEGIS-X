class DNASimilarity:

    """
    Compare two DNA fingerprints.
    """

    def compare(

        self,

        dna1,

        dna2

    ):

        total = 0

        matched = 0

        for key in dna1:

            total += 1

            if dna1[key] == dna2.get(key):

                matched += 1

        return round(

            matched /

            max(total,1)

            *100,

            1

        )