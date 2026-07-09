class DNSFeatures:

    SUSPICIOUS_TLDS = {

        ".xyz",

        ".top",

        ".click",

        ".monster",

        ".zip"

    }

    def extract(self, dns):

        query = dns["query"].lower()

        return {

            "long_domain":

                len(query) > 50,

            "many_subdomains":

                query.count(".") > 4,

            "suspicious_tld":

                any(

                    query.endswith(tld)

                    for tld in self.SUSPICIOUS_TLDS

                ),

            "possible_dga":

                len(query.replace(".", "")) > 35,

            "ipv6":

                dns["query_type"] == "28",

            "failed_lookup":

                dns["status"] != "0"

        }