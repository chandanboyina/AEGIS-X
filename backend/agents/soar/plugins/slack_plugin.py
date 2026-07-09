from agents.soar.plugins.plugin_base import PluginBase


class SlackPlugin(PluginBase):

    name = "Slack"

    def execute(
        self,
        action
    ):

        return {

            "plugin": self.name,

            "status": "SUCCESS",

            "message":

                "SOC team notified via Slack.",

            "action": action

        }