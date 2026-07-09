from agents.soar.plugins.plugin_base import PluginBase


class ServiceNowPlugin(PluginBase):

    name = "ServiceNow"

    def execute(
        self,
        action
    ):

        return {

            "plugin": self.name,

            "status": "SUCCESS",

            "ticket":

                "INC001234",

            "message":

                "Incident ticket created.",

            "action": action

        }