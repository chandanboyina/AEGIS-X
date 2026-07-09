from agents.rag.mitre_loader import MITRELoader
from agents.rag.cve_loader import CVELoader
from agents.rag.certin_loader import CERTINLoader
from agents.rag.cisa_loader import CISALoader
from agents.rag.vendor_loader import VendorLoader
from agents.rag.exploitdb_loader import ExploitDBLoader

from agents.correlation.correlation_score import CorrelationScore
from agents.correlation.threat_intelligence_fusion import ThreatIntelligenceFusion


class ThreatCorrelation:

    def __init__(self):

        self.mitre = MITRELoader()

        self.cve = CVELoader()

        self.certin = CERTINLoader()

        self.cisa = CISALoader()

        self.vendor = VendorLoader()

        self.exploit = ExploitDBLoader()

        self.fusion = ThreatIntelligenceFusion()

        self.score = CorrelationScore()

        

    def analyze(

        self,

        incident

    ):

        technique = incident["mitre"]["id"]

        mitre = self.mitre.search(
            technique_id=technique
        )

        cves = self.cve.search(
            mitre=technique
        )

        certin = self.certin.search(
            mitre=technique
        )

        cisa = self.cisa.search(
            mitre=technique
        )

        vendor = self.vendor.search(
            mitre=technique
        )

        exploit = self.exploit.search(
            mitre=technique
        )

        intelligence = self.fusion.fuse(

            mitre,

            cves,

            certin,

            cisa,

            vendor,

            exploit

        )

        return {

            "score": self.score.calculate(
                intelligence
            ),

            "intelligence": intelligence

        }