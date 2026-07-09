from agents.soar.plugins.plugin_base import PluginBase


class PaloAltoPlugin(PluginBase):

    name = "Palo Alto"

    def execute(
        self,
        action
    ):

        return {

            "plugin": self.name,

            "status": "SUCCESS",

            "message":

                f"Firewall rule created for {action['target']}.",

            "action": action

        }