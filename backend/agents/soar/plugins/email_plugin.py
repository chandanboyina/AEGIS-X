from agents.soar.plugins.plugin_base import PluginBase


class EmailPlugin(PluginBase):

    name = "Email"

    def execute(
        self,
        action
    ):

        return {

            "plugin": self.name,

            "status": "SUCCESS",

            "message":

                "Security email notification sent.",

            "action": action

        }