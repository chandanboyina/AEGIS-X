from agents.soar.plugins.generic_plugin import GenericPlugin
from agents.soar.plugins.defender_plugin import DefenderPlugin
from agents.soar.plugins.crowdstrike_plugin import CrowdStrikePlugin
from agents.soar.plugins.paloalto_plugin import PaloAltoPlugin
from agents.soar.plugins.servicenow_plugin import ServiceNowPlugin
from agents.soar.plugins.slack_plugin import SlackPlugin
from agents.soar.plugins.email_plugin import EmailPlugin


class PluginManager:

    def __init__(self):

        self.plugins = {

            "GENERIC": GenericPlugin(),

            "DEFENDER": DefenderPlugin(),

            "CROWDSTRIKE": CrowdStrikePlugin(),

            "PALOALTO": PaloAltoPlugin(),

            "SERVICENOW": ServiceNowPlugin(),

            "SLACK": SlackPlugin(),

            "EMAIL": EmailPlugin()

        }

    def get_plugin(
        self,
        integration
    ):

        return self.plugins.get(

            integration,

            self.plugins["GENERIC"]

        )