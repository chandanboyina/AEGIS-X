from agents.soar.plugins.plugin_base import PluginBase


class CrowdStrikePlugin(PluginBase):

    name = "CrowdStrike"

    def execute(
        self,
        action
    ):

        return {

            "plugin": self.name,

            "status": "SUCCESS",

            "message":

                f"CrowdStrike executed {action['type']}.",

            "action": action

        }