class ThreatIntelligenceFusion:
    """
    Fuses external threat intelligence sources.

    MITRE
    CVE
    CERT-IN
    CISA
    Vendor
    ExploitDB
    """

    def fuse(

        self,

        mitre,

        cves,

        certin,

        cisa,

        vendor,

        exploitdb

    ):

        return {

            "mitre": mitre,

            "cves": cves,

            "certin": certin,

            "cisa": cisa,

            "vendor": vendor,

            "exploitdb": exploitdb

        }